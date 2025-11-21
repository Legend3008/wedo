/**
 * Shared Layout Components
 * Reusable components for consistent page structure
 */

'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { DESIGN_SYSTEM, fadeInUp } from '@/lib/design-system';
import { cn } from '@/utils/helpers';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'gradient';
}

export function SectionContainer({ children, className, background = 'white' }: SectionContainerProps) {
  const bgClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    gradient: 'bg-gradient-to-b from-gray-50 to-white',
  };

  return (
    <section className={cn(DESIGN_SYSTEM.spacing.section, bgClasses[background], className)}>
      <div className={DESIGN_SYSTEM.spacing.container}>{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({ title, subtitle, align = 'center', className }: SectionHeaderProps) {
  const alignClasses = align === 'center' ? 'text-center' : 'text-left';

  return (
    <motion.div {...fadeInUp} className={cn(alignClasses, 'mb-12', className)}>
      <h2 className={cn(DESIGN_SYSTEM.typography.h2, 'text-gray-900 mb-4')}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(DESIGN_SYSTEM.typography.subtitle, 'text-gray-600 max-w-3xl', align === 'center' ? 'mx-auto' : '')}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
