
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { PawPrint, Heart, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CallToAction = () => {
  return (
    <section className="py-16 sm:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to Change a Life?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Your journey to finding a new companion starts here.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          <Card className="flex flex-col shadow-sm">
            <CardHeader className="items-center text-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <PawPrint className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Browse Pets</CardTitle>
              <CardDescription>See all our adorable pets waiting for a home.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow"></CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/browse-pets">View Available Pets</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col border-primary border-2 shadow-lg transform lg:scale-105 z-10 bg-card">
             <CardHeader className="items-center text-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Start Adoption</CardTitle>
              <CardDescription>Begin the simple process to bring your new friend home.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow"></CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link to="/adoption-form">Fill Adoption Form</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="flex flex-col shadow-sm">
            <CardHeader className="items-center text-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Gift className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Donate or Sponsor</CardTitle>
              <CardDescription>Can't adopt? You can still make a huge difference.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow"></CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Support Our Mission</Button>
            </CardFooter>
          </Card>

        </div>
      </div>
    </section>
  );
};
