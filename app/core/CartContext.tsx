import React, { createContext, useContext, useState, ReactNode } from 'react';
import UseFetch from './Fetch';
import { useAuth } from './AuthContext';
import { useLocalStorage } from './useLocalStorage';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  order: (item: CartItem) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { getData, error } = UseFetch();
  const { user } = useAuth();
  const [cart, setCart, clearCart] = useLocalStorage<CartItem[]>('cartItems', []);

  const addToCart = (item: CartItem) => {
    cart.some(cartItem => cartItem.id === item.id)
    ? cart
    : setCart([...cart, item])
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const order = async (item: CartItem) => {
    await getData('placed-orders', {
      method: 'POST',
      body: JSON.stringify({ userId: user?.userId, qty: item.quantity, itemId: item.id }),
      headers: { 'Content-Type': 'application/json' }
    })
    error && console.error(`Failed to place order: ${item.name}`);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, order }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};