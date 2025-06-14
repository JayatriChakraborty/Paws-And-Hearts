
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, CheckCircle } from "lucide-react";

const testimonials = [
  {
    name: 'Jessica M.',
    image: 'https://i.pravatar.cc/150?img=1',
    text: 'The team was so helpful! They matched me with the perfect furry companion. I couldn\'t be happier.',
    pet: 'a fluffy cat named Leo'
  },
  {
    name: 'David Chen',
    image: 'https://i.pravatar.cc/150?img=2',
    text: 'A truly wonderful organization. You can tell they really care about the animals. Highly recommend!',
    pet: 'a playful puppy named Max'
  },
  {
    name: 'Emily R.',
    image: 'https://i.pravatar.cc/150?img=3',
    text: 'I was nervous about adopting, but they made the process so easy and reassuring. My new dog is my best friend.',
    pet: 'a rescue dog named Daisy'
  },
  {
    name: 'Michael B.',
    image: 'https://i.pravatar.cc/150?img=4',
    text: 'Found my soulmate in a tiny kitten here. The work they do is incredible. So grateful for them.',
    pet: 'a kitten named Shadow'
  },
  {
    name: 'Sophia L.',
    image: 'https://i.pravatar.cc/150?img=5',
    text: 'Professional, caring, and dedicated. They answered all my questions and made sure it was a good fit.',
    pet: 'a senior dog named Buddy'
  }
];

export const Guarantee = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 4000 })]);

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="embla__slide p-4">
                <Card className="h-full shadow-sm">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      <Avatar>
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <p className="font-semibold">{testimonial.name}</p>
                        <div className="flex items-center text-xs text-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          <span>Verified Adoption</span>
                        </div>
                      </div>
                    </div>
                    <blockquote className="text-muted-foreground italic flex-grow">"{testimonial.text}"</blockquote>
                    <div className="flex text-accent mt-4">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
