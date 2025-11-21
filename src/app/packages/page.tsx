/**
 * Packages Page - Travel Package Catalog
 * 
 * Features:
 * - Hero with tagline
 * - Category filters (Honeymoon, Adventure, Luxury, etc.)
 * - Beautiful package cards with pricing
 * - Inclusions, highlights, badges
 * - Framer Motion animations
 * - SEO optimized
 */

import { Metadata } from 'next';
import { PackagesClient } from './packages-client';

export const metadata: Metadata = {
  title: 'Travel Packages | Wego - Curated Adventures & Deals',
  description: 'Discover handcrafted travel packages for honeymoons, adventures, luxury getaways, and family vacations. Best prices guaranteed with 24/7 support.',
  keywords: 'travel packages, vacation packages, honeymoon packages, adventure tours, luxury travel, family vacations',
  openGraph: {
    title: 'Travel Packages | Wego',
    description: 'Discover handcrafted travel packages for every traveler',
    type: 'website',
  },
};

export default function PackagesPage() {
  return <PackagesClient />;
}
