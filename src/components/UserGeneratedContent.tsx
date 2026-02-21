"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Heart, ThumbsUp } from "lucide-react"
import { motion } from "framer-motion"

interface CustomerPhoto {
    id: string
    image: string
    customerName: string
    rating: number
    verified: boolean
    likes: number
    comment?: string
}

const sampleCustomerPhotos: CustomerPhoto[] = [
    {
        id: "1",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400",
        customerName: "Sarah M.",
        rating: 5,
        verified: true,
        likes: 234,
        comment: "Absolutely love these! Sound quality is unmatched."
    },
    {
        id: "2",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400",
        customerName: "Mike R.",
        rating: 5,
        verified: true,
        likes: 189,
        comment: "Best purchase of the year!"
    },
    {
        id: "3",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=400",
        customerName: "Emily K.",
        rating: 4,
        verified: true,
        likes: 156
    },
    {
        id: "4",
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400",
        customerName: "James L.",
        rating: 5,
        verified: false,
        likes: 92,
        comment: "Exceeded all expectations!"
    }
]

export default function UserGeneratedContent() {
    const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set())

    const toggleLike = (photoId: string) => {
        setLikedPhotos(prev => {
            const newSet = new Set(prev)
            if (newSet.has(photoId)) {
                newSet.delete(photoId)
            } else {
                newSet.add(photoId)
            }
            return newSet
        })
    }

    return (
        <section className="py-24 bg-slate-900/30 border-t border-white/5">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600/10 border border-emerald-500/20 rounded-full text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-8">
                        ✓ Verified Customers
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 uppercase">
                        Real People. <br />
                        <span className="gradient-text">Real Results.</span>
                    </h2>
                    <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto">
                        Join thousands of satisfied customers who trust ShopClone for their premium lifestyle needs.
                    </p>
                </div>

                {/* Photo Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {sampleCustomerPhotos.map((photo, idx) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="aesthetic-card p-4 group hover:border-indigo-500/30"
                        >
                            {/* Image */}
                            <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-900">
                                <Image
                                    src={photo.image}
                                    alt={`Photo by ?{photo.customerName}`}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                {/* Verified Badge */}
                                {photo.verified && (
                                    <div className="absolute top-3 right-3 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                                        <span className="text-white text-xs">✓</span>
                                    </div>
                                )}

                                {/* Like Button */}
                                <button
                                    onClick={() => toggleLike(photo.id)}
                                    className="absolute bottom-3 right-3 w-10 h-10 bg-slate-950/80 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 transition-all"
                                >
                                    <Heart
                                        size={16}
                                        className={likedPhotos.has(photo.id) ? "fill-rose-500 text-rose-500" : "text-white"}
                                    />
                                </button>
                            </div>

                            {/* Customer Info */}
                            <div className="mb-3">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-white font-black text-sm">{photo.customerName}</span>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: photo.rating }).map((_, i) => (
                                            <Star key={i} size={12} className="fill-amber-500 text-amber-500" />
                                        ))}
                                    </div>
                                </div>
                                {photo.comment && (
                                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 font-medium">
                                        "{photo.comment}"
                                    </p>
                                )}
                            </div>

                            {/* Likes */}
                            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                                <ThumbsUp size={12} />
                                {photo.likes + (likedPhotos.has(photo.id) ? 1 : 0)} likes
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <button className="px-12 h-14 bg-white/5 border border-white/10 rounded-[1.25rem] font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all text-white backdrop-blur-xl">
                        View All Customer Photos
                    </button>
                </div>
            </div>
        </section>
    )
}
