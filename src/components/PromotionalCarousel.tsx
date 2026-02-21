"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Banner {
    id: number
    title: string
    subtitle: string
    image: string
    bgColor: string
}

export default function PromotionalCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const banners: Banner[] = [
        {
            id: 1,
            title: "Summer Vibe.",
            subtitle: "Sema items for your style buddy.",
            image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop",
            bgColor: "bg-neutral-900"
        },
        {
            id: 2,
            title: "Mass Staples.",
            subtitle: "Best quality for your life buddy.",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=400&fit=crop",
            bgColor: "bg-neutral-100"
        },
        {
            id: 3,
            title: "The Vibe 001.",
            subtitle: "Exclusive handpicked items buddy.",
            image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&h=400&fit=crop",
            bgColor: "bg-stone-200"
        }
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [banners.length])

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length)
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)

    return (
        <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-2xl bg-neutral-100 group">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <div className="relative w-full h-full">
                        <Image
                            src={banners[currentSlide].image}
                            alt={banners[currentSlide].title}
                            fill
                            className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-[2s] pointer-events-none"
                        />
                        <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-12 ${banners[currentSlide].id === 2 ? 'text-neutral-900' : 'text-white'}`}>
                            <motion.span
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-[10px] md:text-xs font-medium uppercase tracking-[0.4em] mb-6"
                            >
                                Limited Series
                            </motion.span>
                            <motion.h2
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-5xl md:text-8xl font-medium tracking-tight font-serif mb-10 leading-none"
                            >
                                {banners[currentSlide].title}
                            </motion.h2>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="text-sm md:text-lg font-medium mb-12 max-w-lg mx-auto opacity-80"
                            >
                                {banners[currentSlide].subtitle}
                            </motion.p>
                            <Link href="/products">
                                <motion.button
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className={`px-10 py-4 border font-medium text-[11px] uppercase tracking-widest rounded-lg transition-all ${banners[currentSlide].id === 2 ? 'border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white' : 'border-white text-white hover:bg-white hover:text-neutral-900'}`}
                                >
                                    Check it out
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:bg-white/20 transition-all z-10"
            >
                <ChevronLeft size={20} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:bg-white/20 transition-all z-10"
            >
                <ChevronRight size={20} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-10">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-1 rounded-full transition-all duration-500 ${index === currentSlide ? "bg-white w-12" : "bg-white/30 w-4"
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}
