"use client"

import { useCart } from "@/context/CartContext"
import ProductCard from "@/components/ProductCard"
import { Heart, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function WishlistPage() {
    const { wishlistItems, toggleWishlist } = useCart()

    return (
        <main className="min-h-screen bg-[#FDFCFB] pt-[140px] pb-24 text-neutral-900">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 px-2">
                    <div>
                        <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-[0.4em] mb-4 block">Personal Selection</span>
                        <h1 className="text-4xl md:text-6xl font-medium tracking-tight font-serif italic text-neutral-900">
                            Ungal <span className="text-neutral-400">Semma List.</span>
                        </h1>
                        <p className="text-neutral-400 text-sm font-medium mt-6 uppercase tracking-widest leading-relaxed">
                            {wishlistItems.length} curated pieces awaiting your decision.
                        </p>
                    </div>
                </div>

                {/* Wishlist Grid */}
                <AnimatePresence mode="wait">
                    {wishlistItems.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 mb-24"
                        >
                            {wishlistItems.map((product) => (
                                <div key={product.id} className="relative group">
                                    <ProductCard product={product} />
                                    <button
                                        onClick={() => toggleWishlist(product)}
                                        className="absolute top-4 right-4 z-30 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-900 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-500"
                                        title="Remove from wishlist"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="py-32 text-center max-w-lg mx-auto"
                        >
                            <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-10 border border-neutral-100">
                                <Heart size={24} className="text-neutral-300" />
                            </div>
                            <h2 className="text-3xl font-medium text-neutral-900 tracking-tight font-serif mb-6 italic">List-la onnumilla buddy.</h2>
                            <p className="text-neutral-400 text-sm font-medium mb-12 uppercase tracking-widest leading-relaxed">
                                Curated collections paathutu, pudhusa edhavadhu saved panni vai machi!
                            </p>
                            <Button asChild className="h-14 px-10 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-all font-medium uppercase tracking-widest text-[11px]">
                                <Link href="/products" className="flex items-center gap-3">
                                    Vaanga collections paakalam <ArrowRight size={16} />
                                </Link>
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Decorative section */}
                {wishlistItems.length > 0 && (
                    <div className="mt-32 pt-24 border-t border-neutral-100">
                        <div className="max-w-xl mx-auto text-center">
                            <span className="text-[10px] font-medium text-neutral-300 uppercase tracking-[0.4em] mb-6 block">Carefully Curated</span>
                            <p className="text-neutral-400 text-xs font-medium uppercase tracking-widest leading-loose">
                                Your wishlist is a reflection of your evolving aesthetic. Pieces are kept here as a testament to your discerning taste.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}
