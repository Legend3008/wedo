/**
 * 404 Not Found Page
 * Premium design matching the landing page
 */

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 */}
        <div className="mb-8 relative">
          <h1 className="text-9xl font-bold text-gray-200 select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl">🗺️</div>
          </div>
        </div>

        {/* Content */}
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Lost in Paradise?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Looks like this page took a vacation without us. Let's get you back on track!
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Go Home
            </Button>
          </Link>
          <Link href="/destinations">
            <Button size="lg" variant="outline" className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Explore Destinations
            </Button>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Or try these popular pages:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { href: '/packages', label: 'Packages' },
              { href: '/about', label: 'About Us' },
              { href: '/contact', label: 'Contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
