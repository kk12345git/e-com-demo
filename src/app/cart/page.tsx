"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck, TrendingUp } from "lucide-react"
import { formatPrice } from "@/utils/formatPrice"
import { useCart } from "@/context/CartContext"

export default function CartPage() {
    const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart()
    const { toast } = useToast()

    const subtotal = cartTotal
    const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 500
    const tax = subtotal * 0.12
    const total = subtotal + shipping + tax

    const router = useRouter()

    const handleCheckout = () => {
        toast({
            title: "Billing-ku porom buddy",
            description: "Establishing secure connection to checkout services machi.",
        })
        setTimeout(() => {
            router.push("/checkout")
        }, 1000)
    }

    const handleRemove = (id: string, name: string) => {
        removeFromCart(id)
        toast({
            title: "Item Thukkiachu buddy",
            description: `${name} bag-la illa machi.`,
            variant: "destructive"
        })
    }

    return (
        <main className="min-h-screen bg-[#FDFCFB] pt-[140px] pb-24 text-neutral-900">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-2">
                    <div>
                        <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-[0.4em] mb-4 block">Shopping Bag</span>
                        <h1 className="text-4xl md:text-6xl font-medium tracking-tight font-serif italic text-neutral-900">
                            Namba <span className="text-neutral-400">Bag Machi.</span>
                        </h1>
                    </div>
                </div>

                {cartItems.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Cart Items List */}
                        <div className="flex-1 space-y-12">
                            <AnimatePresence mode="popLayout">
                                {cartItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        className="flex flex-col md:flex-row gap-8 items-center border-b border-neutral-100 pb-12 last:border-0"
                                    >
                                        <div className="w-40 h-40 bg-neutral-100 rounded-lg overflow-hidden shrink-0 relative">
                                            <Image src={item.images[0]} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                                        </div>

                                        <div className="flex-1 text-center md:text-left">
                                            <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest mb-2 block">{item.category}</span>
                                            <h3 className="text-xl font-medium text-neutral-900 mb-2 font-serif">{item.name}</h3>
                                            <p className="text-neutral-400 text-sm font-light line-clamp-1 mb-6">{item.description}</p>

                                            <div className="flex items-center justify-center md:justify-start gap-8">
                                                <div className="flex items-center border border-neutral-100 rounded-lg p-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="h-8 w-8 hover:bg-neutral-50 rounded-md transition-all"
                                                    >
                                                        <Minus size={12} />
                                                    </Button>
                                                    <span className="w-10 text-center font-medium text-neutral-900 text-xs">{item.quantity}</span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="h-8 w-8 hover:bg-neutral-50 rounded-md transition-all"
                                                    >
                                                        <Plus size={12} />
                                                    </Button>
                                                </div>
                                                <button
                                                    onClick={() => handleRemove(item.id, item.name)}
                                                    className="text-[10px] font-medium uppercase tracking-widest text-neutral-300 hover:text-rose-500 transition-colors"
                                                >
                                                    Venam buddy
                                                </button>
                                            </div>
                                        </div>

                                        <div className="text-right shrink-0">
                                            <div className="text-xl font-medium text-neutral-900">{formatPrice(item.price * item.quantity)}</div>
                                            <div className="text-[11px] font-medium text-neutral-300 uppercase tracking-widest mt-1">{formatPrice(item.price)} each</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:w-96 shrink-0">
                            <div className="bg-white border border-neutral-100 rounded-2xl p-10 sticky top-[160px]">
                                <h2 className="text-xl font-medium text-neutral-900 uppercase tracking-widest mb-10 font-serif italic">Motha Bill Buddy</h2>

                                <div className="space-y-6 mb-12">
                                    <div className="flex justify-between text-[11px] font-medium uppercase tracking-widest text-neutral-400">
                                        <span>Subtotal</span>
                                        <span className="text-neutral-900">{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-[11px] font-medium uppercase tracking-widest text-neutral-400">
                                        <span>Shipping</span>
                                        <span className="text-neutral-900">{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</span>
                                    </div>
                                    <div className="flex justify-between text-[11px] font-medium uppercase tracking-widest text-neutral-400">
                                        <span>Sales Tax</span>
                                        <span className="text-neutral-900">{formatPrice(tax)}</span>
                                    </div>
                                    <div className="h-px bg-neutral-50 my-8"></div>
                                    <div className="flex justify-between items-center bg-neutral-50 px-6 py-8 rounded-xl">
                                        <span className="text-neutral-900 font-medium uppercase tracking-widest text-xs">Total</span>
                                        <span className="text-3xl font-light text-neutral-900 tracking-tighter">{formatPrice(total)}</span>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleCheckout}
                                    className="w-full h-16 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-all font-medium uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3"
                                >
                                    Billing-ku Polaama? <ArrowRight size={16} />
                                </Button>

                                <div className="mt-8 space-y-4">
                                    <div className="flex items-center gap-4 text-neutral-400">
                                        <ShieldCheck size={16} />
                                        <span className="text-[10px] font-medium uppercase tracking-widest leading-none">Security Encryption Active</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-neutral-400">
                                        <Truck size={16} />
                                        <span className="text-[10px] font-medium uppercase tracking-widest leading-none">Global Tracked Delivery</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="py-32 text-center max-w-lg mx-auto">
                        <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-10 border border-neutral-100">
                            <ShoppingBag size={24} className="text-neutral-300" />
                        </div>
                        <h2 className="text-3xl font-medium text-neutral-900 tracking-tight font-serif mb-6 italic">Bag kaaliya iruku buddy.</h2>
                        <p className="text-neutral-400 text-sm font-medium mb-12 uppercase tracking-widest leading-relaxed">Pudhu collections paathutu edhavadhu vaangunga machi!</p>
                        <Button asChild className="h-14 px-10 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-all font-medium uppercase tracking-widest text-[11px]">
                            <Link href="/products" className="flex items-center gap-3">
                                Vaanga Vaangalam <ArrowRight size={16} />
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </main>
    )
}
