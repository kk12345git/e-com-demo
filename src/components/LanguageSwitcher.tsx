"use client"

import { useLanguage } from "@/context/LanguageContext"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Globe, ChevronDown } from "lucide-react"

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const languages = [
        { code: 'en', label: 'English', desc: 'Standard' },
        { code: 'ta', label: 'தமிழ்', desc: 'Formal' },
        { code: 'mm', label: 'Chennai', desc: 'Semma Mass' },
    ]

    const activeLang = languages.find(l => l.code === language) || languages[0]

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors h-10 px-2 rounded-md hover:bg-neutral-50"
            >
                <Globe size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">{activeLang.code}</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-neutral-100 overflow-hidden z-50"
                    >
                        <div className="py-2 flex flex-col">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code as 'en' | 'ta' | 'mm')
                                        setIsOpen(false)
                                    }}
                                    className={`flex items-center justify-between px-4 py-3 text-left hover:bg-neutral-50 transition-colors ${language === lang.code ? 'bg-[#f37920]/5 text-[#f37920]' : 'text-neutral-700'
                                        }`}
                                >
                                    <div>
                                        <div className="text-sm font-bold">{lang.label}</div>
                                        <div className="text-[10px] text-neutral-400 font-medium uppercase tracking-widest mt-0.5">{lang.desc}</div>
                                    </div>
                                    {language === lang.code && (
                                        <div className="w-2 h-2 rounded-full bg-[#f37920]"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
