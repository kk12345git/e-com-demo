import { motion } from "framer-motion"
import { Truck, RefreshCcw, ShieldCheck, Headset, Award } from "lucide-react"

export default function BenefitsBar() {
    const benefits = [
        { icon: <Truck size={14} />, text: "Free Global Shipping" },
        { icon: <RefreshCcw size={14} />, text: "30-Day Easy Returns" },
        { icon: <ShieldCheck size={14} />, text: "Secure Payments" },
        { icon: <Headset size={14} />, text: "24/7 Elite Support" },
        { icon: <Award size={14} />, text: "Authentic Guarantee" }
    ]

    return (
        <div className="bg-white/5 border-b border-white/5 py-3 overflow-hidden">
            <div className="container mx-auto">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="flex gap-16 whitespace-nowrap w-fit px-6"
                >
                    {/* Double the array for seamless looping */}
                    {[...benefits, ...benefits].map((b, i) => (
                        <div key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                            <span className="text-indigo-500/80">{b.icon}</span>
                            {b.text}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
