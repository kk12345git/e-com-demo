"use client"

import { motion } from "framer-motion"

const offers = [
    "📍 CHENNAI ONLY DELIVERY BUDDY",
    "🚀 SAME-DAY DROP - SEMMA SPEED MACHI",
    "👑 CHENNAI'S NO.1 ELITE MARKETPLACE",
    "🔥 EXCLUSIVE DROPS AT T-NAGAR BUDDY",
    "⚡ CHENNAI TECH REVOLUTION MACHI",
]

export default function OfferTicker() {
    return (
        <div className="bg-indigo-600 py-2 overflow-hidden whitespace-nowrap border-b border-white/10 relative z-[1100]">
            <motion.div
                animate={{
                    x: [0, -1000],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="inline-flex gap-20 items-center px-4"
            >
                {[...offers, ...offers].map((offer, i) => (
                    <span
                        key={i}
                        className="text-[10px] md:text-xs font-black text-white uppercase tracking-[0.3em] flex items-center gap-4"
                    >
                        {offer}
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                    </span>
                ))}
            </motion.div>
        </div>
    )
}
