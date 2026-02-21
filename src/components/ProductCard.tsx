"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { formatPrice } from "@/utils/formatPrice"
import { Star, Heart, Plus, Check } from "lucide-react"
import { Product } from "@/data/products"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [added, setAdded] = useState(false)
    const { addToCart, toggleWishlist, isInWishlist } = useCart()
    const { toast } = useToast()

    const isWishlisted = isInWishlist(product.id)

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        addToCart(product)
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
        toast({
            title: "Added to cart!",
            description: `${product.name} has been added to your cart.`,
        })
    }

    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        toggleWishlist(product)
        toast({
            title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
            description: `${product.name} ${isWishlisted ? 'removed from' : 'added to'} your favorites.`,
        })
    }

    return (
        <div className="group relative flex flex-col bg-white border border-neutral-100 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-md">
            <motion.div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="flex flex-col h-full"
            >
                {/* Image Section */}
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-50">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                    />

                    {/* Minimalist Quick-Buy Overlay */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-x-4 bottom-4 z-20 flex flex-col gap-2"
                            >
                                <Button
                                    className={`w-full h-12 rounded-lg font-medium text-xs transition-all ${added ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-neutral-900 hover:bg-neutral-800'} text-white border-none`}
                                    onClick={handleAddToCart}
                                >
                                    {added ? <Check size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
                                    {added ? 'Added' : 'Add to Bag'}
                                </Button>
                                <Button asChild variant="secondary" className="w-full h-12 rounded-lg font-medium text-xs bg-white text-neutral-900 border-neutral-200">
                                    <Link href={`/products/${product.id}`} className="flex items-center justify-center gap-2">
                                        View Details
                                    </Link>
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Top Actions */}
                    <div className="absolute top-4 right-4 z-[25]">
                        <button
                            onClick={handleToggleWishlist}
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all bg-white shadow-sm border border-neutral-100 ${isWishlisted ? 'text-rose-500' : 'text-neutral-400 hover:text-rose-500'}`}
                        >
                            <Heart size={16} className={isWishlisted ? "fill-current" : ""} />
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest">{product.category}</span>
                            {product.stock && product.stock < 10 && (
                                <span className="text-[9px] font-bold text-rose-500 uppercase mt-1">Only {product.stock} left buddy!</span>
                            )}
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="flex items-center gap-1 opacity-60">
                                <Star size={10} className="text-neutral-900 fill-neutral-900" />
                                <span className="text-[10px] font-medium text-neutral-900">{product.rating}</span>
                            </div>
                            {product.viewerCount && (
                                <span className="text-[8px] font-medium text-neutral-400 mt-1">{product.viewerCount} viewing now</span>
                            )}
                        </div>
                    </div>

                    <h3 className="text-sm font-semibold text-neutral-900 leading-tight mb-4 group-hover:text-neutral-600 transition-colors line-clamp-2">
                        {product.name}
                    </h3>

                    <div className="mt-auto flex items-baseline gap-2">
                        <span className="text-base font-bold text-neutral-900">{formatPrice(product.price)}</span>
                        {product.comparePrice && (
                            <span className="text-xs text-neutral-400 line-through font-medium">{formatPrice(product.comparePrice)}</span>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
