'use client';

import { useInView } from '@/hooks/use-in-view';
import { Card } from '@/components/ui/card';
import { Calendar, Users, Settings } from 'lucide-react';

const steps = [
  {
    title: 'Create Your Calendar',
    description: 'Set up your personal or team calendar in seconds',
    icon: Calendar,
  },
  {
    title: 'Invite Your Team',
    description: 'Share and collaborate with team members effortlessly',
    icon: Users,
  },
  {
    title: 'Customize Settings',
    description: 'Personalize notifications and preferences to your needs',
    icon: Settings,
  },
];

export function HowItWorksSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className={`mb-8 p-6 flex items-center transform transition-all duration-700 ${
                inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="mr-6">
                <step.icon className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}