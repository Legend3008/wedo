# 🎓 TravelAgent Platform - Developer Guide

## 📚 Complete Code Reference

This guide contains essential code snippets and explanations for key parts of the TravelAgent platform.

---

## 🏗️ Architecture Patterns

### Server Actions Pattern

Server Actions provide a secure way to mutate data without creating API routes:

\`\`\`typescript
// src/features/destinations/actions.ts
'use server';

export async function getFeaturedDestinations() {
  // Server-side code only - never sent to client
  const destinations = await prisma.destination.findMany({
    where: { isFeatured: true, isActive: true },
  });
  return destinations;
}
\`\`\`

### React Server Components Pattern

RSCs fetch data on the server, reducing client-side JavaScript:

\`\`\`typescript
// app/destinations/page.tsx
import { getFeaturedDestinations } from '@/features/destinations/actions';

export default async function DestinationsPage() {
  const destinations = await getFeaturedDestinations();
  
  return <DestinationGrid destinations={destinations} />;
}
\`\`\`

### Client Component Pattern

Use 'use client' only when you need interactivity:

\`\`\`typescript
'use client';

import { useState } from 'react';

export function BookingForm() {
  const [travelers, setTravelers] = useState(1);
  // Client-side state and handlers
}
\`\`\`

---

## 🗄️ Database Patterns

### Efficient Queries with Prisma

\`\`\`typescript
// Include related data
const destination = await prisma.destination.findUnique({
  where: { id },
  include: {
    packages: true,
    reviews: {
      include: { user: true },
      take: 10,
    },
    _count: {
      select: { bookings: true },
    },
  },
});

// Full-text search
const results = await prisma.destination.findMany({
  where: {
    OR: [
      { name: { contains: query, mode: 'insensitive' } },
      { description: { contains: query, mode: 'insensitive' } },
    ],
  },
});
\`\`\`

### Transactions

\`\`\`typescript
const booking = await prisma.$transaction(async (tx) => {
  // Create booking
  const booking = await tx.booking.create({ data: bookingData });
  
  // Update destination booking count
  await tx.destination.update({
    where: { id: destinationId },
    data: { bookingCount: { increment: 1 } },
  });
  
  // Create notification
  await tx.notification.create({ data: notificationData });
  
  return booking;
});
\`\`\`

---

## 🎨 UI Component Patterns

### Compound Components

\`\`\`typescript
<Card>
  <CardHeader>
    <CardTitle>Destination Name</CardTitle>
    <CardDescription>Country, City</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>
\`\`\`

### Responsive Design

\`\`\`typescript
// Tailwind responsive classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols */}
</div>
\`\`\`

---

## 🔐 Authentication Patterns

### Protected Routes

\`\`\`typescript
// app/dashboard/layout.tsx
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }) {
  const session = await getServerSession();
  
  if (!session) {
    redirect('/auth/signin');
  }
  
  return <>{children}</>;
}
\`\`\`

### Role-Based Access

\`\`\`typescript
// Check user role
if (session.user.role !== 'ADMIN') {
  return <Unauthorized />;
}
\`\`\`

---

## 💳 Payment Integration

### Creating Payment Intent

\`\`\`typescript
import { stripe } from '@/lib/stripe';

const paymentIntent = await stripe.paymentIntents.create({
  amount: Math.round(total * 100), // Convert to cents
  currency: 'usd',
  metadata: {
    bookingId: booking.id,
  },
});
\`\`\`

### Webhook Handler

\`\`\`typescript
// app/api/webhooks/stripe/route.ts
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature')!;
  
  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );
  
  if (event.type === 'payment_intent.succeeded') {
    // Handle successful payment
    await confirmBooking(event.data.object.metadata.bookingId);
  }
  
  return Response.json({ received: true });
}
\`\`\`

---

## 📧 Email Patterns

### Transactional Emails

\`\`\`typescript
import { resend } from '@/lib/email';

await resend.emails.send({
  from: 'bookings@travelagent.com',
  to: user.email,
  subject: 'Booking Confirmed',
  html: `
    <h1>Your booking is confirmed!</h1>
    <p>Booking Number: ${bookingNumber}</p>
  `,
});
\`\`\`

---

## 🎭 Animation Patterns

### GSAP Scroll Animations

\`\`\`typescript
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function AnimatedSection() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.from(ref.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
      },
    });
  }, []);
  
  return <div ref={ref}>Content</div>;
}
\`\`\`

### Framer Motion

\`\`\`typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
\`\`\`

---

## 🔄 State Management

### Zustand Store

\`\`\`typescript
import { create } from 'zustand';

interface BookingStore {
  destinationId: string | null;
  setDestination: (id: string) => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  destinationId: null,
  setDestination: (id) => set({ destinationId: id }),
}));
\`\`\`

### Using the Store

\`\`\`typescript
'use client';

import { useBookingStore } from '@/store/booking-store';

export function BookingButton() {
  const setDestination = useBookingStore((s) => s.setDestination);
  
  return (
    <button onClick={() => setDestination('dest-123')}>
      Book Now
    </button>
  );
}
\`\`\`

---

## 🔍 Search Implementation

### Full-Text Search

\`\`\`typescript
const results = await prisma.destination.findMany({
  where: {
    OR: [
      { name: { search: query } },
      { description: { search: query } },
    ],
    isActive: true,
  },
  orderBy: {
    _relevance: {
      fields: ['name', 'description'],
      search: query,
      sort: 'desc',
    },
  },
});
\`\`\`

---

## 📊 Caching Strategy

### Redis Caching

\`\`\`typescript
import { cache } from '@/lib/redis';

// Get from cache or database
async function getDestinations() {
  const cacheKey = 'featured-destinations';
  
  // Try cache first
  const cached = await cache.get(cacheKey);
  if (cached) return cached;
  
  // Fetch from database
  const data = await prisma.destination.findMany();
  
  // Store in cache (1 hour)
  await cache.set(cacheKey, data, 3600);
  
  return data;
}
\`\`\`

### Invalidation

\`\`\`typescript
// Invalidate cache after mutation
await cache.del('featured-destinations');

// Or use pattern matching
await cache.invalidatePattern('destinations:*');
\`\`\`

---

## 🧪 Error Handling

### Try-Catch Pattern

\`\`\`typescript
'use server';

export async function createBooking(data: BookingData) {
  try {
    const booking = await prisma.booking.create({ data });
    return { success: true, booking };
  } catch (error) {
    console.error('Booking creation failed:', error);
    return { success: false, error: 'Failed to create booking' };
  }
}
\`\`\`

### Client-Side Error Boundaries

\`\`\`typescript
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
\`\`\`

---

## 🚀 Performance Optimization

### Image Optimization

\`\`\`typescript
import Image from 'next/image';

<Image
  src={destination.coverImage}
  alt={destination.name}
  width={800}
  height={600}
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  priority={isFeatured}
/>
\`\`\`

### Dynamic Imports

\`\`\`typescript
import dynamic from 'next/dynamic';

const BookingModal = dynamic(
  () => import('@/components/booking-modal'),
  { ssr: false, loading: () => <Spinner /> }
);
\`\`\`

### Suspense Boundaries

\`\`\`typescript
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <AsyncComponent />
    </Suspense>
  );
}
\`\`\`

---

## 📱 Responsive Design

### Breakpoints

\`\`\`typescript
// Tailwind breakpoints
sm: 640px   // Mobile landscape
md: 768px   // Tablet
lg: 1024px  // Desktop
xl: 1280px  // Large desktop
2xl: 1536px // Extra large

// Usage
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
\`\`\`

---

## 🔐 Security Best Practices

### Input Validation

\`\`\`typescript
import { z } from 'zod';

const bookingSchema = z.object({
  email: z.string().email(),
  travelers: z.number().min(1).max(20),
  startDate: z.coerce.date(),
});

// Validate input
const result = bookingSchema.safeParse(formData);
if (!result.success) {
  return { errors: result.error.flatten() };
}
\`\`\`

### Rate Limiting

\`\`\`typescript
import { Ratelimit } from '@upstash/ratelimit';
import { redis } from '@/lib/redis';

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'anonymous';
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return Response.json({ error: 'Too many requests' }, { status: 429 });
  }
  
  // Handle request
}
\`\`\`

---

## 📈 Monitoring

### Error Tracking (Sentry)

\`\`\`typescript
import * as Sentry from '@sentry/nextjs';

try {
  await riskyOperation();
} catch (error) {
  Sentry.captureException(error);
  throw error;
}
\`\`\`

### Performance Monitoring

\`\`\`typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
\`\`\`

---

## 🧪 Testing

### Component Testing

\`\`\`typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
\`\`\`

---

## 📝 Code Style

### Naming Conventions

- **Components**: PascalCase (e.g., `BookingForm`)
- **Files**: kebab-case (e.g., `booking-form.tsx`)
- **Functions**: camelCase (e.g., `createBooking`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_TRAVELERS`)
- **Types/Interfaces**: PascalCase (e.g., `BookingData`)

