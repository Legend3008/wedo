/**
 * Homepage - TravelAgent
 * Premium travel booking platform with 3D animations
 */

import { HeroSection } from '@/components/sections/hero-section';
import { FeaturedDestinations } from '@/components/sections/featured-destinations';
import { WhyChooseUs } from '@/components/sections/why-choose-us';
import { Testimonials } from '@/components/sections/testimonials';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedDestinations />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}

