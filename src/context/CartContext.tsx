import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, OrderDetails } from '../types';
import { calculateCartTotals, CartCalculationResult } from '../utils/pureLogic';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, selectedSize?: string, quantity?: number) => void;
  updateQuantity: (productId: string, selectedSize: string | undefined, quantity: number) => void;
  removeFromCart: (productId: string, selectedSize?: string) => void;
  clearCart: () => void;
  couponCode: string;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  totals: CartCalculationResult;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  latestOrder: OrderDetails | null;
  placeOrder: (customer: { name: string; email: string; address: string; paymentMethod: string }) => OrderDetails;
  totalItemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'arenax_cart_v2';
const ORDERS_STORAGE_KEY = 'arenax_orders_v2';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [couponCode, setCouponCode] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [latestOrder, setLatestOrder] = useState<OrderDetails | null>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Could not persist cart to storage', e);
    }
  }, [items]);

  const totals = calculateCartTotals(items, couponCode);

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: Product, selectedSize?: string, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, selectedSize, quantity }];
    });
    setIsDrawerOpen(true);
  };

  const updateQuantity = (productId: string, selectedSize: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (productId: string, selectedSize?: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === selectedSize)
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
  };

  const applyCoupon = (code: string) => {
    const norm = code.trim().toUpperCase();
    if (norm === 'ARENA10') {
      setCouponCode('ARENA10');
      return { success: true, message: 'Coupon applied! 10% discount added.' };
    }
    if (norm === 'VIP20') {
      setCouponCode('VIP20');
      return { success: true, message: 'VIP code applied! 20% discount added.' };
    }
    return { success: false, message: 'Invalid coupon code. Try ARENA10 for 10% off.' };
  };

  const removeCoupon = () => {
    setCouponCode('');
  };

  const placeOrder = (customer: { name: string; email: string; address: string; paymentMethod: string }) => {
    const order: OrderDetails = {
      orderId: `ARX-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: customer.name,
      email: customer.email,
      address: customer.address,
      items: [...items],
      subtotal: totals.subtotal,
      discount: totals.discount,
      shipping: totals.shipping,
      tax: totals.tax,
      total: totals.total,
      timestamp: new Date().toISOString(),
      paymentMethod: customer.paymentMethod,
    };

    setLatestOrder(order);
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(order));
    } catch (e) {
      console.warn('Failed to save order to localStorage', e);
    }
    clearCart();
    return order;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        couponCode,
        applyCoupon,
        removeCoupon,
        totals,
        isDrawerOpen,
        setIsDrawerOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        latestOrder,
        placeOrder,
        totalItemsCount,
      }}
    >
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