### File Organization

\`\`\`
feature/
├── components/      # Feature-specific components
├── actions.ts       # Server actions
├── types.ts         # Feature types
└── utils.ts         # Feature utilities
\`\`\`

---

## 🔄 Git Workflow

### Commit Messages

\`\`\`bash
feat: add booking confirmation email
fix: resolve payment processing issue
docs: update deployment guide
style: format code with prettier
refactor: simplify search logic
test: add booking flow tests
\`\`\`

### Branch Strategy

\`\`\`bash
main              # Production
develop           # Development
feature/booking   # New features
fix/payment-bug   # Bug fixes
\`\`\`

---

## 🎯 Best Practices Summary

1. **Use Server Components by default** - Add 'use client' only when needed
2. **Validate all inputs** - Use Zod schemas
3. **Cache aggressively** - Use Redis for frequently accessed data
4. **Optimize images** - Always use Next/Image
5. **Handle errors gracefully** - Implement proper error boundaries
6. **Type everything** - Leverage TypeScript
7. **Keep components small** - Single responsibility principle
8. **Use semantic HTML** - Improve accessibility
9. **Test critical paths** - Focus on booking and payment flows
10. **Monitor production** - Use Sentry and analytics

---

## 📚 Additional Resources

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React Server Components](https://react.dev/reference/rsc/server-components)

---

**Happy Coding! 🚀**
