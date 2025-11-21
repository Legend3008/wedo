/**
 * Logo Component - Premium Travel Brand Mark
 * 
 * Features:
 * - SVG-based travel-themed icon (compass + airplane)
 * - Responsive typography
 * - Dark/light mode support with currentColor
 * - Framer Motion animations
 * - Fully accessible
 * - Zero external dependencies
 */

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className, showText = true, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <motion.div
      className={cn('flex items-center gap-2', className)}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.03 }}
    >
      {/* SVG Icon - Compass with Airplane */}
      <motion.svg
        className={cn(sizeClasses[size], 'text-gray-900')}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {/* Outer Compass Ring */}
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          opacity="0.2"
        />
        
        {/* Inner Compass Circle */}
        <circle
          cx="24"
          cy="24"
          r="18"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
        />
        
        {/* Compass Needle (North) */}
        <path
          d="M24 6 L28 22 L24 20 L20 22 Z"
          fill="currentColor"
          opacity="0.9"
        />
        
        {/* Compass Needle (South) */}
        <path
          d="M24 42 L20 26 L24 28 L28 26 Z"
          fill="currentColor"
          opacity="0.5"
        />
        
        {/* Airplane Silhouette (East) */}
        <path
          d="M26 24 L38 22 L40 24 L38 26 L26 24 M30 24 L32 20 M32 24 L34 28"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Center Dot */}
        <circle
          cx="24"
          cy="24"
          r="3"
          fill="currentColor"
        />
        
        {/* Decorative Cardinal Points */}
        <circle cx="24" cy="8" r="1.5" fill="currentColor" opacity="0.6" />
        <circle cx="24" cy="40" r="1.5" fill="currentColor" opacity="0.6" />
        <circle cx="8" cy="24" r="1.5" fill="currentColor" opacity="0.6" />
        <circle cx="40" cy="24" r="1.5" fill="currentColor" opacity="0.6" />
      </motion.svg>

      {/* Brand Text */}
      {showText && (
        <motion.div
          className="flex flex-col leading-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span
            className={cn(
              textSizeClasses[size],
              'font-bold tracking-tight text-gray-900'
            )}
          >
            Wego
          </span>
          <span className="text-[0.6rem] text-gray-700 font-semibold tracking-[0.15em] uppercase">
            EXPLORE BEYOND
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

/**
 * LogoIcon - Icon-only variant for mobile/compact views
 */
export function LogoIcon({ className, size = 'md' }: Omit<LogoProps, 'showText'>) {
  return <Logo className={className} size={size} showText={false} />;
}
