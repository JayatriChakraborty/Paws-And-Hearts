
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Filter, Search, X } from 'lucide-react';
import { Pet } from '@/data/pets';

export type Filters = {
  search: string;
  type: string;
  age: string;
  gender: string;
  size: string;
  sort: string;
};

interface PetFiltersProps {
  onFilterChange: (filters: Filters) => void;
}

const initialFilters: Filters = {
  search: '',
  type: 'all',
  age: 'all',
  gender: 'all',
  size: 'all',
  sort: 'recent',
};

export const PetFilters = ({ onFilterChange }: PetFiltersProps) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleInputChange = (field: keyof Filters, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    if(field !== 'search') {
      onFilterChange(newFilters);
    }
  };
  
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onFilterChange(filters);
    }
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    onFilterChange(initialFilters);
    setIsSheetOpen(false);
  };
  
  const activeFilterCount = Object.values(filters).filter(v => v !== '' && v !== 'all' && v !== 'recent').length;

  return (
    <div className="sticky top-20 bg-background/95 z-40 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex gap-4">
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                type="text"
                placeholder="Search by name or breed..."
                className="pl-10"
                value={filters.search}
                onChange={(e) => handleInputChange('search', e.target.value)}
                onKeyDown={handleSearchKeyDown}
                />
            </div>
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                    <Filter className="h-5 w-5 mr-2" />
                    Filter
                    {activeFilterCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                            {activeFilterCount}
                        </span>
                    )}
                </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-lg">
                <SheetHeader>
                    <SheetTitle>Filter & Sort Pets</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4 sm:grid-cols-2">
                    <div className="space-y-2">
                    <Label>Pet Type</Label>
                    <Select value={filters.type} onValueChange={(v) => handleInputChange('type', v)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Dog">Dogs</SelectItem>
                        <SelectItem value="Cat">Cats</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                    {/* Add more filters for age, gender, size similarly */}
                    <div className="space-y-2"><Label>Age</Label><Select value={filters.age} onValueChange={(v) => handleInputChange('age', v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="all">All Ages</SelectItem><SelectItem value="Young">Young</SelectItem><SelectItem value="Adult">Adult</SelectItem><SelectItem value="Senior">Senior</SelectItem></SelectContent></Select></div>
                    <div className="space-y-2"><Label>Gender</Label><Select value={filters.gender} onValueChange={(v) => handleInputChange('gender', v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="all">All Genders</SelectItem><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem></SelectContent></Select></div>
                    <div className="space-y-2"><Label>Size</Label><Select value={filters.size} onValueChange={(v) => handleInputChange('size', v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="all">All Sizes</SelectItem><SelectItem value="Small">Small</SelectItem><SelectItem value="Medium">Medium</SelectItem><SelectItem value="Large">Large</SelectItem></SelectContent></Select></div>
                    <div className="space-y-2 sm:col-span-2">
                        <Label>Sort By</Label>
                        <Select value={filters.sort} onValueChange={(v) => handleInputChange('sort', v)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="recent">Recently Added</SelectItem>
                                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <SheetFooter>
                    <Button variant="outline" onClick={clearFilters}>Clear All</Button>
                    <Button onClick={() => setIsSheetOpen(false)}>Apply</Button>
                </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    </div>
  );
};

