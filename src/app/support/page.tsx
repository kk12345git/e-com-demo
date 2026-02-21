"use client"

import { Search, ShieldCheck, Truck, CreditCard, RefreshCw, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function SupportPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [openFaq, setOpenFaq] = useState<number | null>(0)

    const categories = [
        { icon: <Truck size={24} />, title: "Logistics Buddy", desc: "Ungal items enga iruku nu check pannunga" },
        { icon: <CreditCard size={24} />, title: "Transactions Machi", desc: "Billing & payments manage pannunga" },
        { icon: <ShieldCheck size={24} />, title: "Aura Privacy", desc: "Full-a secure-a irukum buddy" },
        { icon: <RefreshCw size={24} />, title: "Exchange/Returns", desc: "Items exchange pannanuma buddy?" }
    ]

    const faqs = [
        {
            q: "Delivery eppo varum buddy?",
            a: "Namba logistics sub-hour-la process panni, seekirama ungal veetuku vandhurum machi!"
        },
        {
            q: "Is my Aura Identity secure?",
            a: "Absolutely. We utilize end-to-end matrix encryption and biometric verification layers to ensure your personal data remains confidential within the ShopClone ecosystem."
        },
        {
            q: "Can I cancel a synchronized order?",
            a: "Orders can be aborted within the 'Initialization' phase (first 30 minutes). Once synchronized with the logistics network, the process becomes immutable until delivery."
        },
        {
            q: "What payment methods are supported?",
            a: "We accept all major credit networks, high-frequency digital wallets, and decentralized capital buffers. All transactions are routed through our secure financial gateway."
        }
    ]

    return (
        <main className="min-h-screen bg-neutral-50 pt-32 pb-24 text-neutral-900">
            <div className="container mx-auto px-6">
                {/* Hero */}
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-400 mb-6 block">Support Center</span>
                    <h1 className="text-5xl md:text-8xl font-medium text-neutral-900 tracking-tight mb-12 font-serif">
                        Enna help <br />
                        <span className="text-neutral-400 italic">venum buddy?</span>
                    </h1>

                    <div className="relative max-w-2xl mx-auto">
                        <Input
                            placeholder="Search help articles..."
                            className="h-16 pl-14 rounded-xl bg-white border-neutral-100 shadow-sm text-sm font-medium focus-visible:ring-neutral-900 transition-all placeholder:text-neutral-300"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                    </div>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white border border-neutral-100 p-10 rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 group cursor-pointer"
                        >
                            <div className="w-14 h-14 bg-neutral-50 rounded-xl flex items-center justify-center text-neutral-400 mb-8 group-hover:bg-neutral-900 group-hover:text-white transition-all duration-300">
                                {cat.icon}
                            </div>
                            <h3 className="text-xl font-medium text-neutral-900 mb-3">{cat.title}</h3>
                            <p className="text-neutral-400 text-xs font-medium leading-relaxed">{cat.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-medium text-neutral-900 tracking-tight font-serif uppercase tracking-widest">Common-a kekura <span className="text-neutral-400 italic">Questions buddy.</span></h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-white border border-neutral-100 rounded-xl overflow-hidden shadow-sm">
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors group"
                                >
                                    <span className="text-sm font-medium text-neutral-900">{faq.q}</span>
                                    <ChevronDown size={18} className={`text-neutral-400 transition-transform duration-300 ${openFaq === idx ? "rotate-180 text-neutral-900" : ""}`} />
                                </button>
                                <AnimatePresence>
                                    {openFaq === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-8 pb-8 pt-0 text-sm text-neutral-500 leading-relaxed max-w-2xl">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-neutral-900 rounded-2xl p-16 md:p-24 text-center text-white relative overflow-hidden">
                    <h2 className="text-4xl md:text-6xl font-medium tracking-tight font-serif mb-8">
                        Vera edhavadhu <span className="text-neutral-500 italic">doubt-a buddy?</span>
                    </h2>
                    <p className="text-neutral-500 text-sm font-medium mb-12 max-w-xl mx-auto">
                        Our support team is available 24/7 to assist you with any inquiries or issues.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Button className="h-14 px-10 rounded-lg bg-white text-neutral-900 font-medium text-xs hover:bg-neutral-100 transition-all uppercase tracking-widest">
                            Pesalaama buddy (Chat)
                        </Button>
                        <Button variant="outline" className="h-14 px-10 rounded-lg border-neutral-700 text-white font-medium text-xs hover:bg-white/5 transition-all uppercase tracking-widest">
                            Email Us
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}
