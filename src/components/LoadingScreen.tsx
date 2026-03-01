"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate a minimum loading time for the animation to play
        // In a real app, this could be tied to actual resource loading
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2500) // 2.5 seconds total loading screen time

        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0d122b]" // Matches the dark background of the logo
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 1,
                            ease: "easeOut",
                            scale: {
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }
                        }}
                        className="relative w-64 h-32 md:w-80 md:h-40"
                    >
                        <Image
                            src="/logo.png"
                            alt="Deeshora Logo"
                            fill
                            className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                            priority
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mt-8 flex items-center gap-2"
                    >
                        <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse delay-150"></div>
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse delay-300"></div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
