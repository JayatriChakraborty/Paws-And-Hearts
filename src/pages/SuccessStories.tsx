
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star, CheckCircle } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah & Tom',
    pet: 'Luna',
    text: "Adopting Luna was the best decision we've ever made. She brought so much joy into our home. The process with Paws & Hearts was seamless and supportive.",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?q=80&w=600&auto=format&fit=crop",
    avatar: 'https://i.pravatar.cc/150?img=6'
  },
  {
    name: 'Jessica M.',
    image: 'https://images.unsplash.com/photo-1596797882565-3c137a235f42?q=80&w=600&auto=format&fit=crop',
    text: 'The team was so helpful! They matched me with the perfect furry companion. I couldn\'t be happier.',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    name: 'David Chen',
    image: 'https://images.unsplash.com/photo-1588269833633-fe39e5b99b42?q=80&w=600&auto=format&fit=crop',
    text: 'A truly wonderful organization. You can tell they really care about the animals. Highly recommend!',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    name: 'Emily R.',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop',
    text: 'I was nervous about adopting, but they made the process so easy and reassuring. My new dog is my best friend.',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    name: 'Michael B.',
    image: 'https://images.unsplash.com/photo-15917682b4387-d46a480b3323?q=80&w=600&auto=format&fit=crop',
    text: 'Found my soulmate in a tiny kitten here. The work they do is incredible. So grateful for them.',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    name: 'Sophia L.',
    image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=600&auto=format&fit=crop',
    text: 'Professional, caring, and dedicated. They answered all my questions and made sure it was a good fit.',
    avatar: 'https://i.pravatar.cc/150?img=5',
  }
];

const SuccessStories = () => {
  return (
    <div className="bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">Happy Tails, Happy Homes</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Inspiring stories from our amazing community of adopters.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((story, index) => (
            <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src={story.image} alt={`Adopted pet story ${index + 1}`} className="h-56 w-full object-cover" />
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="flex items-center mb-4">
                  <Avatar>
                    <AvatarImage src={story.avatar} alt={story.name} />
                    <AvatarFallback>{story.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="font-semibold">{story.name}</p>
                     <div className="flex items-center text-xs text-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        <span>Verified Adoption</span>
                      </div>
                  </div>
                </div>
                <blockquote className="text-muted-foreground italic flex-grow">"{story.text}"</blockquote>
                <div className="flex text-accent mt-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SuccessStories;
