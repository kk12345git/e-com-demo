"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Product } from '@/data/products'

interface CartItem extends Product {
    quantity: number
}

interface CartContextType {
    cartItems: CartItem[]
    addToCart: (product: Product) => void
    removeFromCart: (productId: string) => void
    updateQuantity: (productId: string, delta: number) => void
    clearCart: () => void
    cartCount: number
    cartTotal: number
    // Wishlist functionality
    wishlistItems: Product[]
    toggleWishlist: (product: Product) => void
    isInWishlist: (productId: string) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('shopclone_cart')
            if (savedCart) {
                try {
                    return JSON.parse(savedCart)
                } catch (e) {
                    console.error("Failed to parse cart from localStorage", e)
                }
            }
        }
        return []
    })

    const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
        if (typeof window !== 'undefined') {
            const savedWishlist = localStorage.getItem('shopclone_wishlist')
            if (savedWishlist) {
                try {
                    return JSON.parse(savedWishlist)
                } catch (e) {
                    console.error("Failed to parse wishlist from localStorage", e)
                }
            }
        }
        return []
    })

    // Save state to localStorage on change
    useEffect(() => {
        localStorage.setItem('shopclone_cart', JSON.stringify(cartItems))
    }, [cartItems])

    useEffect(() => {
        localStorage.setItem('shopclone_wishlist', JSON.stringify(wishlistItems))
    }, [wishlistItems])

    const addToCart = (product: Product) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id)
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prev, { ...product, quantity: 1 }]
        })
    }

    const removeFromCart = (productId: string) => {
        setCartItems(prev => prev.filter(item => item.id !== productId))
    }

    const updateQuantity = (productId: string, delta: number) => {
        setCartItems(prev => prev.map(item =>
            item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ))
    }

    const clearCart = () => {
        setCartItems([])
    }

    const toggleWishlist = (product: Product) => {
        setWishlistItems(prev => {
            const exists = prev.find(item => item.id === product.id)
            if (exists) {
                return prev.filter(item => item.id !== product.id)
            }
            return [...prev, product]
        })
    }

    const isInWishlist = (productId: string) => {
        return wishlistItems.some(item => item.id === productId)
    }

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
    const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            cartTotal,
            wishlistItems,
            toggleWishlist,
            isInWishlist
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
