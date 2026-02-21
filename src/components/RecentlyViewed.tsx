"use client"

import { useEffect, useState } from "react"
import ProductCard from "@/components/ProductCard"
import { products, Product } from "@/data/products"
import { motion, AnimatePresence } from "framer-motion"

const STORAGE_KEY = "shopclone_recently_viewed"

export function addToRecentlyViewed(productId: string) {
    if (typeof window === "undefined") return

    const existing = getRecentlyViewed()
    const filtered = existing.filter(id => id !== productId)
    const updated = [productId, ...filtered].slice(0, 8) // Keep last 8

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

export function getRecentlyViewed(): string[] {
    if (typeof window === "undefined") return []

    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
}

export function clearRecentlyViewed() {
    if (typeof window === "undefined") return
    localStorage.removeItem(STORAGE_KEY)
}

export default function RecentlyViewed() {
    const [viewedProducts, setViewedProducts] = useState<Product[]>(() => {
        if (typeof window === "undefined") return []
        const viewedIds = getRecentlyViewed()
        return viewedIds
            .map(id => products.find(p => p.id === id))
            .filter((p): p is Product => p !== undefined)
            .slice(0, 4)
    })

    useEffect(() => {
        // Initial state is already set by the initialization function
    }, [])

    const handleClearHistory = () => {
        clearRecentlyViewed()
        setViewedProducts([])
    }

    if (viewedProducts.length === 0) return null

    return (
        <section className="py-24 border-t border-neutral-100 bg-[#FDFCFB]">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-baseline justify-between gap-8 mb-12">
                    <div>
                        <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-400 mb-4 block">Your Journey</span>
                        <h2 className="text-3xl md:text-5xl font-medium text-neutral-900 tracking-tight font-serif">
                            Recently <span className="text-neutral-400 italic">Viewed.</span>
                        </h2>
                    </div>
                    <button
                        onClick={handleClearHistory}
                        className="text-[11px] font-medium uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors border-b border-transparent hover:border-neutral-900 pb-0.5"
                    >
                        Clear History
                    </button>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <AnimatePresence>
                        {viewedProducts.map((product, idx) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Privacy Note */}
                <div className="mt-16 text-center">
                    <p className="text-neutral-400 text-[10px] font-medium uppercase tracking-widest">
                        History stored locally on your device.
                    </p>
                </div>
            </div>
        </section>
    )
}
