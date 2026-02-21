"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useToast } from "@/hooks/use-toast"
import { ArrowRight, Mail } from "lucide-react"

export default function Newsletter() {
    const [email, setEmail] = useState("")
    const { toast } = useToast()

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        toast({
            title: "Subscription Received",
            description: "You will now receive our curated edits via email.",
        })
        setEmail("")
    }

    return (
        <section className="py-24 bg-neutral-900 text-white rounded-[2rem] mx-6 mb-24 overflow-hidden relative">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]"></div>
            </div>

            <div className="container mx-auto px-12 relative z-10">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
                    <div className="text-center md:text-left flex-1">
                        <span className="text-[10px] font-medium uppercase tracking-[0.4em] mb-6 block text-neutral-400">Chennai Updates</span>
                        <h2 className="text-4xl md:text-5xl font-medium tracking-tight font-serif italic mb-8">
                            Get 15% Off Your <br />
                            <span className="text-neutral-500">First Order buddy!</span>
                        </h2>
                        <p className="text-neutral-400 text-sm font-medium uppercase tracking-widest leading-relaxed max-w-sm">
                            Join our group for the best selections and first look at new items buddy.
                        </p>
                    </div>

                    <div className="w-full max-w-md bg-white/5 backdrop-blur-md p-10 rounded-2xl border border-white/10">
                        <form onSubmit={handleSubscribe} className="space-y-6">
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                                <Input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-16 pl-12 bg-white/5 border-white/10 rounded-lg text-sm focus:ring-1 focus:ring-white/20 transition-all placeholder:text-neutral-500"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full h-16 bg-white text-neutral-900 hover:bg-neutral-100 transition-all rounded-lg font-medium uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3"
                            >
                                Join the Vibe <ArrowRight size={16} />
                            </Button>
                        </form>
                        <p className="text-[9px] text-neutral-500 font-medium uppercase tracking-widest mt-6 text-center">
                            By subscribing, you agree to our Privacy Policy and Terms of Service.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
