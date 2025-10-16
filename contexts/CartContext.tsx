'use client'

import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { CartItem, Product } from '../type';

interface CartContextType{
    cart: CartItem[];
    addToCart : (product:Product) => void;

}

export const CartContext = createContext <CartContextType | undefined>(undefined);

export const CartProvider : React.FC<{ children: ReactNode}> = ({ children}) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    
    const addToCart = (product:Product) => {
        setCart ((prevCart) => {
            const existingItem =prevCart.find((item) => item.product.id === product.id);

                if (existingItem) {
                    return prevCart.map((item) =>
                    item.product.id === product.id
                    ?{...item,quantity : item.quantity + 1}
                    : item
                    );
                }
                return [...prevCart, {product, quantity: 1}];

        });
    };

    const value: CartContextType = {
        cart,
        addToCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;

};
