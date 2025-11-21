/**
 * Destination Server Actions
 * Server-side data fetching with caching
 */

'use server';

import { prisma } from '@/lib/prisma';
import { cache } from '@/lib/redis';
import { revalidatePath } from 'next/cache';
import type { DestinationSearchParams, DestinationSearchResult } from '@/types/types';

/**
 * Get featured destinations (cached)
 */
export async function getFeaturedDestinations() {
  const cacheKey = 'featured-destinations';
  
  // Try cache first
  const cached = await cache.get<any[]>(cacheKey);
  if (cached) return cached;

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
  
  return destinations;
}

/**
 * Search destinations with filters
 */
export async function searchDestinations(
  params: DestinationSearchParams
): Promise<DestinationSearchResult> {
  const {
    query,
    country,
    city,
    type,
    priceMin,
    priceMax,
    duration,
    rating,
    page = 1,
    limit = 12,
    sortBy = 'popularity',
    sortOrder = 'desc',
  } = params;

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
}

/**
 * Get destination by ID or slug
 */
export async function getDestination(idOrSlug: string) {
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

  if (!destination) return null;

  // Track view (async, don't wait)
  trackDestinationView(destination.id).catch(console.error);

  return destination;
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
