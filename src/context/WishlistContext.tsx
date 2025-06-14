
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface WishlistContextType {
  wishlist: number[];
  addToWishlist: (petId: number) => void;
  removeFromWishlist: (petId: number) => void;
  isInWishlist: (petId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const [wishlist, setWishlist] = useState<number[]>(() => {
    try {
      const item = window.localStorage.getItem('wishlist');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.error(error);
    }
  }, [wishlist]);

  const addToWishlist = useCallback((petId: number) => {
    setWishlist((prev) => [...prev, petId]);
  }, []);

  const removeFromWishlist = useCallback((petId: number) => {
    setWishlist((prev) => prev.filter((id) => id !== petId));
  }, []);

  const isInWishlist = useCallback((petId: number) => {
    return wishlist.includes(petId);
  }, [wishlist]);

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
