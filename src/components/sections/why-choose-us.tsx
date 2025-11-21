/**
 * Why Choose Us Section
 */

import { Shield, Award, Clock, HeartHandshake } from 'lucide-react';

const features = [
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
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Why Choose TravelAgent
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're committed to making your travel dreams a reality
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
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
  );
}
