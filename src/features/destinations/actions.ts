/**
 * Destination Server Actions
 * Server-side data fetching with caching and rate limiting
 */

'use server';

import { prisma } from '@/lib/prisma';
import { cache } from '@/lib/redis';
import { withRateLimit } from '@/lib/rate-limit';
import { revalidatePath } from 'next/cache';
import type { DestinationSearchParams, DestinationSearchResult } from '@/types/types';
import { z } from 'zod';

// Validation schemas
const searchParamsSchema = z.object({
  query: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  type: z.array(z.string()).optional(),
  priceMin: z.number().min(0).optional(),
  priceMax: z.number().min(0).optional(),
  duration: z.number().min(1).optional(),
  rating: z.number().min(0).max(5).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(12),
  sortBy: z.enum(['popularity', 'price', 'rating', 'newest']).default('popularity'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

/**
 * Get featured destinations (cached)
 */
export async function getFeaturedDestinations() {
  const cacheKey = 'featured-destinations';
  
  try {
    // Try cache first
    const cached = await cache.get<any[]>(cacheKey);
    if (cached) return { success: true, data: cached };

    const destinations = await prisma.destination.findMany({
      where: {
        isFeatured: true,
        isActive: true,
      },
      include: {
        packages: {
          where: { isActive: true },
          take: 1,
          orderBy: { price: 'asc' },
        },
        _count: {
          select: {
            bookings: true,
            reviews: true,
          },
        },
      },
      take: 6,
      orderBy: { bookingCount: 'desc' },
    });

    // Cache for 1 hour
    await cache.set(cacheKey, destinations, 3600);
    
    return { success: true, data: destinations };
  } catch (error) {
    console.error('Error fetching featured destinations:', error);
    return { success: false, error: 'Failed to fetch destinations' };
  }
}

/**
 * Search destinations with filters and validation
 */
export async function searchDestinations(
  params: DestinationSearchParams
): Promise<DestinationSearchResult> {
  try {
    // Validate input
    const validatedParams = searchParamsSchema.parse(params);
    
    const {
      query,
      country,
      city,
      type,
      priceMin,
      priceMax,
      duration,
      rating,
      page,
      limit,
      sortBy,
      sortOrder,
    } = validatedParams;

    // Build where clause
    const where: any = {
      isActive: true,
      ...(query && {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { country: { contains: query, mode: 'insensitive' } },
          { city: { contains: query, mode: 'insensitive' } },
        ],
      }),
      ...(country && { country: { equals: country, mode: 'insensitive' } }),
      ...(city && { city: { equals: city, mode: 'insensitive' } }),
      ...(type && type.length > 0 && { type: { hasSome: type } }),
      ...(priceMin !== undefined && { priceFrom: { gte: priceMin } }),
      ...(priceMax !== undefined && { priceFrom: { lte: priceMax } }),
      ...(duration && { duration: { gte: duration } }),
      ...(rating && { rating: { gte: rating } }),
    };

    // Build orderBy
    const orderBy: any = (() => {
      switch (sortBy) {
        case 'price':
          return { priceFrom: sortOrder };
        case 'rating':
          return { rating: sortOrder };
        case 'newest':
          return { createdAt: sortOrder };
        case 'popularity':
        default:
          return { bookingCount: sortOrder };
      }
    })();

    // Execute query with pagination
    const [destinations, total] = await Promise.all([
      prisma.destination.findMany({
        where,
        include: {
          packages: {
            where: { isActive: true },
            take: 1,
            orderBy: { price: 'asc' },
          },
          _count: {
            select: {
              bookings: true,
              reviews: true,
              savedTrips: true,
            },
          },
        },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.destination.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      destinations: destinations as any,
      total,
      page,
      totalPages,
      hasMore: page < totalPages,
    };
  } catch (error) {
    console.error('Error searching destinations:', error);
    return {
      destinations: [],
      total: 0,
      page: 1,
      totalPages: 0,
      hasMore: false,
    };
  }
}

/**
 * Get destination by ID or slug with error handling
 */
export async function getDestination(idOrSlug: string) {
  try {
    if (!idOrSlug || typeof idOrSlug !== 'string') {
      return { success: false, error: 'Invalid destination identifier' };
    }

    const destination = await prisma.destination.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
        isActive: true,
      },
      include: {
        packages: {
          where: { isActive: true },
          orderBy: { price: 'asc' },
        },
        reviews: {
          where: { isPublished: true },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        _count: {
          select: {
            bookings: true,
            reviews: true,
            savedTrips: true,
          },
        },
      },
    });

    if (!destination) {
      return { success: false, error: 'Destination not found' };
    }

    // Track view (async, don't wait)
    trackDestinationView(destination.id).catch((error) =>
      console.error('Failed to track view:', error)
    );

    return { success: true, data: destination };
  } catch (error) {
    console.error('Error fetching destination:', error);
    return { success: false, error: 'Failed to fetch destination' };
  }
}

/**
 * Track destination view for analytics
 */
async function trackDestinationView(destinationId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await prisma.analytics.upsert({
    where: {
      destinationId_date: {
        destinationId,
        date: today,
      },
    },
    update: {
      views: { increment: 1 },
    },
    create: {
      destinationId,
      date: today,
      views: 1,
    },
  });
}

/**
 * Get popular destinations
 */
export async function getPopularDestinations(limit: number = 6) {
  return await prisma.destination.findMany({
    where: { isActive: true },
    include: {
      _count: {
        select: { bookings: true },
      },
    },
    orderBy: {
      bookingCount: 'desc',
    },
    take: limit,
  });
}

/**
 * Get destinations by country
 */
export async function getDestinationsByCountry(country: string) {
  return await prisma.destination.findMany({
    where: {
      country: { equals: country, mode: 'insensitive' },
      isActive: true,
    },
    include: {
      packages: {
        where: { isActive: true },
        take: 1,
      },
    },
    orderBy: { rating: 'desc' },
  });
}

/**
 * Admin: Create destination
 */
export async function createDestination(data: any) {
  const destination = await prisma.destination.create({
    data,
  });

  revalidatePath('/destinations');
  revalidatePath('/admin/destinations');
  
  return destination;
}

/**
 * Admin: Update destination
 */
export async function updateDestination(id: string, data: any) {
  const destination = await prisma.destination.update({
    where: { id },
    data,
  });

  revalidatePath(`/destinations/${id}`);
  revalidatePath(`/destinations/${destination.slug}`);
  revalidatePath('/admin/destinations');
  
  return destination;
}

/**
 * Admin: Delete destination
 */
export async function deleteDestination(id: string) {
  await prisma.destination.delete({
    where: { id },
  });

  revalidatePath('/destinations');
  revalidatePath('/admin/destinations');
}
