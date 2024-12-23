'use client';

import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ParticleBackground } from '@/components/ui/particle-background';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 animate-fade-in">
          Organize Your Life, One Event at a Time
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-delay">
          The most intuitive and dynamic calendar app to plan, track, and manage your events seamlessly.
        </p>
        <Link
        href={'/dashboard'}>
        <Button 
          size="lg" 
          className="animate-bounce hover:scale-105 transition-transform"
        >
          Try It Now for Free
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button></Link>
      </div>
    </section>
  );
}