'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Service } from '../provider/provider-main';

type CartContextType = {
    cart: Service[];
    addToCart: (service: Service) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Service[]>([]);

    const addToCart = (service: Service) => {
        if (!cart.find(item => item.id === service.id)) {
            setCart(prev => [...prev, service]);
        }
    };

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(service => service.id !== id));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
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
