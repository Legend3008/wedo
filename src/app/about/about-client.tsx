/**
 * About Client - Matches Landing Page Design System
 */

'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Award, Clock, HeartHandshake, Globe, Users, TrendingUp, Star } from 'lucide-react';
import gsap from 'gsap';

export function AboutClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // GSAP animations matching landing page
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      });

      gsap.from('.hero-button', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Matching Landing Page Style */}
      <div
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      >
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-gray-900"
          >
            Crafting Unforgettable
            <br />
            <span className="gradient-text">Travel Experiences</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            Your trusted partner in exploring the world's most amazing destinations since 2015
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
      </div>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Founded in 2015, TravelAgent began with a simple mission: to make extraordinary travel experiences accessible to everyone. What started as a small startup has grown into a trusted platform serving over 50,000 happy travelers worldwide.
                </p>
                <p>
                  Today, we curate personalized journeys to 500+ destinations across 80+ countries, partnering with the world's best hotels, airlines, and local guides to ensure every trip becomes a cherished memory.
                </p>
                <p>
                  Our team of travel experts is passionate about helping you discover the world, one unforgettable adventure at a time.
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800"
                  alt="Our story"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Same Style as Landing Page */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Why Choose TravelAgent
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to making your travel dreams a reality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Secure Booking',
                description: 'Your payment and personal information are protected with industry-leading encryption.',
              },
              {
                icon: Award,
                title: 'Best Price Guarantee',
                description: 'We match any competitor\'s price and offer exclusive deals you won\'t find elsewhere.',
              },
              {
                icon: Clock,
                title: '24/7 Support',
                description: 'Our dedicated team is always available to assist you, no matter where you are.',
              },
              {
                icon: HeartHandshake,
                title: 'Personalized Service',
                description: 'Every trip is tailored to your preferences, ensuring a unique experience.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="text-center p-6 rounded-xl hover:bg-blue-50 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Our Mission & Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: 'Global Reach',
                description: '500+ destinations across 80+ countries with local expertise and authentic experiences.',
              },
              {
                icon: Users,
                title: 'Customer First',
                description: 'Your satisfaction and experience are our top priority in every decision we make.',
              },
              {
                icon: TrendingUp,
                title: 'Continuous Innovation',
                description: 'Always improving our platform and services to deliver the best travel experience.',
              },
            ].map((value) => (
              <Card
                key={value.title}
                className="hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Same as Landing Page */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied travelers who trusted us with their dream vacations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Travel Enthusiast',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
                rating: 5,
                text: 'Absolutely incredible experience! The attention to detail and personalized service made our honeymoon in Santorini unforgettable.',
              },
              {
                name: 'Michael Chen',
                role: 'Adventure Seeker',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
                rating: 5,
                text: 'From booking to the actual trip, everything was seamless. The Swiss Alps tour exceeded all expectations.',
              },
              {
                name: 'Emily Rodriguez',
                role: 'Digital Nomad',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
                rating: 5,
                text: 'Best travel agency I\'ve worked with. They understood my needs perfectly and crafted an amazing Japan trip.',
              },
            ].map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
