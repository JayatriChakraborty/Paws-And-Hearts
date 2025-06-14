
import { PawPrint } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link to="/" className={cn("flex items-center gap-2", className)}>
      <PawPrint className="h-8 w-8 text-primary" />
      <span className="text-xl font-bold text-foreground">Paws & Hearts</span>
    </Link>
  );
};
