"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Product3DViewerProps {
    images: string[]
    productName: string
}

export default function Product3DViewer({ images, productName }: Product3DViewerProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [rotation, setRotation] = useState(0)

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        setStartX(e.clientX)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return

        const delta = e.clientX - startX
        const newRotation = rotation + delta * 0.5
        setRotation(newRotation)

        // Calculate which image to show based on rotation
        const imageCount = images.length
        const degreesPerImage = 360 / imageCount
        const normalizedRotation = ((newRotation % 360) + 360) % 360
        const imageIndex = Math.floor(normalizedRotation / degreesPerImage)

        setCurrentImageIndex(imageIndex)
        setStartX(e.clientX)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
        <div className="relative group">
            {/* Main Viewer */}
            <div
                className="relative aspect-square rounded-[3rem] overflow-hidden bg-slate-900 border border-white/10 shadow-2xl cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={images[currentImageIndex] || images[0]}
                            alt={`?{productName} - View ?{currentImageIndex + 1}`}
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Drag Hint */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: isDragging ? 0 : 0.5 }}
                        className="bg-slate-950/80 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-3 text-white text-sm font-black uppercase tracking-widest"
                    >
                        <div className="flex items-center gap-2">
                            <ChevronLeft size={16} className="animate-pulse" />
                            Drag to Rotate 360°
                            <ChevronRight size={16} className="animate-pulse" />
                        </div>
                    </motion.div>
                </div>

                {/* Fullscreen Button */}
                <button className="absolute top-4 right-4 w-12 h-12 bg-slate-950/80 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-all z-10">
                    <Maximize2 size={18} />
                </button>

                {/* Navigation Arrows (Desktop) */}
                <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-950/80 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-all z-10 opacity-0 group-hover:opacity-100"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-950/80 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-all z-10 opacity-0 group-hover:opacity-100"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="mt-6 flex gap-3 overflow-x-auto no-scrollbar">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ?{idx === currentImageIndex
                                ? "border-indigo-500 shadow-lg shadow-indigo-500/20"
                                : "border-white/10 hover:border-white/30"
                            }`}
                    >
                        <Image
                            src={img}
                            alt={`Thumbnail ?{idx + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>

            {/* 3D Indicator Badge */}
            <div className="absolute top-8 left-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest flex items-center gap-2 shadow-2xl shadow-indigo-500/30">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                360° View Active
            </div>
        </div>
    )
}
