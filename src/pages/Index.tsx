
import { Header } from '@/components/Header';
import { Hero } from '@/components/sections/Hero';
import { Benefits } from '@/components/sections/Benefits';
import { SocialProof } from '@/components/sections/SocialProof';
import { Story } from '@/components/sections/Story';
import { Guarantee } from '@/components/sections/Guarantee';
import { CallToAction } from '@/components/sections/CallToAction';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="bg-background">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <SocialProof />
        <Story />
        <Guarantee />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
