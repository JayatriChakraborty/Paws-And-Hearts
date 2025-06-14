
import { Heart, Home, ShieldCheck } from 'lucide-react';

const benefits = [
  {
    icon: Heart,
    title: 'Save a Life',
    description: 'By adopting, you\'re giving a deserving animal a second chance at a happy life.',
  },
  {
    icon: Home,
    title: 'Find a Friend',
    description: 'Pets provide unconditional love and companionship, enriching your life in countless ways.',
  },
  {
    icon: ShieldCheck,
    title: 'Healthy & Vetted',
    description: 'All our pets are vaccinated, microchipped, and health-checked before adoption.',
  },
];

export const Benefits = () => {
  return (
    <section className="py-16 sm:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-card p-8 rounded-lg shadow-sm">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-6">
                <benefit.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">{benefit.title}</h3>
              <p className="mt-2 text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
