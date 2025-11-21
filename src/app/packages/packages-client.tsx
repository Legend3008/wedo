/**
 * Packages Client - Matches Landing Page Design System
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, MapPin, Star, ArrowRight, Check, Clock, Award, Shield, HeartHandshake } from 'lucide-react';
import { formatCurrency } from '@/utils/helpers';
import gsap from 'gsap';

const packages = [
  {
    id: '1',
    name: 'Greek Islands Escape',
    destination: 'Greece',
    duration: '7 Days, 6 Nights',
    price: 2499,
    originalPrice: 2999,
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
    rating: 4.9,
    reviews: 234,
    category: 'Luxury',
    included: ['Flights', 'Hotels', 'Daily Breakfast', 'Guided Tours'],
    groupSize: '2-8 people',
  },
  {
    id: '2',
    name: 'Swiss Alps Adventure',
    destination: 'Switzerland',
    duration: '5 Days, 4 Nights',
    price: 3299,
    originalPrice: 3799,
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
    rating: 4.8,
    reviews: 189,
    category: 'Adventure',
    included: ['Accommodation', 'Ski Pass', 'Equipment', 'Instructor'],
    groupSize: '4-10 people',
  },
  {
    id: '3',
    name: 'Tokyo Cultural Tour',
    destination: 'Japan',
    duration: '6 Days, 5 Nights',
    price: 2799,
    originalPrice: 3199,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    rating: 4.9,
    reviews: 312,
    category: 'Cultural',
    included: ['Hotels', 'JR Pass', 'Cultural Experiences', 'Guide'],
    groupSize: '2-6 people',
  },
  {
    id: '4',
    name: 'Bali Paradise Retreat',
    destination: 'Indonesia',
    duration: '8 Days, 7 Nights',
    price: 1899,
    originalPrice: 2299,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    rating: 4.7,
    reviews: 276,
    category: 'Beach',
    included: ['Resort Stay', 'Spa Treatments', 'Meals', 'Airport Transfer'],
    groupSize: '2-4 people',
  },
  {
    id: '5',
    name: 'Iceland Explorer',
    destination: 'Iceland',
    duration: '9 Days, 8 Nights',
    price: 3999,
    originalPrice: 4499,
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800',
    rating: 5.0,
    reviews: 156,
    category: 'Adventure',
    included: ['Accommodation', 'Car Rental', 'Northern Lights Tour', 'Hot Springs'],
    groupSize: '2-5 people',
  },
  {
    id: '6',
    name: 'Maldives Luxury',
    destination: 'Maldives',
    duration: '5 Days, 4 Nights',
    price: 4499,
    originalPrice: 5299,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
    rating: 4.9,
    reviews: 198,
    category: 'Luxury',
    included: ['Water Villa', 'All Meals', 'Water Sports', 'Couples Spa'],
    groupSize: '2 people',
  },
];

const categories = ['All', 'Luxury', 'Adventure', 'Beach', 'Cultural'];

export function PackagesClient() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredPackages, setFilteredPackages] = useState(packages);
  
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

  // Filter logic
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPackages(packages);
    } else {
      setFilteredPackages(packages.filter((p) => p.category === selectedCategory));
    }
  }, [selectedCategory]);

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
            All-Inclusive
            <br />
            <span className="gradient-text">Travel Packages</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            Curated experiences with everything included — flights, hotels, activities, and more
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="hero-button text-lg px-8 py-6">
              <Calendar className="mr-2 h-5 w-5" />
              View All Packages
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="hero-button text-lg px-8 py-6"
            >
              Custom Package
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Grid - Same Style as Landing Page */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <Link
                key={pkg.id}
                href={`/packages/${pkg.id}`}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 right-4 bg-white text-gray-900">
                      {pkg.category}
                    </Badge>
                    {pkg.originalPrice && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Save {formatCurrency(pkg.originalPrice - pkg.price)}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                          {pkg.name}
                        </h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{pkg.destination}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{pkg.duration}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        {pkg.originalPrice && (
                          <div className="text-sm text-gray-400 line-through">
                            {formatCurrency(pkg.originalPrice)}
                          </div>
                        )}
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(pkg.price)}
                        </div>
                        <div className="text-xs text-gray-600">per person</div>
                      </div>
                    </div>

                    {/* Included Items */}
                    <div className="my-4 space-y-2">
                      {pkg.included.slice(0, 3).map((item) => (
                        <div key={item} className="flex items-center text-sm text-gray-600">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-semibold">{pkg.rating}</span>
                        <span className="ml-1 text-gray-600 text-sm">({pkg.reviews})</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Details
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Same Style as Landing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Our Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for the perfect vacation, all in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'All-Inclusive',
                description: 'Everything included — no hidden fees or surprises',
              },
              {
                icon: Award,
                title: 'Best Value',
                description: 'Competitive pricing with premium experiences',
              },
              {
                icon: Clock,
                title: 'Flexible Booking',
                description: 'Free cancellation up to 48 hours before travel',
              },
              {
                icon: HeartHandshake,
                title: 'Expert Guides',
                description: 'Local professionals who know the destination best',
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
    </div>
  );
}
