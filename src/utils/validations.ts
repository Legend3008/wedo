/**
 * Zod validation schemas for forms
 */

import { z } from 'zod';

// User registration
export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

// User login
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Booking form
export const bookingSchema = z.object({
  destinationId: z.string().min(1, 'Destination is required'),
  packageId: z.string().optional(),
  startDate: z.coerce.date({
    message: 'Start date is required',
  }),
  endDate: z.coerce.date({
    message: 'End date is required',
  }),
  travelers: z.number().min(1, 'At least 1 traveler required').max(20, 'Maximum 20 travelers'),
  contactName: z.string().min(2, 'Name must be at least 2 characters'),
  contactEmail: z.string().email('Invalid email address'),
  contactPhone: z.string().min(10, 'Invalid phone number'),
  specialRequests: z.string().optional(),
}).refine((data) => data.endDate > data.startDate, {
  message: 'End date must be after start date',
  path: ['endDate'],
});

// Review form
export const reviewSchema = z.object({
  rating: z.number().min(1, 'Rating is required').max(5, 'Rating must be between 1 and 5'),
  title: z.string().min(5, 'Title must be at least 5 characters').max(100),
  comment: z.string().min(20, 'Comment must be at least 20 characters').max(1000),
  images: z.array(z.string()).max(5, 'Maximum 5 images allowed').optional(),
});

// Destination form (admin)
export const destinationSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  country: z.string().min(2, 'Country is required'),
  city: z.string().min(2, 'City is required'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  shortDesc: z.string().max(200, 'Short description must be less than 200 characters'),
  type: z.array(z.string()).min(1, 'Select at least one type'),
  priceFrom: z.number().min(0, 'Price must be positive'),
  priceTo: z.number().optional(),
  coverImage: z.string().url('Invalid image URL'),
  images: z.array(z.string().url()).min(1, 'At least one image required'),
  videoUrl: z.string().url().optional().or(z.literal('')),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  highlights: z.array(z.string()).min(1, 'Add at least one highlight'),
  included: z.array(z.string()),
  excluded: z.array(z.string()),
  duration: z.number().min(1, 'Duration must be at least 1 day'),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

// Search params
export const searchSchema = z.object({
  query: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  type: z.array(z.string()).optional(),
  priceMin: z.number().min(0).optional(),
  priceMax: z.number().min(0).optional(),
  duration: z.number().min(1).optional(),
  rating: z.number().min(1).max(5).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(12),
  sortBy: z.enum(['price', 'rating', 'popularity', 'newest']).default('popularity'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// Contact form
export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});
