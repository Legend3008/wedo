/**
 * Global TypeScript Type Definitions
 */

import { UserRole } from '@prisma/client';
import { DefaultSession } from 'next-auth';

// Extend NextAuth types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession['user'];
  }

  interface User {
    role: UserRole;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: UserRole;
  }
}

// Environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      REDIS_URL: string;
      REDIS_TOKEN?: string;
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      STRIPE_SECRET_KEY: string;
      STRIPE_PUBLISHABLE_KEY: string;
      STRIPE_WEBHOOK_SECRET: string;
      RESEND_API_KEY: string;
      CLOUDINARY_CLOUD_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
      OPENWEATHER_API_KEY: string;
      GOOGLE_MAPS_API_KEY: string;
      CURRENCY_API_KEY: string;
      NEXT_PUBLIC_GA_ID: string;
      NEXT_PUBLIC_APP_URL: string;
      SENTRY_DSN: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {};
