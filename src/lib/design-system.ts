/**
 * Design System Constants
 * 
 * Centralized spacing, typography, colors, shadows, and animation values
 * to ensure perfect consistency across all pages
 */

export const DESIGN_SYSTEM = {
  // Spacing Scale (Tailwind-based)
  spacing: {
    section: 'py-24', // Consistent section padding
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    cardGap: 'gap-8',
    contentGap: 'gap-6',
  },

  // Typography Scale
  typography: {
    hero: 'text-5xl sm:text-6xl md:text-7xl font-bold',
    h1: 'text-4xl sm:text-5xl font-bold',
    h2: 'text-3xl sm:text-4xl font-bold',
    h3: 'text-2xl sm:text-3xl font-bold',
    h4: 'text-xl sm:text-2xl font-bold',
    body: 'text-base sm:text-lg',
    subtitle: 'text-lg sm:text-xl',
  },

  // Border Radius
  radius: {
    card: 'rounded-2xl',
    button: 'rounded-lg',
    badge: 'rounded-full',
    image: 'rounded-xl',
  },

  // Shadows
  shadow: {
    card: 'shadow-lg hover:shadow-2xl',
    float: 'shadow-xl',
    soft: 'shadow-md',
  },

  // Colors (using CSS variables from globals.css)
  colors: {
    gradient: {
      primary: 'from-blue-600 to-purple-600',
      secondary: 'from-emerald-500 to-cyan-500',
      accent: 'from-orange-500 to-pink-500',
    },
    overlay: 'bg-black/60',
  },

  // Animation
  animation: {
    duration: {
      fast: 0.3,
      normal: 0.5,
      slow: 0.8,
    },
    stagger: 0.1,
    ease: 'easeOut',
  },

  // Grid
  grid: {
    destinations: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    packages: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    features: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    split: 'grid grid-cols-1 lg:grid-cols-2',
  },
} as const;

// Animation Variants (Framer Motion)
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: DESIGN_SYSTEM.animation.duration.normal, ease: DESIGN_SYSTEM.animation.ease },
};

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: DESIGN_SYSTEM.animation.duration.normal },
};

export const staggerContainer = {
  initial: {},
  whileInView: {},
  viewport: { once: true },
  transition: { staggerChildren: DESIGN_SYSTEM.animation.stagger },
};

export const cardHover = {
  whileHover: { y: -8, transition: { duration: DESIGN_SYSTEM.animation.duration.fast } },
};
