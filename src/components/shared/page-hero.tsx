/**
 * Page Hero Component
 * Consistent hero section across all pages
 */

'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { DESIGN_SYSTEM } from '@/lib/design-system';
import { cn } from '@/utils/helpers';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

interface PageHeroProps {
  title: string;
  titleAccent?: string;
  subtitle: string;
  badge?: {
    icon?: React.ReactNode;
    text: string;
  };
  backgroundImage: string;
  height?: 'tall' | 'medium' | 'short';
  children?: React.ReactNode;
}

export function PageHero({
  title,
  titleAccent,
  subtitle,
  badge,
  backgroundImage,
  height = 'medium',
  children,
}: PageHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      });

      gsap.from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      });

      if (children) {
        gsap.from('.hero-content', {
          y: 30,
          opacity: 0,
          duration: 1,
          delay: 0.6,
          ease: 'power3.out',
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [children]);

  const heightClasses = {
    tall: 'h-[80vh]',
    medium: 'h-[70vh]',
    short: 'h-[60vh]',
  };

  return (
    <section ref={heroRef} className={cn('relative flex items-center justify-center overflow-hidden', heightClasses[height])}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src={backgroundImage} alt={title} fill className="object-cover" priority />
        <div className={cn('absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70', DESIGN_SYSTEM.colors.overlay)} />
      </div>

      {/* Content */}
      <div className={cn('relative z-10 text-center', DESIGN_SYSTEM.spacing.container)}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          {badge && (
            <Badge className="mb-6 bg-white/20 backdrop-blur-sm text-white border-white/30">
              {badge.icon}
              {badge.text}
            </Badge>
          )}

          <h1 ref={titleRef} className={cn(DESIGN_SYSTEM.typography.hero, 'text-white mb-6')}>
            {title}
            {titleAccent && (
              <>
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {titleAccent}
                </span>
              </>
            )}
          </h1>

          <p className={cn('hero-subtitle', DESIGN_SYSTEM.typography.subtitle, 'text-white/90 max-w-3xl mx-auto mb-8')}>
            {subtitle}
          </p>

          {children && <div className="hero-content">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
