import type { Dispatch, SetStateAction } from "react";
import type { Product } from "../../models/Product";

interface LikedContextType {
  likedProducts: Product[];
  setLikedProducts: Dispatch<SetStateAction<Product[]>>;
  addToLiked: (product: Product) => void;
  removeFromLiked: (product: Product) => void;
}

export type { LikedContextType };