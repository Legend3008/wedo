/**
 * Destinations Client - Matches Landing Page Design System
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Star, Search, Filter, ArrowRight, Globe, Palmtree, Mountain, Building2 } from 'lucide-react';
import { formatCurrency } from '@/utils/helpers';
import gsap from 'gsap';

const destinations = [
  {
    id: '1',
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
    price: 1299,
    rating: 4.9,
    reviews: 234,
    type: 'Beach',
    description: 'Stunning sunsets and white-washed buildings',
  },
  {
    id: '2',
    name: 'Swiss Alps',
    country: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
    price: 1899,
    rating: 4.8,
    reviews: 189,
    type: 'Mountain',
    description: 'Breathtaking alpine landscapes and adventure',
  },
  {
    id: '3',
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    price: 1599,
    rating: 4.9,
    reviews: 312,
    type: 'City',
    description: 'Modern metropolis meets ancient tradition',
  },
  {
    id: '4',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    price: 999,
    rating: 4.7,
    reviews: 276,
    type: 'Beach',
    description: 'Tropical paradise with lush rice terraces',
  },
  {
    id: '5',
    name: 'Iceland',
    country: 'Iceland',
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800',
    price: 2199,
    rating: 5.0,
    reviews: 156,
    type: 'Adventure',
    description: 'Northern lights and volcanic landscapes',
  },
  {
    id: '6',
    name: 'Maldives',
    country: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
    price: 2499,
    rating: 4.9,
    reviews: 198,
    type: 'Resort',
    description: 'Luxury overwater villas and crystal waters',
  },
  {
    id: '7',
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    price: 1799,
    rating: 4.8,
    reviews: 445,
    type: 'City',
    description: 'The City of Light and romance',
  },
  {
    id: '8',
    name: 'Machu Picchu',
    country: 'Peru',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800',
    price: 1499,
    rating: 4.9,
    reviews: 267,
    type: 'Adventure',
    description: 'Ancient Incan citadel in the clouds',
  },
  {
    id: '9',
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    price: 1899,
    rating: 4.7,
    reviews: 389,
    type: 'City',
    description: 'Futuristic skyline and luxury shopping',
  },
];

const categories = ['All', 'Beach', 'Mountain', 'City', 'Adventure', 'Resort'];

export function DestinationsClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);
  
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

      gsap.from('.search-section', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = destinations;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((d) => d.type === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (d) =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredDestinations(filtered);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Matching Landing Page Style */}
      <div
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      >
        {/* Animated Background Shapes - Same as Landing */}
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
            Explore Amazing
            <br />
            <span className="gradient-text">Destinations</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            Discover breathtaking locations across the globe and start planning your next unforgettable journey
          </p>

          {/* Search Section */}
          <div className="search-section max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg rounded-lg shadow-lg border-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <Filter className="h-5 w-5 text-gray-600 flex-shrink-0" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="flex-shrink-0"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid - Same Style as Landing Page Featured Destinations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="mb-12 text-center">
            <p className="text-xl text-gray-600">
              Showing <span className="font-bold text-gray-900">{filteredDestinations.length}</span> destinations
            </p>
          </div>

          {filteredDestinations.length === 0 ? (
            <div className="text-center py-20">
              <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No destinations found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
              <Button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination) => (
                <Link
                  key={destination.id}
                  href={`/destinations/${destination.id}`}
                  className="group"
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge className="absolute top-4 right-4 bg-white text-gray-900">
                        {destination.type}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">
                            {destination.name}
                          </h3>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{destination.country}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">From</div>
                          <div className="text-2xl font-bold text-blue-600">
                            {formatCurrency(destination.price)}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{destination.description}</p>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 font-semibold">
                            {destination.rating}
                          </span>
                          <span className="ml-1 text-gray-600 text-sm">
                            ({destination.reviews})
                          </span>
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
          )}
        </div>
      </section>

      {/* Why Choose Us Section - Same Style as Landing */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Why Book With Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the best travel planning with our expert services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Palmtree,
                title: 'Handpicked Destinations',
                description: 'Carefully curated locations for unforgettable experiences',
              },
              {
                icon: Globe,
                title: 'Global Coverage',
                description: '500+ destinations across 80+ countries worldwide',
              },
              {
                icon: Mountain,
                title: 'Adventure Ready',
                description: 'From relaxation to extreme adventures, we have it all',
              },
              {
                icon: Building2,
                title: 'City Escapes',
                description: 'Explore vibrant cities and cultural landmarks',
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
