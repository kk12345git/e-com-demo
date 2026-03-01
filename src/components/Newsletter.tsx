"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useToast } from "@/hooks/use-toast"
import { ArrowRight, Mail } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

export default function Newsletter() {
    const [email, setEmail] = useState("")
    const { toast } = useToast()
    const { t } = useLanguage()

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        toast({
            title: t("newsletter.toast.title"),
            description: t("newsletter.toast.desc"),
        })
        setEmail("")
    }

    return (
        <section className="py-16 sm:py-24 bg-deeshora-navy text-white rounded-[1.5rem] sm:rounded-[2rem] mx-4 sm:mx-6 mb-16 sm:mb-24 overflow-hidden relative shadow-2xl">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]"></div>
            </div>

            <div className="container mx-auto px-6 sm:px-12 relative z-10">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
                    <div className="text-center md:text-left flex-1">
                        <span className="text-[10px] font-medium uppercase tracking-[0.4em] mb-6 block text-neutral-400">{t("newsletter.badge")}</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight font-serif italic mb-6 sm:mb-8">
                            <span className="text-deeshora-orange">{t("newsletter.title")}</span>
                        </h2>
                        <p className="text-neutral-400 text-sm font-medium uppercase tracking-widest leading-relaxed max-w-sm">
                            {t("newsletter.subtitle")}
                        </p>
                    </div>

                    <div className="w-full max-w-md bg-white/5 backdrop-blur-md p-6 sm:p-10 rounded-2xl border border-white/10">
                        <form onSubmit={handleSubscribe} className="space-y-6">
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                                <Input
                                    type="email"
                                    placeholder={t("newsletter.placeholder")}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-16 pl-12 bg-white/5 border-white/10 rounded-lg text-sm focus:ring-1 focus:ring-white/20 transition-all placeholder:text-neutral-500"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full h-16 bg-deeshora-orange text-white hover:bg-[#e06c1a] hover:shadow-lg transition-all rounded-lg font-bold uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3"
                            >
                                {t("newsletter.button")} <ArrowRight size={16} />
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
