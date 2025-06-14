
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah & Tom",
    pet: "Luna",
    text: "Adopting Luna was the best decision we've ever made. She brought so much joy into our home. The process with Paws & Hearts was seamless and supportive.",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?q=80&w=1974&auto=format&fit=crop",
  },
];

export const SocialProof = () => {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Happy Tails, Happy Homes</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Don't just take our word for it. Hear from our happy adopters.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Card className="overflow-hidden shadow-lg">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                   <img src={testimonials[0].image} alt={`Adopted pet ${testimonials[0].pet}`} className="object-cover h-64 w-full md:h-full" />
                </div>
                <div className="p-8 flex flex-col justify-center md:w-1/2">
                   <div className="flex text-accent mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                  </div>
                  <blockquote className="text-lg italic text-foreground">"{testimonials[0].text}"</blockquote>
                  <p className="mt-4 font-semibold text-right">- {testimonials[0].name}, proud parents of {testimonials[0].pet}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-primary">5,000+</p>
              <p className="mt-2 text-muted-foreground">Pets Adopted</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-primary">98%</p>
              <p className="mt-2 text-muted-foreground">Success Rate</p>
            </div>
             <div>
              <p className="text-5xl font-bold text-primary">10+</p>
              <p className="mt-2 text-muted-foreground">Years of Service</p>
            </div>
             <div>
              <p className="text-5xl font-bold text-primary">100%</p>
              <p className="mt-2 text-muted-foreground">Volunteer Run</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
