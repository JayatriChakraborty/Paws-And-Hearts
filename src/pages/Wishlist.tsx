
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PetCard } from '@/components/PetCard';
import { PetDetailsDialog } from '@/components/PetDetailsDialog';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/context/WishlistContext';
import { pets as allPets, Pet } from '@/data/pets';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Wishlist = () => {
  const { wishlist } = useWishlist();
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const wishlistedPets = allPets.filter(pet => wishlist.includes(pet.id));

  const handleViewDetails = (pet: Pet) => {
    setSelectedPet(pet);
    setIsDialogOpen(true);
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold tracking-tight">My Wishlist</h1>
        </div>
        {wishlistedPets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistedPets.map(pet => (
              <PetCard key={pet.id} pet={pet} onViewDetails={handleViewDetails} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 flex flex-col items-center">
            <Heart className="w-16 h-16 text-muted-foreground/50 mb-4" />
            <h2 className="text-2xl font-semibold">Your Wishlist is Empty</h2>
            <p className="text-muted-foreground mt-2 max-w-md">
              You haven't added any pets to your wishlist yet. Start browsing to find pets you love!
            </p>
            <Button asChild className="mt-6">
              <Link to="/browse-pets">Browse Pets</Link>
            </Button>
          </div>
        )}
      </main>
      <Footer />
      <PetDetailsDialog pet={selectedPet} isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
};

export default Wishlist;
