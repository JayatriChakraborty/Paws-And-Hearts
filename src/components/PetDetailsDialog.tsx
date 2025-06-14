
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Pet } from '@/data/pets';
import { toast } from 'sonner';

interface PetDetailsDialogProps {
  pet: Pet | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const PetDetailsDialog = ({ pet, isOpen, onOpenChange }: PetDetailsDialogProps) => {
  if (!pet) return null;

  const handleAdoptClick = () => {
    toast.success(`Adoption request for ${pet.name} sent!`, {
      description: 'Our team will review it and get in touch with you soon.',
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <img src={pet.image} alt={pet.name} className="w-full h-auto object-cover rounded-lg" />
          </div>
          <div>
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold">{pet.name}</DialogTitle>
              <DialogDescription className="text-lg text-muted-foreground">{pet.breed}</DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="font-semibold">Age:</span>
                <span>{pet.age}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold">Gender:</span>
                <span>{pet.gender}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold">Size:</span>
                <span>{pet.size}</span>
              </div>
              <p className="text-sm text-foreground/80">{pet.description}</p>
              <Button size="lg" className="w-full mt-6" onClick={handleAdoptClick}>
                Want to Adopt {pet.name}?
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
