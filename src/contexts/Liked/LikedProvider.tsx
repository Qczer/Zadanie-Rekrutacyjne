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
    try {
      localStorage.setItem(LIKED_STORAGE_KEY, JSON.stringify(likedProducts));
    } catch {
      // możesz dodać obsługę błędu jak chcesz
    }
  }, [likedProducts]);

  const addToLiked = useCallback((product: Product) => {
    setLikedProducts(prev => [...prev, product]);
  }, []);

  const removeFromLiked = useCallback((product: Product) => {
    setLikedProducts(prev => prev.filter(p => p.name !== product.name));
  }, []);

  const value = useMemo(
    () => ({
      likedProducts,
      setLikedProducts,
      addToLiked,
      removeFromLiked
    }),
    [likedProducts, setLikedProducts, addToLiked, removeFromLiked]
  );

  return (
    <LikedContext.Provider value={value}>
      {children}
    </LikedContext.Provider>
  );
}

export default LikedProvider;