import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('meesho_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [savedItems, setSavedItems] = useState(() => {
        const saved = localStorage.getItem('meesho_saved');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('meesho_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('meesho_saved', JSON.stringify(savedItems));
    }, [savedItems]);

    const addToCart = (product) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, qty: item.qty + 1 } : item
                );
            } else {
                return [...prev, {
                    id: product.id,
                    title: product.title,
                    category: product.category,
                    originalPrice: product.originalPrice || product.price,
                    discountedPrice: product.price,
                    discountText: product.discount ? `${product.discount}% off` : '',
                    offerText: "Bank Offer Applied",
                    qty: 1,
                    imgSrc: product.image || product.images?.[0]
                }];
            }
        });
    };

    const updateQty = (id, qty) => {
        setCartItems(prev => prev.map(item => 
            item.id === id ? { ...item, qty: Number(qty) } : item
        ));
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const saveForLater = (id) => {
        const itemToSave = cartItems.find(item => item.id === id);
        if (itemToSave) {
            setSavedItems(prev => [...prev, itemToSave]);
            removeFromCart(id);
        }
    };

    const moveToCart = (id) => {
        const itemToMove = savedItems.find(item => item.id === id);
        if (itemToMove) {
            setCartItems(prev => [...prev, itemToMove]);
            setSavedItems(prev => prev.filter(item => item.id !== id));
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotalCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            savedItems,
            addToCart, 
            updateQty, 
            removeFromCart, 
            saveForLater,
            moveToCart,
            clearCart, 
            cartTotalCount 
        }}>
            {children}
        </CartContext.Provider>
    );
};
