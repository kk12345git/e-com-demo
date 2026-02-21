"use client"

import { Check, ArrowRight, Package, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { useEffect, useState } from "react"

export default function CheckoutSuccessPage() {
    // Correct way to handle random values in SSR/Hydration to avoid mismatches
    const [orderId, setOrderId] = useState<string>("SC-......")

    useEffect(() => {
        // Only generate the random ID once on the client
        const timer = setTimeout(() => {
            setOrderId(`SC-${Math.floor(Math.random() * 900000 + 100000)}`)
        }, 0)

        const duration = 3 * 1000
        const animationEnd = Date.now() + duration
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now()

            if (timeLeft <= 0) {
                return clearInterval(interval)
            }

            const particleCount = 50 * (timeLeft / duration)
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
        }, 250)

        return () => {
            clearTimeout(timer)
            clearInterval(interval)
        }
    }, [])

    return (
        <main className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-6 pt-[140px]">
            <div className="max-w-2xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-neutral-100 p-12 md:p-20 text-center rounded-[2rem] shadow-sm relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-neutral-50 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none opacity-50"></div>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-20 h-20 bg-neutral-900 rounded-2xl flex items-center justify-center mx-auto mb-10 shadow-xl"
                    >
                        <Check size={32} className="text-white" />
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl font-medium text-neutral-900 tracking-tight font-serif italic mb-8">
                        Order <span className="text-neutral-400">Potachu buddy!</span>
                    </h1>

                    <p className="text-neutral-400 font-medium uppercase tracking-[0.3em] text-[10px] mb-16 max-w-sm mx-auto leading-relaxed">
                        Order received machi! Namba concierge team ungal items-a ready pannitu irukaanga. Seekirama vandhurum buddy!
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 px-4">
                        <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-100 text-left transition-all">
                            <Package className="text-neutral-900 mb-6" size={20} />
                            <h3 className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest mb-2">Order ID Machi</h3>
                            <p className="text-[11px] text-neutral-900 font-medium uppercase tracking-widest">{orderId}</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-100 text-left transition-all">
                            <ShieldCheck className="text-neutral-900 mb-6" size={20} />
                            <h3 className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest mb-2">Full-a Secure Machi</h3>
                            <p className="text-[11px] text-neutral-900 font-medium uppercase tracking-widest">Namba Logistics Buddy</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <Button asChild className="flex-1 h-16 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 transition-all font-medium uppercase tracking-widest text-[11px]">
                            <Link href="/">
                                Return to Collections buddy
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="flex-1 h-16 rounded-xl border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:border-neutral-900 transition-all font-medium uppercase tracking-widest text-[11px] bg-white">
                            <Link href="/account" className="flex items-center justify-center gap-3">
                                View Account Machi <ArrowRight size={16} />
                            </Link>
                        </Button>
                    </div>
                </motion.div>

                <div className="mt-12 text-center">
                    <p className="text-[9px] font-medium text-neutral-300 uppercase tracking-[0.4em]">Ref: {orderId} • ShopClone Collective</p>
                </div>
            </div>
        </main>
    )
}
