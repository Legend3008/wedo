/**
 * Booking Server Actions
 */

'use server';

import { prisma } from '@/lib/prisma';
import { stripe, createPaymentIntent } from '@/lib/stripe';
import { sendBookingConfirmation } from '@/lib/email';
import { revalidatePath } from 'next/cache';
import { generateBookingNumber, formatCurrency, formatDate } from '@/utils/helpers';
import type { BookingFormData } from '@/types/types';

/**
 * Create booking and payment intent
 */
export async function createBooking(userId: string, data: BookingFormData) {
  // Calculate pricing
  const destination = await prisma.destination.findUnique({
    where: { id: data.destinationId },
    include: {
      packages: data.packageId
        ? { where: { id: data.packageId } }
        : undefined,
    },
  });

  if (!destination) {
    throw new Error('Destination not found');
  }

  const packageData = data.packageId
    ? destination.packages?.[0]
    : null;

  const basePrice = packageData
    ? Number(packageData.price)
    : Number(destination.priceFrom);
  
  const subtotal = basePrice * data.travelers;
  const taxes = subtotal * 0.15; // 15% tax
  const total = subtotal + taxes;

  // Create booking
  const booking = await prisma.booking.create({
    data: {
      bookingNumber: generateBookingNumber(),
      userId,
      destinationId: data.destinationId,
      packageId: data.packageId,
      startDate: data.startDate,
      endDate: data.endDate,
      travelers: data.travelers,
      subtotal,
      taxes,
      total,
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      specialRequests: data.specialRequests,
      bookingStatus: 'PENDING',
      paymentStatus: 'PENDING',
    },
  });

  // Create Stripe payment intent
  const paymentIntent = await createPaymentIntent(
    total,
    'usd',
    {
      bookingId: booking.id,
      bookingNumber: booking.bookingNumber,
      destinationName: destination.name,
    }
  );

  // Update booking with payment intent ID
  await prisma.booking.update({
    where: { id: booking.id },
    data: { stripePaymentIntentId: paymentIntent.id },
  });

  return {
    booking,
    clientSecret: paymentIntent.client_secret,
  };
}

/**
 * Confirm booking after successful payment
 */
export async function confirmBooking(bookingId: string) {
  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      bookingStatus: 'CONFIRMED',
      paymentStatus: 'COMPLETED',
      paidAt: new Date(),
    },
    include: {
      destination: true,
      user: true,
    },
  });

  // Send confirmation email
  await sendBookingConfirmation(booking.contactEmail, {
    bookingNumber: booking.bookingNumber,
    destination: booking.destination.name,
    startDate: formatDate(booking.startDate, 'long'),
    endDate: formatDate(booking.endDate, 'long'),
    total: formatCurrency(Number(booking.total)),
  });

  // Create notification
  await prisma.notification.create({
    data: {
      userId: booking.userId,
      type: 'BOOKING_CONFIRMED',
      title: 'Booking Confirmed',
      message: `Your booking for ${booking.destination.name} has been confirmed!`,
      bookingId: booking.id,
    },
  });

  revalidatePath('/dashboard/bookings');
  
  return booking;
}

/**
 * Get user bookings
 */
export async function getUserBookings(userId: string) {
  return await prisma.booking.findMany({
    where: { userId },
    include: {
      destination: true,
      package: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

/**
 * Get booking by ID
 */
export async function getBooking(bookingId: string, userId: string) {
  return await prisma.booking.findFirst({
    where: {
      id: bookingId,
      userId,
    },
    include: {
      destination: true,
      package: true,
      payments: true,
    },
  });
}

/**
 * Cancel booking
 */
export async function cancelBooking(bookingId: string, userId: string) {
  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      userId,
    },
  });

  if (!booking) {
    throw new Error('Booking not found');
  }

  if (booking.bookingStatus === 'CANCELLED') {
    throw new Error('Booking already cancelled');
  }

  // Update booking status
  await prisma.booking.update({
    where: { id: bookingId },
    data: {
      bookingStatus: 'CANCELLED',
    },
  });

  // If payment was completed, initiate refund
  if (booking.paymentStatus === 'COMPLETED' && booking.stripePaymentIntentId) {
    // Process refund through Stripe
    // This would be handled by a webhook in production
  }

  revalidatePath('/dashboard/bookings');
  
  return { success: true };
}

/**
 * Admin: Get all bookings
 */
export async function getAllBookings(status?: string) {
  return await prisma.booking.findMany({
    where: status ? { bookingStatus: status as any } : undefined,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      destination: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}
