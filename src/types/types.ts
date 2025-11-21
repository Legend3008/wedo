/**
 * Shared TypeScript Types and Interfaces
 */

// Extended types with relations
export interface DestinationWithPackages {
  id: string;
  name: string;
  country: string;
  city: string;
  slug: string;
  description: string;
  shortDesc: string;
  type: string[];
  priceFrom: number;
  coverImage: string;
  images: string[];
  rating: number;
  reviewCount: number;
  packages?: Array<{
    id: string;
    name: string;
    price: number;
    duration: number;
  }>;
  _count?: {
    bookings: number;
    reviews: number;
    savedTrips: number;
  };
}

export interface BookingWithRelations {
  id: string;
  bookingNumber: string;
  userId: string;
  destinationId: string;
  startDate: Date;
  endDate: Date;
  travelers: number;
  total: number;
  bookingStatus: string;
  destination: {
    id: string;
    name: string;
    city: string;
    country: string;
  };
  package?: {
    id: string;
    name: string;
  } | null;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
}

export interface ReviewWithUser {
  id: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

// Search and filter types
export interface DestinationSearchParams {
  query?: string;
  country?: string;
  city?: string;
  type?: string[];
  priceMin?: number;
  priceMax?: number;
  duration?: number;
  rating?: number;
  page?: number;
  limit?: number;
  sortBy?: 'price' | 'rating' | 'popularity' | 'newest';
  sortOrder?: 'asc' | 'desc';
}

export interface DestinationSearchResult {
  destinations: DestinationWithPackages[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

// Booking form types
export interface BookingFormData {
  destinationId: string;
  packageId?: string;
  startDate: Date;
  endDate: Date;
  travelers: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  specialRequests?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

// Weather API types
export interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  description: string;
  icon: string;
  windSpeed: number;
}

// Currency conversion
export interface CurrencyRate {
  from: string;
  to: string;
  rate: number;
  updated: Date;
}

// Analytics types
export interface AnalyticsData {
  views: number;
  searches: number;
  bookings: number;
  revenue: number;
  date: string;
}

export interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  totalUsers: number;
  totalDestinations: number;
  recentBookings: BookingWithRelations[];
  popularDestinations: DestinationWithPackages[];
  monthlyRevenue: { month: string; revenue: number }[];
}
