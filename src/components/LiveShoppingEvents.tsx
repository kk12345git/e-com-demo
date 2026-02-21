"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Clock, Flame, Users, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

interface LiveEvent {
    id: string
    title: string
    image: string
    originalPrice: number
    salePrice: number
    discount: number
    endTime: Date
    viewers: number
    soldCount: number
}

const liveEvents: LiveEvent[] = [
    {
        id: "flash1",
        title: "Audio Engine Flash Sale",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600",
        originalPrice: 399,
        salePrice: 199,
        discount: 50,
        endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        viewers: 1247,
        soldCount: 89
    },
    {
        id: "flash2",
        title: "Vision Monitor Mega Deal",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600",
        originalPrice: 1599,
        salePrice: 1099,
        discount: 31,
        endTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours
        viewers: 2105,
        soldCount: 156
    }
]

function CountdownTimer({ endTime }: { endTime: Date }) {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime()
            const distance = endTime.getTime() - now

            if (distance < 0) {
                clearInterval(timer)
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
            } else {
                setTimeLeft({
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                })
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [endTime])

    return (
        <div className="flex items-center gap-2">
            {[
                { value: timeLeft.hours, label: 'H' },
                { value: timeLeft.minutes, label: 'M' },
                { value: timeLeft.seconds, label: 'S' }
            ].map((unit, idx) => (
                <div key={idx} className="flex items-center gap-1">
                    <div className="w-12 h-12 bg-rose-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-black text-lg">{String(unit.value).padStart(2, '0')}</span>
                    </div>
                    {idx < 2 && <span className="text-white font-black text-lg">:</span>}
                </div>
            ))}
        </div>
    )
}

export default function LiveShoppingEvents() {
    return (
        <section className="py-24 border-t border-white/5 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-rose-600/5 to-transparent"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600/10 border border-rose-500/20 rounded-full text-[10px] font-black text-rose-400 uppercase tracking-[0.3em] mb-8">
                        <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                        LIVE NOW
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 uppercase">
                        Flash Sales <br />
                        <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">Happening Now</span>
                    </h2>
                    <p className="text-slate-400 text-lg font-medium max-w-2xl">
                        Limited-time deals that won't last. Grab them before they're gone!
                    </p>
                </div>

                {/* Live Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {liveEvents.map((event, idx) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="aesthetic-card p-8 group relative overflow-hidden"
                        >
                            {/* Discount Badge */}
                            <div className="absolute top-8 right-8 z-10">
                                <div className="bg-gradient-to-r from-rose-600 to-orange-600 text-white px-6 py-3 rounded-full shadow-2xl shadow-rose-500/30">
                                    <span className="text-2xl font-black">-{event.discount}%</span>
                                </div>
                            </div>

                            {/* Image */}
                            <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 bg-slate-900">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                            </div>

                            {/* Content */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tight">{event.title}</h3>
                                    <div className="flex items-end gap-4">
                                        <span className="text-4xl font-black text-white">?{event.salePrice}</span>
                                        <span className="text-xl text-slate-500 line-through font-bold mb-1">?{event.originalPrice}</span>
                                    </div>
                                </div>

                                {/* Countdown */}
                                <div>
                                    <div className="flex items-center gap-2 text-slate-500 text-xs font-black uppercase tracking-widest mb-3">
                                        <Clock size={14} className="text-rose-500" />
                                        Sale Ends In
                                    </div>
                                    <CountdownTimer endTime={event.endTime} />
                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-2 text-slate-400 text-sm font-bold">
                                        <Users size={16} className="text-indigo-400" />
                                        {event.viewers.toLocaleString()} watching
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400 text-sm font-bold">
                                        <Flame size={16} className="text-rose-500" />
                                        {event.soldCount} sold
                                    </div>
                                </div>

                                {/* CTA */}
                                <Link
                                    href={`/products/?{event.id}`}
                                    className="block w-full py-4 bg-gradient-to-r from-rose-600 to-orange-600 text-white rounded-xl font-black text-sm uppercase tracking-widest text-center hover:shadow-2xl hover:shadow-rose-500/30 transition-all"
                                >
                                    Claim Deal Now
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
