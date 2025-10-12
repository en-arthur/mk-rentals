'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('mkrentals-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('mkrentals-cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (product, quantity = 1, rentalPeriod = null) => {
    setIsUpdating(true);
    try {
      setCart((prevCart) => {
        const existingItemIndex = prevCart.findIndex(
          (item) => item.id === product.id
        );

        if (existingItemIndex > -1) {
          // Update existing item
          const updatedCart = [...prevCart];
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: updatedCart[existingItemIndex].quantity + quantity,
            rentalPeriod: rentalPeriod || updatedCart[existingItemIndex].rentalPeriod,
          };
          return updatedCart;
        } else {
          // Add new item
          return [
            ...prevCart,
            {
              id: product.id,
              name: product.name,
              category: product.category,
              description: product.description,
              quantity,
              rentalPeriod,
              addedAt: new Date().toISOString(),
            },
          ];
        }
      });
    } finally {
      // Small delay to show loading state
      setTimeout(() => setIsUpdating(false), 300);
    }
  };

  const removeFromCart = (productId) => {
    setIsUpdating(true);
    try {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    } finally {
      setTimeout(() => setIsUpdating(false), 300);
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setIsUpdating(true);
    try {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    } finally {
      setTimeout(() => setIsUpdating(false), 300);
    }
  };

  const updateRentalPeriod = (productId, rentalPeriod) => {
    setIsUpdating(true);
    try {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, rentalPeriod } : item
        )
      );
    } finally {
      setTimeout(() => setIsUpdating(false), 300);
    }
  };

  const clearCart = () => {
    setIsUpdating(true);
    try {
      setCart([]);
    } finally {
      setTimeout(() => setIsUpdating(false), 300);
    }
  };


  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateRentalPeriod,
    clearCart,
    getCartCount,
    isUpdating,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
