"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react"
import OfferTicker from "./OfferTicker"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const { cartCount } = useCart()
    const { user, login, logout, isAuthenticated } = useAuth()
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
            <OfferTicker />
            <nav className={`transition-all duration-500 ${isScrolled ? "bg-white/95 backdrop-blur-lg shadow-md py-1" : "bg-white py-1"
                }`}>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center gap-8 md:gap-12 h-16 md:h-20">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="text-xl font-bold text-neutral-900 tracking-tight shrink-0 flex items-center gap-2 font-inter">
                                Shop<span className="text-neutral-500">Clone.</span>
                            </Link>
                        </div>

                        {/* Search Bar Refinement */}
                        <form onSubmit={handleSearch} className="hidden md:flex flex-1 relative max-w-xl mx-auto">
                            <div className="relative flex w-full bg-neutral-50 rounded-lg p-1 border border-neutral-100 focus-within:border-neutral-200 focus-within:bg-white transition-all duration-300">
                                <Input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search products..."
                                    className="h-10 border-none bg-transparent text-sm font-medium focus-visible:ring-0 placeholder:text-neutral-400"
                                />
                                <Button type="submit" variant="ghost" className="h-10 px-4 rounded-md text-neutral-400 hover:text-neutral-900">
                                    <Search size={18} />
                                </Button>
                            </div>
                        </form>

                        {/* Desktop Nav Actions */}
                        <div className="hidden md:flex items-center gap-8 shrink-0">
                            <Link href="/products" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors">Collections</Link>

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
                                        {isAuthenticated ? 'Ungal Account' : 'Login buddy'}
                                    </span>
                                </Link>

                                <Link href="/wishlist" className="relative text-neutral-500 hover:text-neutral-900">
                                    <Heart size={20} />
                                </Link>

                                <Link href="/cart" className="relative flex items-center gap-2 text-neutral-500 hover:text-neutral-900">
                                    <ShoppingBag size={20} />
                                    {cartCount > 0 && (
                                        <span className="text-xs font-bold">{cartCount}</span>
                                    )}
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 bg-white/5 rounded-xl text-white"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-full left-0 right-0 bg-slate-950 border-b border-white/5 p-6 md:hidden flex flex-col gap-6"
                        >
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search with Aura..."
                                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-6 text-sm text-white focus:outline-none"
                                />
                                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                                    <Search size={18} />
                                </button>
                            </form>
                            <Link href="/products" className="text-xs font-black uppercase tracking-widest text-white">Collections</Link>
                            <Link href="/account" className="text-xs font-black uppercase tracking-widest text-white">
                                {isAuthenticated ? `Account (${user?.name})` : 'Account'}
                            </Link>
                            <Link href="/cart" className="text-xs font-black uppercase tracking-widest text-white">Shopping Cart ({cartCount})</Link>
                            {isAuthenticated && (
                                <button
                                    onClick={() => logout()}
                                    className="text-xs font-black uppercase tracking-widest text-red-500 text-left"
                                >
                                    Logout
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    )
}
