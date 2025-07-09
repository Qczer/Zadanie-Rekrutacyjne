import { useCallback, useEffect, useMemo, useState } from "react";
import type { Product } from "../../models/Product";
import CartContext from "./CartContext";
import type CartItem from "../../models/CartItem";

const CART_STORAGE_KEY = "cartProducts";

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartProducts, setCartProducts] = useState<Array<CartItem>>(() => {
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

  const addToCart = useCallback((product: Product, color: string, size: string) => {
    const cartItemId = `${product.id}-${color}-${size}`;
    setCartProducts(prev => {
      const existing = prev.find(p => p.id === cartItemId);
      if (existing) {
        return prev.map(p =>
          p.id === cartItemId
            ? { ...p, amount: p.amount + 1 }
            : p
        );
      }
      else {
        const newItem: CartItem = {
          id: cartItemId,
          product,
          color,
          size,
          amount: 1,
        };
        return [...prev, newItem];
      }
    });
  }, []);

  const decreaseFromCart = useCallback((cartItemId: string) => {
    setCartProducts(prev => {
      return prev
        .map(p =>
          p.id === cartItemId
            ? { ...p, amount: p.amount - 1 }
            : p
        )
        .filter(p => p.amount > 0);
    });
  }, []);

  const removeFromCart = useCallback((cartItemId: string) => {
    setCartProducts(prev =>
      prev.filter(p => p.id !== cartItemId)
    );
  }, []);

  const setProductAmount = useCallback((cartItemId: string, amount: number) => {
    if (amount <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartProducts(prev =>
      prev.map(p =>
        p.id === cartItemId
          ? { ...p, amount }
          : p
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartProducts([]);
  }, []);

  const value = useMemo(() => ({
    cartProducts,
    setCartProducts,
    addToCart,
    decreaseFromCart,
    setProductAmount,
    removeFromCart,
    clearCart
  }), [cartProducts, setCartProducts, addToCart, decreaseFromCart, setProductAmount, removeFromCart, clearCart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;