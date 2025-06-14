import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'sonner';

const navItems = [
  { name: 'Browse Pets', href: '/browse-pets' },
  { name: 'Success Stories', href: '/success-stories' },
  { name: 'Adoption Process', href: '/adoption-process' },
  { name: 'Contact', href: '/contact' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('You have been logged out.');
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out.');
    }
  };

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
            {currentUser && (
               <Link
                to={isAdmin ? "/admin/dashboard" : "/dashboard"}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {isAdmin ? "Admin Dashboard" : "Dashboard"}
              </Link>
            )}
          </nav>
          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <Button onClick={handleLogout} variant="outline">Logout</Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                    <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
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
           {currentUser && (
               <Link
                to={isAdmin ? "/admin/dashboard" : "/dashboard"}
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                {isAdmin ? "Admin Dashboard" : "Dashboard"}
              </Link>
            )}
          <div className="pt-4 pb-2 px-3">
             {currentUser ? (
                <Button onClick={() => { handleLogout(); setIsMenuOpen(false); }} variant="outline" className="w-full">Logout</Button>
            ) : (
                <div className="flex flex-col gap-2">
                    <Button asChild className="w-full">
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                    </Button>
                    <Button variant="secondary" asChild className="w-full">
                        <Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
                    </Button>
                </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
