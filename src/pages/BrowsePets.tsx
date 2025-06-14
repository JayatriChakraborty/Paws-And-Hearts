
import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PetCard } from '@/components/PetCard';
import { PetDetailsDialog } from '@/components/PetDetailsDialog';
import { PetFilters, Filters } from '@/components/PetFilters';
import { pets as allPets, Pet } from '@/data/pets';

const BrowsePets = () => {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    type: 'all',
    age: 'all',
    gender: 'all',
    size: 'all',
    sort: 'recent',
  });
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredPets = useMemo(() => {
    let pets = [...allPets];

    // Filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      pets = pets.filter(p => p.name.toLowerCase().includes(searchTerm) || p.breed.toLowerCase().includes(searchTerm));
    }
    if (filters.type !== 'all') {
      pets = pets.filter(p => p.type === filters.type);
    }
    if (filters.age !== 'all') {
      pets = pets.filter(p => p.age === filters.age);
    }
    if (filters.gender !== 'all') {
      pets = pets.filter(p => p.gender === filters.gender);
    }
    if (filters.size !== 'all') {
      pets = pets.filter(p => p.size === filters.size);
    }

    // Sort
    switch (filters.sort) {
      case 'name-asc':
        pets.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        pets.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'recent':
      default:
        // default is original order (which can be "recent")
        break;
    }
    
    return pets;
  }, [filters]);

  const handleViewDetails = (pet: Pet) => {
    setSelectedPet(pet);
    setIsDialogOpen(true);
  };
  
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <PetFilters onFilterChange={setFilters} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredPets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPets.map(pet => (
              <PetCard key={pet.id} pet={pet} onViewDetails={handleViewDetails} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">No Pets Found</h2>
            <p className="text-muted-foreground mt-2">Try adjusting your filters to find your new best friend!</p>
          </div>
        )}
      </main>
      <Footer />
      <PetDetailsDialog pet={selectedPet} isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
};

export default BrowsePets;
