# 🚀 TravelAgent - Complete Deployment Guide

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Setup](#database-setup)
4. [Vercel Deployment](#vercel-deployment)
5. [Alternative Deployments](#alternative-deployments)
6. [Post-Deployment](#post-deployment)
7. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

Before deploying, ensure you have accounts for:

- [Vercel](https://vercel.com) - Frontend hosting
- [Supabase](https://supabase.com) or [Railway](https://railway.app) - PostgreSQL
- [Upstash](https://upstash.com) - Redis
- [Stripe](https://stripe.com) - Payment processing
- [Resend](https://resend.com) - Transactional emails
- [Cloudinary](https://cloudinary.com) - Image hosting
- [Google Cloud Console](https://console.cloud.google.com) - OAuth (optional)

---

## 🔐 Environment Setup

### 1. Database (Supabase - Recommended)

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create new project
3. Copy connection string from **Settings > Database**
4. Use **Transaction Pooler** connection string for production

Example:
\`\`\`
DATABASE_URL="postgresql://postgres.[PROJECT_ID]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
\`\`\`

### 2. Redis (Upstash)

1. Go to [Upstash Console](https://console.upstash.com)
2. Create Redis database (choose region close to your app)
3. Copy **UPSTASH_REDIS_REST_URL** and **UPSTASH_REDIS_REST_TOKEN**

\`\`\`
REDIS_URL="https://[ID].upstash.io"
REDIS_TOKEN="[YOUR_TOKEN]"
\`\`\`

### 3. Stripe

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Get API keys from **Developers > API keys**
3. Setup webhook endpoint: \`https://yourdomain.com/api/webhooks/stripe\`
4. Copy webhook secret

\`\`\`
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
\`\`\`

### 4. Resend

1. Go to [Resend Dashboard](https://resend.com)
2. Create API key
3. Verify your domain

\`\`\`
RESEND_API_KEY="re_..."
\`\`\`

### 5. Cloudinary

1. Go to [Cloudinary Console](https://cloudinary.com/console)
2. Get credentials from Dashboard

\`\`\`
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="123456789"
CLOUDINARY_API_SECRET="your-secret"
\`\`\`

### 6. Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: \`https://yourdomain.com/api/auth/callback/google\`

\`\`\`
GOOGLE_CLIENT_ID="xxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxx"
\`\`\`

### 7. NextAuth

Generate a secure secret:

\`\`\`bash
openssl rand -base64 32
\`\`\`

\`\`\`
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="[GENERATED_SECRET]"
\`\`\`

---

## 🗄️ Database Setup

### Run Migrations

\`\`\`bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# OR use migrations
npx prisma migrate deploy
\`\`\`

### Seed Initial Data (Optional)

Create \`prisma/seed.ts\`:

\`\`\`typescript
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await hash('Admin@123', 12);
  
  await prisma.user.create({
    data: {
      email: 'admin@travelagent.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  });

  // Add sample destinations
  await prisma.destination.createMany({
    data: [
      {
        slug: 'santorini-greece',
        name: 'Santorini',
        country: 'Greece',
        city: 'Santorini',
        description: 'Beautiful Greek island...',
        shortDesc: 'Stunning sunsets and white buildings',
        type: ['BEACH', 'CULTURAL'],
        priceFrom: 1299,
        coverImage: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e',
        images: ['https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e'],
        latitude: 36.3932,
        longitude: 25.4615,
        highlights: ['Sunset views', 'Blue domes', 'Wine tasting'],
        included: ['Accommodation', 'Breakfast'],
        excluded: ['Flights', 'Lunch'],
        duration: 7,
        isFeatured: true,
      },
      // Add more destinations...
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
\`\`\`

Run seed:
\`\`\`bash
npx prisma db seed
\`\`\`

---

## 🌐 Vercel Deployment

### Method 1: GitHub (Recommended)

1. **Push to GitHub**

\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/travelagent.git
git push -u origin main
\`\`\`

2. **Import to Vercel**

- Go to [Vercel Dashboard](https://vercel.com/dashboard)
- Click **Add New Project**
- Import your GitHub repository
- Configure project:
  - Framework Preset: **Next.js**
  - Root Directory: **./**
  - Build Command: \`npm run build\`
  - Output Directory: \`.next\`

3. **Add Environment Variables**

Add all environment variables from your \`.env\` file in Vercel dashboard.

4. **Deploy**

Vercel will automatically deploy your project.

### Method 2: Vercel CLI

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
\`\`\`

---

## 🐳 Alternative Deployments

### Docker

\`\`\`bash
# Build image
docker build -t travelagent .

# Run container
docker run -p 3000:3000 \\
  -e DATABASE_URL="your-db-url" \\
  -e REDIS_URL="your-redis-url" \\
  travelagent
\`\`\`

### Docker Compose

\`\`\`bash
# Start all services
docker-compose up -d

# Check logs
docker-compose logs -f app
\`\`\`

### AWS / DigitalOcean

Deploy using PM2:

\`\`\`bash
# Install PM2
npm install -g pm2

# Build
npm run build

# Start with PM2
pm2 start npm --name "travelagent" -- start

# Save PM2 configuration
pm2 save

# Auto-restart on reboot
pm2 startup
\`\`\`

---

## ✅ Post-Deployment

### 1. Verify Deployment

- Visit your deployed URL
- Test authentication flow
- Test booking flow (use Stripe test mode)
- Check email delivery

### 2. Setup Domain

In Vercel:
1. Go to **Project Settings > Domains**
2. Add your custom domain
3. Follow DNS configuration instructions

### 3. Setup Stripe Webhook

1. Go to Stripe Dashboard
2. Add webhook endpoint: \`https://yourdomain.com/api/webhooks/stripe\`
3. Select events:
   - \`payment_intent.succeeded\`
   - \`payment_intent.payment_failed\`
   - \`charge.refunded\`
4. Copy webhook secret to environment variables

### 4. Setup Analytics

**Google Analytics:**
1. Create GA4 property
2. Add \`NEXT_PUBLIC_GA_ID\` to environment

**Sentry:**
1. Create Sentry project
2. Add \`SENTRY_DSN\` to environment
3. Install Sentry SDK:
\`\`\`bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
\`\`\`

### 5. Enable Monitoring

- Setup uptime monitoring (UptimeRobot, Pingdom)
- Configure error alerts in Sentry
- Setup performance monitoring in Vercel

---

## 🐛 Troubleshooting

### Build Errors

**Error: Prisma Client not generated**
\`\`\`bash
npx prisma generate
\`\`\`

**Error: Module not found**
\`\`\`bash
npm install
npm run build
\`\`\`

### Database Connection Issues

**Timeout errors:**
- Use connection pooling (Supabase Pooler)
- Set \`connection_limit=1\` in DATABASE_URL
- Enable statement timeout in Prisma

**Too many connections:**
\`\`\`prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_DATABASE_URL")
}
\`\`\`

### Redis Connection Issues

For Upstash, use REST API:
\`\`\`typescript
import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});
\`\`\`

### Stripe Webhook Issues

1. Verify webhook secret is correct
2. Check endpoint is publicly accessible
3. Verify event types are selected
4. Test with Stripe CLI:
\`\`\`bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
\`\`\`

---

## 📊 Performance Optimization

### 1. Enable Caching

- Use Redis for query caching
- Enable Vercel Edge caching
- Use ISR for destination pages

### 2. Image Optimization

- Use Next/Image component
- Configure Cloudinary transformations
- Enable WebP/AVIF formats

### 3. Database Optimization

- Add indexes on frequently queried fields
- Use database connection pooling
- Enable query caching

### 4. CDN Setup

- Use Vercel Edge Network
- Configure proper cache headers
- Enable compression

---

## 🔒 Security Checklist

- [ ] All environment variables secured
- [ ] HTTPS enabled
- [ ] CORS configured
- [ ] Rate limiting enabled
- [ ] Input validation implemented
- [ ] SQL injection prevention (Prisma)
- [ ] XSS protection enabled
- [ ] CSRF tokens implemented (NextAuth)
- [ ] Secure cookie settings
- [ ] Content Security Policy configured

---

## 📝 Maintenance

### Regular Tasks

- Monitor error logs (Sentry)
- Check performance metrics (Vercel Analytics)
- Update dependencies monthly
- Backup database weekly
- Review security alerts

### Updating

\`\`\`bash
# Update dependencies
npm update

# Check for security issues
npm audit

# Fix vulnerabilities
npm audit fix
\`\`\`

---

## 🆘 Support

For issues:
1. Check [GitHub Issues](https://github.com/yourusername/travelagent/issues)
2. Review [Next.js Docs](https://nextjs.org/docs)
3. Check [Vercel Docs](https://vercel.com/docs)

---

**Deployment Complete! 🎉**

Your TravelAgent platform is now live and ready to serve customers worldwide.
