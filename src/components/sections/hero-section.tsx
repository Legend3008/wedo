/**
 * Hero Section with 3D and Animations
 * Optimized with React.memo and proper cleanup
 */

'use client';

import { useEffect, useRef, memo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

function HeroSectionComponent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const animationRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return;

    // GSAP Animations with proper context
    animationRef.current = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
      })
        .from(
          subtitleRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 1,
          },
          '-=0.7'
        )
        .from(
          '.hero-button',
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
          },
          '-=0.5'
        );
    }, heroRef);

    return () => {
      animationRef.current?.revert();
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
    >
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob will-change-transform" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 will-change-transform" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 will-change-transform" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-gray-900"
        >
          Discover Your
          <br />
          <span className="gradient-text">Next Adventure</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
        >
          Explore breathtaking destinations, create unforgettable memories, and
          embark on the journey of a lifetime
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/destinations">
            <Button size="lg" className="hero-button text-lg px-8 py-6">
              <Search className="mr-2 h-5 w-5" />
              Explore Destinations
            </Button>
          </Link>
          <Link href="/packages">
            <Button
              size="lg"
              variant="outline"
              className="hero-button text-lg px-8 py-6"
            >
              View Packages
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '500+', label: 'Destinations' },
            { value: '50K+', label: 'Happy Travelers' },
            { value: '4.9/5', label: 'Average Rating' },
            { value: '24/7', label: 'Support' },
          ].map((stat) => (
            <div key={stat.label} className="hero-button">
              <div className="text-4xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce" aria-label="Scroll down">
        <div className="w-6 h-10 rounded-full border-2 border-gray-400 flex justify-center p-2">
          <div className="w-1 h-3 bg-gray-400 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export const HeroSection = memo(HeroSectionComponent);
