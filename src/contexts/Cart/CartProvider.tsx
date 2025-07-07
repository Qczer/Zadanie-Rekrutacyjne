import { useCallback, useEffect, useMemo, useState } from "react";
import type { Product } from "../../models/Product";
import CartContext from "./CartContext";


const CART_STORAGE_KEY = "cartProducts";

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartProducts, setCartProducts] = useState<Array<{ product: Product; amount: number }>>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartProducts));
    } catch {
      // możesz dodać obsługę błędu jak chcesz
    }
  }, [cartProducts]);

  const addToCart = useCallback((product: Product) => {
    setCartProducts(prev => {
      const existing = prev.find(p => p.product.id === product.id);
      if (existing) {
        return prev.map(p =>
          p.product.id === product.id
            ? { ...p, amount: p.amount + 1 }
            : p
        );
      } else {
        return [...prev, { product, amount: 1 }];
      }
    });
  }, []);

  const decreaseFromCart = useCallback((product: Product) => {
    setCartProducts(prev => {
      return prev
        .map(p =>
          p.product.id === product.id
            ? { ...p, amount: p.amount - 1 }
            : p
        )
        .filter(p => p.amount > 0);
    });
  }, []);

  const removeFromCart = useCallback((product: Product) => {
    setCartProducts(prev =>
      prev.filter(p => p.product !== product)
    );
  }, []);

  const setProductAmount = useCallback((product: Product, amount: number) => {
    if (amount <= 0) {
      removeFromCart(product);
      return;
    }
    setCartProducts(prev =>
      prev.map(p =>
        p.product === product
          ? { ...p, amount }
          : p
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartProducts([]);
  }, []);

  const value = useMemo(() => ({ cartProducts, setCartProducts, addToCart, decreaseFromCart, setProductAmount, removeFromCart, clearCart }), [cartProducts, setCartProducts, addToCart, decreaseFromCart, setProductAmount, removeFromCart, clearCart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;