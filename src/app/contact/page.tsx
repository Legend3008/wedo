/**
 * Contact Page - Get in Touch
 * 
 * Features:
 * - Clean hero section
 * - Contact form with validation
 * - Contact info cards
 * - Embedded map
 * - Motion animations
 * - Form submission handling
 */

import { Metadata } from 'next';
import { ContactClient } from './contact-client';

export const metadata: Metadata = {
  title: 'Contact Us | Wego - Get in Touch with Travel Experts',
  description: 'Have questions about your next trip? Contact our travel experts 24/7. We\'re here to help plan your perfect vacation.',
  keywords: 'contact wego, travel support, customer service, travel inquiry, get help',
  openGraph: {
    title: 'Contact Us | Wego',
    description: 'Get in touch with our travel experts',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
