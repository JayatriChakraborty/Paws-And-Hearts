
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const navItems = [
  { name: 'Browse Pets', href: '/browse-pets' },
  { name: 'Success Stories', href: '/success-stories' },
  { name: 'Adoption Process', href: '/adoption-process' },
  { name: 'Contact', href: '/contact' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="hidden md:block">
            <Button asChild>
              <Link to="/browse-pets">Adopt Now</Link>
            </Button>
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden transition-all duration-300 ease-in-out',
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-secondary"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 pb-2 px-3">
            <Button asChild className="w-full">
                <Link to="/browse-pets" onClick={() => setIsMenuOpen(false)}>Adopt Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
