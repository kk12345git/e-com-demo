"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/utils/formatPrice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, CreditCard, ArrowRight, ChevronLeft, Lock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

const STEPS = ["Shipping Buddy", "Payment Machi", "Review Semma"]

export default function CheckoutPage() {
    const { cartItems, cartTotal, clearCart } = useCart()
    const { toast } = useToast()
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(0)

    const subtotal = cartTotal
    const shipping = subtotal > 5000 ? 0 : 500
    const tax = subtotal * 0.12
    const total = subtotal + shipping + tax

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1)
            window.scrollTo(0, 0)
        } else {
            handlePlaceOrder()
        }
    }

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handlePlaceOrder = () => {
        // Persist order in localStorage
        const newOrder = {
            id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            total: total,
            status: "Processing",
            items: cartItems.map(item => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity }))
        }

        const existingOrders = JSON.parse(localStorage.getItem('shopclone_orders') || '[]')
        localStorage.setItem('shopclone_orders', JSON.stringify([newOrder, ...existingOrders]))

        toast({
            title: "Order Potachu buddy",
            description: "Ungal order process aaidu iruku machi.",
        })
        setTimeout(() => {
            clearCart()
            router.push("/checkout/success")
        }, 1500)
    }

    if (cartItems.length === 0 && currentStep === 0) {
        router.push("/cart")
        return null
    }

    return (
        <main className="min-h-screen bg-[#FDFCFB] pt-[140px] pb-24 text-neutral-900">
            <div className="container mx-auto px-6 max-w-5xl">
                {/* Progress Tracker */}
                <div className="flex items-center justify-center mb-24 px-4 overflow-x-auto no-scrollbar">
                    {STEPS.map((step, idx) => (
                        <div key={step} className="flex items-center">
                            <div className="flex flex-col items-center gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-medium transition-all duration-700 ${idx <= currentStep ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-300'}`}>
                                    {idx < currentStep ? <Check size={14} /> : idx + 1}
                                </div>
                                <span className={`text-[9px] font-medium uppercase tracking-[0.3em] ${idx <= currentStep ? 'text-neutral-900' : 'text-neutral-300'}`}>{step}</span>
                            </div>
                            {idx < STEPS.length - 1 && (
                                <div className={`w-16 md:w-24 h-px mx-4 -mt-8 transition-all duration-700 ${idx < currentStep ? 'bg-neutral-900' : 'bg-neutral-100'}`}></div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 items-start">
                    {/* Main Flow */}
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">
                            {currentStep === 0 && (
                                <motion.div
                                    key="shipping"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-12"
                                >
                                    <div className="bg-white border border-neutral-100 rounded-2xl p-10 md:p-12">
                                        <h2 className="text-2xl font-medium text-neutral-900 uppercase tracking-widest mb-10 font-serif italic">Shipping Details Machi</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-medium uppercase tracking-widest text-neutral-400 ml-1">First Name</label>
                                                <Input placeholder="E.g. James" className="h-14 rounded-lg border-neutral-100 bg-neutral-50 px-6 focus:ring-1 focus:ring-neutral-200 transition-all" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-medium uppercase tracking-widest text-neutral-400 ml-1">Last Name</label>
                                                <Input placeholder="E.g. Smith" className="h-14 rounded-lg border-neutral-100 bg-neutral-50 px-6 focus:ring-1 focus:ring-neutral-200 transition-all" />
                                            </div>
                                            <div className="md:col-span-2 space-y-3">
                                                <label className="text-[10px] font-medium uppercase tracking-widest text-neutral-400 ml-1">Street Address</label>
                                                <Input placeholder="Address line 1" className="h-14 rounded-lg border-neutral-100 bg-neutral-50 px-6 focus:ring-1 focus:ring-neutral-200 transition-all" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-medium uppercase tracking-widest text-neutral-400 ml-1">City</label>
                                                <Input placeholder="City" className="h-14 rounded-lg border-neutral-100 bg-neutral-50 px-6 focus:ring-1 focus:ring-neutral-200 transition-all" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-medium uppercase tracking-widest text-neutral-400 ml-1">Postal Code</label>
                                                <Input placeholder="Postal code" className="h-14 rounded-lg border-neutral-100 bg-neutral-50 px-6 focus:ring-1 focus:ring-neutral-200 transition-all" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 1 && (
                                <motion.div
                                    key="payment"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-12"
                                >
                                    <div className="bg-white border border-neutral-100 rounded-2xl p-10 md:p-12">
                                        <h2 className="text-2xl font-medium text-neutral-900 uppercase tracking-widest mb-10 font-serif italic">Payment Panlam Buddy</h2>
                                        <div className="space-y-8">
                                            <div className="p-8 border border-neutral-900 rounded-xl bg-neutral-50 flex items-center justify-between">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-12 h-8 bg-neutral-900 rounded-md flex items-center justify-center">
                                                        <CreditCard className="text-white" size={18} />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-medium text-neutral-900 uppercase tracking-widest">Credit / Debit Card</p>
                                                        <p className="text-[10px] text-neutral-400 font-medium uppercase tracking-widest mt-1">Visa, Mastercard illana Amex use pannunga buddy</p>
                                                    </div>
                                                </div>
                                                <div className="w-4 h-4 rounded-full border border-neutral-900 bg-neutral-900 flex items-center justify-center">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-medium uppercase tracking-widest text-neutral-400 ml-1">Card Number</label>
                                                <Input placeholder="0000 0000 0000 0000" className="h-14 rounded-lg border-neutral-100 bg-neutral-50 px-6 focus:ring-1 focus:ring-neutral-200 transition-all" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-8">
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-medium uppercase tracking-widest text-neutral-400 ml-1">Expiry Date</label>
                                                    <Input placeholder="MM / YY" className="h-14 rounded-lg border-neutral-100 bg-neutral-50 px-6 focus:ring-1 focus:ring-neutral-200 transition-all" />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-medium uppercase tracking-widest text-neutral-400 ml-1">Security Code</label>
                                                    <Input placeholder="CVV" className="h-14 rounded-lg border-neutral-100 bg-neutral-50 px-6 focus:ring-1 focus:ring-neutral-200 transition-all" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 2 && (
                                <motion.div
                                    key="review"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-12"
                                >
                                    <div className="bg-white border border-neutral-100 rounded-2xl p-10 md:p-12">
                                        <h2 className="text-2xl font-medium text-neutral-900 uppercase tracking-widest mb-10 font-serif italic">Final Check Machi</h2>
                                        <div className="space-y-8">
                                            <div className="p-8 bg-neutral-50 rounded-xl text-[11px] text-neutral-500 font-medium uppercase tracking-widest leading-loose">
                                                By completing this purchase, you agree to our Terms of Service and Privacy Policy. Your order will be processed through our secure payment gateway.
                                            </div>
                                            <div className="flex items-center gap-4 text-neutral-400">
                                                <Lock size={16} />
                                                <span className="text-[10px] font-medium uppercase tracking-widest">Encrypted Checkout Active</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className="mt-16 flex items-center justify-between px-2">
                            <button
                                onClick={handleBack}
                                disabled={currentStep === 0}
                                className="h-14 px-8 rounded-lg font-medium uppercase tracking-widest text-[10px] text-neutral-300 hover:text-neutral-900 transition-colors flex items-center gap-3 disabled:opacity-0"
                            >
                                <ChevronLeft size={16} /> Back
                            </button>
                            <Button
                                onClick={handleNext}
                                className="h-16 px-12 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-all font-medium uppercase tracking-[0.2em] text-[11px] flex items-center gap-4"
                            >
                                {currentStep === STEPS.length - 1 ? "Order Potachu" : "Continue buddy"} <ArrowRight size={16} />
                            </Button>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-8">
                        <div className="bg-white border border-neutral-100 rounded-2xl p-10">
                            <h3 className="text-xl font-medium text-neutral-900 uppercase tracking-widest mb-10 font-serif italic">Summary</h3>
                            <div className="space-y-5 mb-10">
                                <div className="flex justify-between text-[10px] font-medium uppercase tracking-widest text-neutral-400">
                                    <span>Subtotal</span>
                                    <span className="text-neutral-900">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-medium uppercase tracking-widest text-neutral-400">
                                    <span>Shipping</span>
                                    <span className="text-neutral-900">{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-medium uppercase tracking-widest text-neutral-400">
                                    <span>Sales Tax</span>
                                    <span className="text-neutral-900">{formatPrice(tax)}</span>
                                </div>
                                <div className="h-px bg-neutral-50 my-6"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-neutral-900 font-medium uppercase tracking-widest text-xs">Total</span>
                                    <span className="text-2xl font-light text-neutral-900 tracking-tighter">{formatPrice(total)}</span>
                                </div>
                            </div>

                            <div className="space-y-6 pt-10 border-t border-neutral-50">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-6 items-center">
                                        <div className="w-16 h-16 bg-neutral-50 rounded-lg overflow-hidden shrink-0 relative">
                                            <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] font-medium text-neutral-900 uppercase tracking-widest truncate">{item.name}</p>
                                            <p className="text-[9px] text-neutral-400 font-medium uppercase tracking-widest mt-1">Quantity: {item.quantity}</p>
                                        </div>
                                        <div className="text-[10px] font-medium text-neutral-900">{formatPrice(item.price * item.quantity)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    )
}
