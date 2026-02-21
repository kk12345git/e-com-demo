"use client"

import { useState, useEffect } from "react"
import { Product } from "@/data/products"
import { formatPrice } from "@/utils/formatPrice"
import { useCart } from "@/context/CartContext"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Heart, Star, Shield, Truck } from "lucide-react"
import { addToRecentlyViewed } from "@/components/RecentlyViewed"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface ProductDetailContentProps {
    product: Product
}

export default function ProductDetailContent({ product }: ProductDetailContentProps) {
    const [added, setAdded] = useState(false)
    const [activeTab, setActiveTab] = useState("description")
    const { addToCart, toggleWishlist, isInWishlist } = useCart()
    const { toast } = useToast()

    const isWishlisted = isInWishlist(product.id)

    // Track in recently viewed
    useEffect(() => {
        if (product) {
            addToRecentlyViewed(product.id)
        }
    }, [product])

    const handleAddToCart = () => {
        addToCart(product)
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
        toast({
            title: "Bag-la vandhucu buddy",
            description: `${product.name} locked and loaded machi!`,
        })
    }

    const handleToggleWishlist = () => {
        toggleWishlist(product)
        toast({
            title: isWishlisted ? "Removed" : "Saved",
            description: `${product.name} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
        })
    }

    return (
        <main className="min-h-screen bg-[#FDFCFB] pt-[140px] pb-24 text-neutral-900">
            <div className="container mx-auto px-6">
                {/* Breadcrumb */}
                <div className="mb-12 flex items-center gap-3 text-[10px] font-medium uppercase tracking-widest text-neutral-400">
                    <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/products" className="hover:text-neutral-900 transition-colors">Collection</Link>
                    <span>/</span>
                    <span className="text-neutral-900">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
                    {/* Left: Product Imagery */}
                    <div className="relative aspect-square bg-neutral-100 rounded-2xl overflow-hidden group">
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-1000"
                            priority
                        />
                        {product.trending && (
                            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[9px] font-medium uppercase tracking-[0.2em] shadow-sm">
                                Curated Selection
                            </div>
                        )}
                    </div>

                    {/* Right: Product Details */}
                    <div className="flex flex-col justify-center">
                        <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-[0.4em] mb-6 block">
                            {product.category}
                        </span>

                        <h1 className="text-5xl md:text-7xl font-medium tracking-tight font-serif mb-8 leading-tight">
                            {product.name}<span className="text-neutral-300">.</span>
                        </h1>

                        <div className="flex items-center gap-6 mb-12">
                            <span className="text-4xl font-light tracking-tighter">
                                {formatPrice(product.price)}
                            </span>
                            {product.comparePrice && (
                                <span className="text-xl text-neutral-300 line-through font-light">
                                    {formatPrice(product.comparePrice)}
                                </span>
                            )}
                        </div>

                        <p className="text-neutral-500 text-lg font-normal leading-relaxed mb-12 max-w-lg">
                            {product.description}
                        </p>

                        <div className="space-y-6 max-w-md">
                            <div className="flex gap-4">
                                <Button
                                    onClick={handleAddToCart}
                                    className={`flex-1 h-16 rounded-lg font-medium uppercase tracking-[0.2em] text-xs transition-all duration-500 ${added ? 'bg-neutral-100 text-neutral-900 border-neutral-200' : 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-xl shadow-neutral-900/10'
                                        }`}
                                >
                                    {added ? 'Bag-la vandhucu buddy' : 'Bag-la podunga buddy'}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleToggleWishlist}
                                    className={`w-16 h-16 rounded-lg border-neutral-200 transition-all ${isWishlisted ? 'bg-neutral-50 border-neutral-900 text-neutral-900' : 'text-neutral-400 hover:text-neutral-900 hover:border-neutral-900'
                                        }`}
                                >
                                    <Heart size={20} className={isWishlisted ? "fill-neutral-900" : ""} />
                                </Button>
                            </div>
                        </div>

                        {/* Minimal Trust markers */}
                        <div className="mt-16 pt-12 border-t border-neutral-100 grid grid-cols-2 gap-y-8 gap-x-12">
                            <div className="flex items-start gap-4">
                                <Truck size={20} className="text-neutral-300 shrink-0" />
                                <div>
                                    <h4 className="text-[10px] font-medium uppercase tracking-widest mb-1">Complimentary Delivery</h4>
                                    <p className="text-[10px] text-neutral-400 font-medium leading-relaxed">Standard shipping on all orders over {formatPrice(5000)}.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Shield size={20} className="text-neutral-300 shrink-0" />
                                <div>
                                    <h4 className="text-[10px] font-medium uppercase tracking-widest mb-1">Authenticity Guaranteed</h4>
                                    <p className="text-[10px] text-neutral-400 font-medium leading-relaxed">Directly sourced from official brand partners.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabbed Content */}
                <div className="max-w-4xl mx-auto mb-32">
                    <div className="flex justify-center border-b border-neutral-100 mb-16 px-6 overflow-x-auto no-scrollbar">
                        {["description", "specifications", "reviews"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-10 py-6 text-[10px] font-medium uppercase tracking-[0.3em] transition-all relative ${activeTab === tab ? 'text-neutral-900' : 'text-neutral-300 hover:text-neutral-500'
                                    }`}
                            >
                                {tab === 'description' ? 'Details buddy' : tab === 'specifications' ? 'Semma Specs' : 'Makkal Reviews'}
                                {activeTab === tab && (
                                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900" />
                                )}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTab === "description" && (
                            <motion.div
                                key="desc"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-8 text-center"
                            >
                                <p className="text-neutral-500 leading-loose max-w-2xl mx-auto italic font-serif text-lg">
                                    &ldquo;{product.description}&rdquo;
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 text-left">
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-medium uppercase tracking-widest">The Design</h4>
                                        <p className="text-[11px] text-neutral-400 leading-relaxed">Experience a new standard of personal luxury. Every detail has been meticulously considered to ensure a perfect balance between form and function.</p>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-medium uppercase tracking-widest">Craftsmanship</h4>
                                        <p className="text-[11px] text-neutral-400 leading-relaxed">Using only the finest materials, this piece represents our commitment to sustainable and ethical manufacturing processes.</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "specifications" && product.specifications && (
                            <motion.div
                                key="specs"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6"
                            >
                                {Object.entries(product.specifications).map(([key, value]) => (
                                    <div key={key} className="flex justify-between items-center py-4 border-b border-neutral-50">
                                        <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-400">{key}</span>
                                        <span className="text-[11px] font-medium text-neutral-900">{value}</span>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === "reviews" && (
                            <motion.div
                                key="rev"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-center py-12"
                            >
                                <div className="mb-12">
                                    <div className="text-6xl font-serif text-neutral-900 mb-4">{product.rating}</div>
                                    <div className="flex justify-center gap-1 mb-4">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-neutral-900 text-neutral-900" : "text-neutral-200"} />
                                        ))}
                                    </div>
                                    <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest">Based on {product.reviews} reviews</p>
                                </div>
                                <Button className="h-14 px-10 rounded-lg text-[10px] font-medium uppercase tracking-widest border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 transition-all">
                                    Write a review
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    )
}
