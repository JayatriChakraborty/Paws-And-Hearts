
import { PawPrint } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => {
  return (
    <a href="/" className={cn("flex items-center gap-2", className)}>
      <PawPrint className="h-8 w-8 text-primary" />
      <span className="text-xl font-bold text-foreground">Paws & Hearts</span>
    </a>
  );
};
