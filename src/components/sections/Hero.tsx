
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=2070&auto=format&fit=crop')" }}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Open Your Heart, Open Your Home
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/90">
          Every pet deserves a loving family. Discover your new best friend and change a life forever.
        </p>
        <div className="mt-8">
          <Button size="lg" asChild>
            <Link to="/browse-pets">Adopt Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
