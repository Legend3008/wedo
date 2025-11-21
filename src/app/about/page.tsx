/**
 * About Page - Our Story & Mission
 * 
 * Features:
 * - Cinematic hero with fade-in
 * - Story section with split layout
 * - Mission & values
 * - Why choose us with icon cards
 * - Timeline/milestones
 * - Elegant typography
 * - Smooth scroll animations
 */

import { Metadata } from 'next';
import { AboutClient } from './about-client';

export const metadata: Metadata = {
  title: 'About Us | Wego - Your Trusted Travel Partner',
  description: 'Discover the story behind Wego. Learn about our mission to create unforgettable travel experiences and why 50,000+ travelers trust us with their adventures.',
  keywords: 'about wego, travel company, our story, our mission, travel experts',
  openGraph: {
    title: 'About Us | Wego',
    description: 'Your trusted partner in creating unforgettable travel experiences',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
