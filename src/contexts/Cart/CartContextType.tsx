import type { Dispatch, SetStateAction } from "react";
import type Product from "../../models/Product";

interface CartContextType {
  cartProducts: { product: Product; amount: number }[];
  setCartProducts: Dispatch<SetStateAction<{ product: Product; amount: number }[]>>;
  addToCart: (product: Product) => void;
  decreaseFromCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  setProductAmount: (product: Product, amount: number) => void;
  clearCart: () => void;
}

export type { CartContextType };