
import { Button } from '@/components/ui/button';

export const Story = () => {
  return (
    <section className="py-16 sm:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
             <img src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=2070&auto=format&fit=crop" alt="Shelter history" className="rounded-lg shadow-lg w-full h-auto" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Story: A Decade of Dedication</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              For over ten years, Paws & Hearts has been a beacon of hope for homeless animals. We started as a small group of volunteers and have grown into a community dedicated to rescue, rehabilitation, and rehoming.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Our mission is simple: to provide a safe and loving environment for every pet until they find their forever family. We believe every animal deserves a chance to be loved.
            </p>
            <div className="mt-8">
              <Button variant="outline">Learn More About Us</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
