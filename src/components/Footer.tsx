import { Logo } from './Logo';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Twitter, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm">Changing lives, one paw at a time. Join our community of pet lovers.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="mailto:contact@pawsandhearts.com" className="hover:text-primary transition-colors">contact@pawsandhearts.com</a></li>
              <li><a href="tel:+1234567890" className="hover:text-primary transition-colors">(123) 456-7890</a></li>
              <li>123 Adoption Lane, Happy Town, USA</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Quick Links</h3>
             <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/adoption-process" className="hover:text-primary transition-colors">Adoption Process</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Newsletter</h3>
            <p className="mt-4 text-sm">Get updates on new arrivals and success stories.</p>
            <form className="mt-4 flex gap-2">
              <Input type="email" placeholder="Your email" className="bg-background"/>
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Paws & Hearts. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
