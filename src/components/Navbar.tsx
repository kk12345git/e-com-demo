"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react"
import OfferTicker from "./OfferTicker"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"
import { useLanguage } from "@/context/LanguageContext"
import LanguageSwitcher from "./LanguageSwitcher"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const { cartCount } = useCart()
    const { user, logout, isAuthenticated } = useAuth()
    const { t } = useLanguage()

    // Handle scroll effect
    const router = useRouter()

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
            setIsMobileMenuOpen(false)
        }
    }

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header className="fixed top-0 left-0 right-0 z-[1000]">
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-neutral-100" : "bg-transparent"}`}>
                {/* Offer Ticker */}
                <div className="bg-deeshora-navy">
                    <OfferTicker />
                </div>

                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between gap-4 md:gap-12 h-16 md:h-20">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="relative w-32 h-10 sm:w-40 sm:h-12 flex items-center shrink-0">
                                <Image
                                    src="/logo.png"
                                    alt="Deeshora"
                                    fill
                                    className="object-contain object-left"
                                    priority
                                />
                            </Link>
                        </div>

                        {/* Search Bar Refinement */}
                        <form onSubmit={handleSearch} className="hidden md:flex flex-1 relative max-w-xl mx-auto">
                            <div className="relative flex w-full bg-neutral-50 rounded-lg p-1 border border-neutral-100 focus-within:border-neutral-200 focus-within:bg-white transition-all duration-300">
                                <Input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={t("nav.search")}
                                    className="h-10 border-none bg-transparent text-sm font-medium focus-visible:ring-0 placeholder:text-neutral-400"
                                />
                                <Button type="submit" variant="ghost" className="h-10 px-4 rounded-md text-neutral-400 hover:text-neutral-900">
                                    <Search size={18} />
                                </Button>
                            </div>
                        </form>

                        {/* Desktop Nav Actions */}
                        <div className="hidden md:flex items-center gap-8 shrink-0">
                            <LanguageSwitcher />
                            <Link href="/products" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors">{t("nav.collections")}</Link>

                            <div className="flex items-center gap-6">
                                <Link href="/account" className="flex items-center gap-2 group">
                                    {isAuthenticated && user ? (
                                        <Avatar className="h-8 w-8 border border-neutral-100">
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    ) : (
                                        <User size={20} className="text-neutral-500 group-hover:text-neutral-900" />
                                    )}
                                    <span className="text-sm font-medium text-neutral-500 group-hover:text-neutral-900">
                                        {isAuthenticated ? t("nav.account") : t("nav.login")}
                                    </span>
                                </Link>

                                <Link href="/wishlist" className="relative text-neutral-500 hover:text-neutral-900">
                                    <Heart size={20} />
                                </Link>

                                <Link href="/cart" className="relative flex items-center gap-2 text-neutral-500 hover:text-deeshora-orange transition-colors">
                                    <ShoppingBag size={20} />
                                    {cartCount > 0 && (
                                        <span className="text-xs font-bold text-deeshora-orange">{cartCount}</span>
                                    )}
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="flex items-center gap-4 md:hidden">
                            <Link href="/cart" className="relative text-neutral-900 hover:text-deeshora-orange transition-colors">
                                <ShoppingBag size={22} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-deeshora-orange text-[10px] font-bold text-white shadow-sm">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 text-neutral-900"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="absolute top-full left-0 right-0 bg-white border-b border-neutral-100 overflow-hidden md:hidden shadow-xl"
                        >
                            <div className="p-6 flex flex-col gap-8">
                                <form onSubmit={handleSearch} className="relative">
                                    <Input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder={t("nav.search")}
                                        className="w-full h-12 bg-neutral-50 border-neutral-100 rounded-lg px-6 text-sm focus-visible:ring-1 focus-visible:ring-neutral-200"
                                    />
                                    <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400">
                                        <Search size={18} />
                                    </button>
                                </form>
                                <div className="flex flex-col gap-6">
                                    <div className="border-b border-neutral-50 pb-4 mb-2">
                                        <LanguageSwitcher />
                                    </div>
                                    <Link
                                        href="/products"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-[11px] font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-50 pb-2"
                                    >
                                        {t("nav.collections")}
                                    </Link>
                                    <Link
                                        href="/account"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-[11px] font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-50 pb-2"
                                    >
                                        {isAuthenticated ? `${t("nav.account")} (${user?.name})` : t("nav.login")}
                                    </Link>
                                    <Link
                                        href="/wishlist"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-[11px] font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-50 pb-2"
                                    >
                                        {t("nav.wishlist")}
                                    </Link>
                                    {isAuthenticated && (
                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="text-[11px] font-bold uppercase tracking-widest text-rose-500 text-left"
                                        >
                                            Logout
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    )
}
