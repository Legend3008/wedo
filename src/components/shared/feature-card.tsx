/**
 * Feature Card Component
 * Consistent card design across all pages
 */

'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { DESIGN_SYSTEM, fadeInUp, cardHover } from '@/lib/design-system';
import { cn } from '@/utils/helpers';

interface FeatureCardProps {
  icon?: ReactNode;
  iconColor?: string;
  title: string;
  description: string;
  delay?: number;
  className?: string;
}

export function FeatureCard({ icon, iconColor = 'from-blue-500 to-purple-600', title, description, delay = 0, className }: FeatureCardProps) {
  return (
    <motion.div
      {...fadeInUp}
      {...cardHover}
      transition={{ duration: DESIGN_SYSTEM.animation.duration.normal, delay, ease: DESIGN_SYSTEM.animation.ease }}
    >
      <Card className={cn('p-8 text-center h-full', DESIGN_SYSTEM.shadow.card, 'transition-all duration-300', className)}>
        {icon && (
          <div className={cn('w-16 h-16 mx-auto mb-6 flex items-center justify-center', DESIGN_SYSTEM.radius.card, `bg-gradient-to-br ${iconColor}`)}>
            <div className="text-white">{icon}</div>
          </div>
        )}
        <h3 className={cn(DESIGN_SYSTEM.typography.h4, 'text-gray-900 mb-3')}>{title}</h3>
        <p className="text-gray-600">{description}</p>
      </Card>
    </motion.div>
  );
}
