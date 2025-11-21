/**
 * Email Service using Resend
 * Handles transactional emails with templates
 */

import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined');
}

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'bookings@travelagent.com';

export async function sendBookingConfirmation(
  to: string,
  data: {
    bookingNumber: string;
    destination: string;
    startDate: string;
    endDate: string;
    total: string;
  }
) {
  return await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Booking Confirmed - ${data.bookingNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Booking Confirmed! 🎉</h1>
        <p>Your trip to <strong>${data.destination}</strong> has been confirmed.</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Booking Number:</strong> ${data.bookingNumber}</p>
          <p><strong>Dates:</strong> ${data.startDate} - ${data.endDate}</p>
          <p><strong>Total:</strong> ${data.total}</p>
        </div>
        <p>We'll send you more details closer to your departure date.</p>
        <p>Safe travels!</p>
      </div>
    `,
  });
}

export async function sendPaymentReceipt(
  to: string,
  data: {
    bookingNumber: string;
    amount: string;
    paymentMethod: string;
  }
) {
  return await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Payment Receipt - ${data.bookingNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Payment Received</h1>
        <p>Thank you for your payment.</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Booking Number:</strong> ${data.bookingNumber}</p>
          <p><strong>Amount:</strong> ${data.amount}</p>
          <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
        </div>
      </div>
    `,
  });
}

export async function sendWelcomeEmail(to: string, name: string) {
  return await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: 'Welcome to TravelAgent',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Welcome, ${name}! 👋</h1>
        <p>We're excited to help you discover amazing destinations.</p>
        <p>Start exploring now and book your dream vacation.</p>
      </div>
    `,
  });
}
