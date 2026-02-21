"use client"

import { useState } from "react"
import ProductCard from "@/components/ProductCard"
import { products, Product } from "@/data/products"
import { motion } from "framer-motion"

export default function RecommendedForYou() {
    const [recommendations] = useState<Product[]>(() => {
        // Initial recommendations computed at render (only on client in next.js if properly handled, or just compute static-ish)
        // Since this is a client component, this will run on mount.
        const trending = products.filter(p => p.trending)
        const highRated = products.filter(p => p.rating >= 4.8)
        const combined = [...trending, ...highRated]
        const unique = Array.from(new Map(combined.map(p => [p.id, p])).values())
        const shuffled = [...unique]
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        return shuffled.slice(0, 4)
    })

    if (recommendations.length === 0) return null

    return (
        <section className="py-24 border-t border-neutral-100 bg-white">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="mb-16">
                    <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-400 mb-4 block">Selected For You</span>
                    <h2 className="text-3xl md:text-5xl font-medium text-neutral-900 tracking-tight font-serif">
                        Curated <span className="text-neutral-400 italic">Excellence.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {recommendations.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
