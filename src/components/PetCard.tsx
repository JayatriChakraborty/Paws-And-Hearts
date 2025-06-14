
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pet } from '@/data/pets';
import { useWishlist } from '@/context/WishlistContext';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PetCardProps {
  pet: Pet;
  onViewDetails: (pet: Pet) => void;
}

export const PetCard = ({ pet, onViewDetails }: PetCardProps) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isWishlisted = isInWishlist(pet.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(pet.id);
    } else {
      addToWishlist(pet.id);
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0 relative">
        <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover rounded-t-lg" />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 bg-white/70 hover:bg-white rounded-full text-destructive transition-colors"
          onClick={handleWishlistToggle}
        >
          <Heart className={cn("w-6 h-6", isWishlisted && "fill-destructive")} />
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-bold">{pet.name}</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">{pet.age} • {pet.breed}</p>
        <p className="mt-2 text-sm text-foreground/80 line-clamp-3">
          {pet.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={() => onViewDetails(pet)}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
