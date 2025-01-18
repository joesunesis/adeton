import React, { createContext, useContext, useState, ReactNode } from 'react';
import UseFetch from './Fetch';
import { useAuth } from './AuthContext';
import { useLocalStorage } from './useLocalStorage';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderContextProps {
  cart: OrderItem[];
  addToCart: (item: OrderItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  order: (item: OrderItem) => void;
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { getData, error } = UseFetch();
  const { user } = useAuth();
  const [cart, setCart, clearCart] = useLocalStorage<OrderItem[]>('cartItems', []);

  const addToCart = (item: OrderItem) => {
    cart.some(cartItem => cartItem.id === item.id)
    ? cart
    : setCart([...cart, item])
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const order = async (item: OrderItem) => {
    await getData('placed-orders', 
      {
      method: 'POST',
      body: JSON.stringify({ userId: user?.userId, qty: item.quantity, itemId: item.id }),
      headers: { 'Content-Type': 'application/json' }
    }
  )
    error && console.error(`Failed to place order: ${item.name}`);
  }

  return (
    <OrderContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, order }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within a OrderProvider');
  }
  return context;
};