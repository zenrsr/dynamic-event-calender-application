'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Project Manager',
    content: "This calendar app has revolutionized how I manage my team's schedule. The interface is intuitive and the features are exactly what we needed.",
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
  },
  {
    name: 'Michael Chen',
    role: 'Freelance Designer',
    content: "The best calendar app I've ever used. The export feature saves me hours of work every month.",
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Event Coordinator',
    content: 'Finally, a calendar that understands the needs of event planners. The drag-and-drop feature is a game-changer.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="max-w-3xl mx-auto relative h-[300px]">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`absolute w-full p-6 transition-all duration-500 ${
                index === activeIndex
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <div className="flex items-center mb-4">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                </Avatar>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-lg italic">{testimonial.content}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}