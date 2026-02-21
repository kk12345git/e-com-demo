"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRef, useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { products } from "@/data/products"

export default function Hero() {
    const containerRef = useRef(null)
    const [activeSlide, setActiveSlide] = useState(0)
    const heroProducts = useMemo(() => products.slice(0, 4), [])

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % heroProducts.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [heroProducts.length])

    return (
        <section ref={containerRef} className="relative min-h-[80vh] sm:min-h-[85vh] flex flex-col items-center justify-center pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden bg-[#FDFCFB]">
            <div className="container mx-auto relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 items-center">
                    {/* Content Column */}
                    <div className="lg:col-span-5 text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-neutral-100 px-4 py-1.5 rounded-full w-fit mb-8"
                        >
                            <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-500">Summer Vibe 2025 buddy</span>
                        </motion.div>

                        <h1 className="text-5xl sm:text-6xl md:text-8xl font-medium text-neutral-900 tracking-tight leading-[1.1] mb-6 sm:mb-8 font-serif">
                            Mass <br />
                            <span className="text-neutral-400 italic">Essence.</span>
                        </h1>

                        <p className="max-w-md text-sm text-neutral-500 font-medium leading-relaxed mb-12">
                            Super curated stuff for your life buddy. Get the best quality items delivered right to your home in Chennai.
                        </p>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <Button asChild className="h-14 px-10 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-all font-medium">
                                <Link href="/products" className="flex items-center justify-center gap-3">
                                    Buy Now buddy <ArrowRight size={18} />
                                </Link>
                            </Button>

                            <Link href="/products" className="text-sm font-medium text-neutral-900 border-b border-neutral-900 pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-all">
                                Check Styles
                            </Link>
                        </div>
                    </div>

                    {/* Minimalist Image Column */}
                    <div className="lg:col-span-7 relative">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
                            {heroProducts.map((product, idx) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: activeSlide === idx ? 1 : 0
                                    }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/5" />
                                </motion.div>
                            ))}
                        </div>

                        {/* Elegant Indicators */}
                        <div className="absolute -bottom-12 left-0 flex gap-4">
                            {heroProducts.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveSlide(idx)}
                                    className={`h-0.5 transition-all duration-500 rounded-full ${activeSlide === idx ? "w-12 bg-neutral-900" : "w-6 bg-neutral-200 hover:bg-neutral-400"}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
