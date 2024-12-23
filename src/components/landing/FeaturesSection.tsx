'use client';

import { Calendar, Clock, FileJson, Bell } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useInView } from '@/hooks/use-in-view';

const features = [
  {
    title: 'Drag & Drop Scheduling',
    description: 'Effortlessly plan your events with intuitive drag and drop functionality',
    icon: Calendar,
  },
  {
    title: 'Real-time Notifications',
    description: 'Stay updated with instant notifications and smart reminders',
    icon: Bell,
  },
  {
    title: 'Export Flexibility',
    description: 'Export your events in JSON or CSV format for backup and sharing',
    icon: FileJson,
  },
  {
    title: 'Dark Mode Support',
    description: 'Switch between light and dark themes for comfortable viewing',
    icon: Clock,
  },
];

export function FeaturesSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`p-6 hover:scale-105 transform transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <feature.icon className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}