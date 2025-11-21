/**
 * Destinations Page - Premium Travel Catalog
 * 
 * Features:
 * - Cinematic hero with search
 * - Filter by continent, budget, theme
 * - Beautiful destination cards with hover effects
 * - Framer Motion animations
 * - Fully responsive
 * - SEO optimized
 */

import { Metadata } from 'next';
import { DestinationsClient } from './destinations-client';

export const metadata: Metadata = {
  title: 'Explore Destinations | Wego - Discover Your Next Adventure',
  description: 'Browse through 500+ handpicked travel destinations worldwide. Find your perfect getaway with curated experiences, from tropical beaches to mountain retreats.',
  keywords: 'travel destinations, vacation spots, holiday destinations, beach resorts, mountain getaways',
  openGraph: {
    title: 'Explore Destinations | Wego',
    description: 'Browse through 500+ handpicked travel destinations worldwide',
    type: 'website',
  },
};

export default function DestinationsPage() {
  return <DestinationsClient />;
}
