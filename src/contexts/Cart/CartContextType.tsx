import type { Dispatch, SetStateAction } from "react";
import type { Product } from "../../models/Product";
import type CartItem from "../../models/CartItem";
import type { ProductVariant } from "../../models/ProductVariant";

interface CartContextType {
  cartProducts: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, amount?: number) => void;
  setCartProducts: Dispatch<SetStateAction<CartItem[]>>;
  decreaseFromCart: (cartItemId: string) => void;
  removeFromCart: (cartItemId: string) => void;
  setProductAmount: (cartItemId: string, amount: number) => void;
  clearCart: () => void;
}

export type { CartContextType };