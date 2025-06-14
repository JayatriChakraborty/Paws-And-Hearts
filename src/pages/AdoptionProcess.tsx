
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, FileText, Users, Home, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    icon: Search,
    title: "Find Your Friend",
    description: "Browse our gallery of lovable pets. Use our filters to find the perfect match for your lifestyle and family.",
    link: "/browse-pets",
    linkLabel: "Browse Pets"
  },
  {
    icon: FileText,
    title: "Submit an Application",
    description: "Ready to take the next step? Fill out our simple online adoption form to tell us more about you and your home.",
    link: "/adoption-form",
    linkLabel: "Fill Adoption Form"
  },
  {
    icon: Users,
    title: "Meet & Greet",
    description: "We'll schedule a time for you to meet your potential new family member. It's a great chance to see if you connect.",
  },
  {
    icon: Home,
    title: "Welcome Them Home",
    description: "Once everything is approved, you'll finalize the paperwork and can welcome your new best friend into their forever home!",
  }
];

const AdoptionProcess = () => {
  return (
    <div className="bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">Your Journey to Adoption</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A simple, supportive process to unite you with your new companion.
          </p>
        </div>
        <div className="relative">
          {/* Dashed line for desktop */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-transparent">
             <div className="h-full w-full border-t-2 border-dashed border-primary/50"></div>
          </div>
        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="text-center shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-primary/20 pt-4">
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4 ring-8 ring-background z-10">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Step {index + 1}: {step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{step.description}</CardDescription>
                  {step.link && (
                    <Button asChild className="mt-6">
                      <Link to={step.link}>{step.linkLabel}</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
         <div className="text-center mt-16">
          <Card className="max-w-3xl mx-auto p-8 bg-secondary/50">
            <Heart className="h-10 w-10 text-primary mx-auto mb-4"/>
            <h3 className="text-2xl font-bold">Our Commitment to You</h3>
            <p className="text-muted-foreground mt-2">
              We're here to support you every step of the way, from finding the right pet to offering guidance after adoption. Our goal is to create happy, lifelong bonds.
            </p>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdoptionProcess;
