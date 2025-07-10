import { useCallback, useEffect, useMemo, useState } from "react";
import type { Product } from "../../models/Product";
import LikedContext from "./LikedContext";

const LIKED_STORAGE_KEY = "likedProducts";

const LikedProvider = ({ children }: { children: React.ReactNode }) => {
  const [likedProducts, setLikedProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(LIKED_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(LIKED_STORAGE_KEY, JSON.stringify(likedProducts));
  }, [likedProducts]);

  const addToLiked = useCallback((product: Product) => {
    setLikedProducts(prev => {
      if (prev.some(p => p.id === product.id)) {
        return prev; // Already liked, do nothing
      }
      return [...prev, product];
    });
  }, []);

  const removeFromLiked = useCallback((product: Product) => {
    setLikedProducts(prev => prev.filter(p => p.id !== product.id));
  }, []);

  const value = useMemo(
    () => ({ likedProducts, setLikedProducts, addToLiked, removeFromLiked }),
    [likedProducts, setLikedProducts, addToLiked, removeFromLiked]
  );

  return (
    <LikedContext.Provider value={value}>
      {children}
    </LikedContext.Provider>
  );
}

export default LikedProvider;