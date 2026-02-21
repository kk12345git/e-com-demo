"use client"

import { use, useState } from "react"
import { orders } from "@/data/orders"
import { formatPrice } from "@/utils/formatPrice"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Package, Truck, CheckCircle2, Star, MessageSquarePlus, ShieldCheck, CreditCard } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const order = orders.find(o => o.id === id || o.id === `#${id}`)
    const { toast } = useToast()
    const [reviewingProduct, setReviewingProduct] = useState<string | null>(null)
    const [rating, setRating] = useState(5)
    const [reviewText, setReviewText] = useState("")

    if (!order) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-900">
                <Package size={64} className="text-slate-200 mb-8" />
                <h1 className="text-2xl font-black uppercase italic">Matrix Node Not Found</h1>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-4 mb-8">This order does not exist in our dimension.</p>
                <Button asChild variant="premium">
                    <Link href="/account">Return to Sanctuary</Link>
                </Button>
            </div>
        )
    }

    const handleReviewSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        toast({
            title: "Analysis Transmitted",
            description: "Your product synthesis has been added to the global aura.",
        })
        setReviewingProduct(null)
        setReviewText("")
        setRating(5)
    }

    return (
        <main className="min-h-screen bg-slate-50 pt-[140px] pb-24 text-slate-900">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <div className="mb-12 text-slate-900">
                    <Button asChild variant="ghost" className="mb-8 -ml-4 hover:bg-white text-slate-400 font-black uppercase tracking-widest text-[10px]">
                        <Link href="/account" className="flex items-center gap-2">
                            <ArrowLeft size={14} /> Back to Sanctuary
                        </Link>
                    </Button>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 mb-4">
                                <ShieldCheck size={14} />
                                <span>Verified Transaction</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
                                Order {order.id}
                            </h1>
                            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">
                                Synchronized on {order.date}
                            </p>
                        </div>
                        <div className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[.3em] flex items-center gap-3 shadow-sm ${order.status === 'Delivered' ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-indigo-600 text-white shadow-indigo-600/20'}`}>
                            {order.status === 'Delivered' ? <CheckCircle2 size={16} /> : <Truck size={16} />}
                            {order.status}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Status Steps */}
                    <div className="md:col-span-3 bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
                            {/* Line */}
                            <div className="hidden md:block absolute top-[1.25rem] left-[10%] right-[10%] h-[2px] bg-slate-100 -z-0"></div>

                            {["Processing", "In Transit", "Delivered"].map((step, idx) => {
                                const isCurrent = order.status === step
                                const isDone = (order.status === "Delivered" && idx < 2) || (order.status === "In Transit" && idx === 0)
                                return (
                                    <div key={step} className="flex flex-col items-center gap-4 relative z-10 bg-white px-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-700 ${isCurrent || isDone ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-slate-100 text-slate-300'}`}>
                                            {isDone ? <CheckCircle2 size={20} /> : idx + 1}
                                        </div>
                                        <div className="text-center">
                                            <div className={`text-[10px] font-black uppercase tracking-widest ${isCurrent || isDone ? 'text-indigo-600' : 'text-slate-400'}`}>{step}</div>
                                            <div className="text-[9px] text-slate-300 font-bold uppercase mt-1">{isDone ? "Completed" : isCurrent ? "Active" : "Pending"}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="md:col-span-2 space-y-6">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 px-4">Entities Secured</h3>
                        {order.items.map((item) => (
                            <div key={item.productId} className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all duration-500 group">
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 bg-slate-100 rounded-2xl overflow-hidden shrink-0 relative shadow-inner">
                                        <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight truncate">{item.name}</h4>
                                        <div className="flex items-center gap-4 mt-2">
                                            <span className="text-sm font-black text-indigo-600">{formatPrice(item.price)}</span>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Qty: {item.quantity}</span>
                                        </div>
                                        <div className="mt-4 flex gap-3">
                                            <Button
                                                onClick={() => setReviewingProduct(item.name)}
                                                variant="outline"
                                                className="h-10 px-6 rounded-xl font-black uppercase tracking-widest text-[9px] gap-2 border-slate-200 hover:bg-slate-50 transition-all text-slate-900"
                                            >
                                                <MessageSquarePlus size={14} /> Review Item
                                            </Button>
                                            <Button asChild variant="ghost" className="h-10 rounded-xl font-black uppercase tracking-widest text-[9px] text-slate-400 hover:text-indigo-600">
                                                <Link href={`/products/${item.productId}`}>View Product</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Sidebar */}
                    <div className="space-y-8">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 px-4">Matrix Summary</h3>
                        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
                            <div className="space-y-3 text-slate-900">
                                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2 mb-4">Coordinates</div>
                                <div className="text-[11px] font-black text-slate-900 leading-relaxed uppercase">
                                    {order.shippingAddress.name}<br />
                                    {order.shippingAddress.street}<br />
                                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                                </div>
                            </div>

                            <div className="h-px bg-slate-50"></div>

                            <div className="space-y-3 text-slate-900">
                                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2 mb-4">Synch Method</div>
                                <div className="flex items-center gap-3">
                                    <CreditCard size={14} className="text-slate-400" />
                                    <span className="text-[11px] font-black text-slate-900 uppercase">{order.paymentMethod}</span>
                                </div>
                            </div>

                            <div className="h-px bg-slate-50"></div>

                            <div className="space-y-4 pt-4">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <span>Matrix Value</span>
                                    <span className="text-slate-900">{formatPrice(order.total)}</span>
                                </div>
                                <div className="flex justify-between items-center bg-slate-950 p-5 rounded-2xl text-white mt-8 rotate-1">
                                    <span className="font-black uppercase tracking-widest text-[10px]">Total Synch</span>
                                    <span className="text-2xl font-black tracking-tighter">{formatPrice(order.total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Modal Backdrop */}
            <AnimatePresence>
                {reviewingProduct && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setReviewingProduct(null)}
                            className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-[100]"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 100, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 100, scale: 0.9 }}
                            className="fixed inset-x-4 bottom-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:bottom-1/2 md:translate-y-1/2 md:w-[500px] bg-white rounded-[3rem] p-12 shadow-2xl z-[101] border border-slate-100"
                        >
                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 mb-6">
                                <MessageSquarePlus size={16} />
                                <span>Contribute Analysis</span>
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic mb-2 leading-tight">
                                Reviewing {reviewingProduct}
                            </h2>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-12">
                                Your synthesis helps the aura evolve.
                            </p>

                            <form onSubmit={handleReviewSubmit} className="space-y-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Aura Rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <button
                                                key={s}
                                                type="button"
                                                onClick={() => setRating(s)}
                                                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${s <= rating ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-slate-50 text-slate-300'}`}
                                            >
                                                <Star size={20} className={s <= rating ? "fill-white" : ""} />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Synthesis Commentary</label>
                                    <Textarea
                                        placeholder="Describe your experience with this entity..."
                                        className="min-h-[150px] rounded-[1.5rem] bg-slate-50 border-slate-100 p-6 font-medium text-slate-900"
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <Button type="button" variant="ghost" onClick={() => setReviewingProduct(null)} className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] text-slate-900">
                                        Abort
                                    </Button>
                                    <Button type="submit" variant="premium" className="flex-2 h-14 px-12 rounded-2xl font-black uppercase tracking-widest text-[10px]">
                                        Broadcast Analysis
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </main>
    )
}
