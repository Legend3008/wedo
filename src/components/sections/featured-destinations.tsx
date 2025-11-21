/**
 * Featured Destinations Section
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/utils/helpers';

const featuredDestinations = [
  {
    id: '1',
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
    price: 1299,
    rating: 4.9,
    reviews: 234,
    type: 'Beach',
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
  },
];

export function FeaturedDestinations() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Featured Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked destinations for your next unforgettable journey
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.map((destination) => (
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
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
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

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/destinations">
            <Button size="lg">
              View All Destinations
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
