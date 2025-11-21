/**
 * Contact Client - Matches Landing Page Design System
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock, Send, Shield, Award, HeartHandshake } from 'lucide-react';
import gsap from 'gsap';

export function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Matching Landing Page Style */}
      <div
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
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
            Let's Plan Your
            <br />
            <span className="gradient-text">Dream Adventure</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            Our travel experts are here to help you create the perfect journey
          </p>

          {/* Contact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { value: '<24h', label: 'Response Time' },
              { value: '24/7', label: 'Support Available' },
              { value: '50K+', label: 'Happy Clients' },
            ].map((stat) => (
              <div key={stat.label} className="hero-button">
                <div className="text-4xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <CardContent className="p-8 md:p-10">
                  <h2 className="text-4xl font-bold text-gray-900 mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Fill out the form below and we'll get back to you within 24 hours
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        required
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your travel plans..."
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Contact Information
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Reach out to us through any of these channels
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {[
                  {
                    icon: Phone,
                    title: 'Phone',
                    value: '+1 (555) 123-4567',
                    description: 'Mon-Fri 9AM-6PM EST',
                  },
                  {
                    icon: Mail,
                    title: 'Email',
                    value: 'hello@travelagent.com',
                    description: 'We reply within 24 hours',
                  },
                  {
                    icon: MapPin,
                    title: 'Office',
                    value: '123 Travel Street',
                    description: 'New York, NY 10001',
                  },
                  {
                    icon: Clock,
                    title: 'Business Hours',
                    value: 'Monday - Friday',
                    description: '9:00 AM - 6:00 PM EST',
                  },
                ].map((item) => (
                  <Card
                    key={item.title}
                    className="hover:shadow-xl transition-shadow"
                  >
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-900 font-semibold mb-1">
                          {item.value}
                        </p>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Contact Us - Same Style as Landing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              How We Can Help
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our team is ready to assist you with all your travel needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Custom Itineraries',
                description: 'Get personalized trip plans tailored to your preferences and budget.',
              },
              {
                icon: Award,
                title: 'Expert Advice',
                description: 'Benefit from our team\'s extensive knowledge and travel experience.',
              },
              {
                icon: HeartHandshake,
                title: 'Booking Support',
                description: 'Help with reservations, visas, and travel documentation.',
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

      {/* Map Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Visit Our Office
            </h2>
            <p className="text-xl text-gray-600">
              Come say hello! We'd love to meet you in person
            </p>
          </div>

          <Card className="overflow-hidden hover:shadow-2xl transition-shadow">
            <div className="relative h-[400px] md:h-[500px] bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648718453!2d-73.98784668459377!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <CardContent className="p-8 bg-white">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    TravelAgent Headquarters
                  </h3>
                  <p className="text-gray-600 mb-4">
                    123 Travel Street, Suite 456<br />
                    New York, NY 10001, United States
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      Mon-Fri: 9AM-6PM EST
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      +1 (555) 123-4567
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
