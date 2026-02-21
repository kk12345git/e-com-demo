"use client"

import { useState } from "react"
import ProductCard from "@/components/ProductCard"
import { products } from "@/data/products"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { formatPrice } from "@/utils/formatPrice"
import { Search, Heart, TrendingUp, SlidersHorizontal, Upload } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ProductsPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000])
    const [sortBy, setSortBy] = useState("featured")
    const [showFilters, setShowFilters] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const { toast } = useToast()

    const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))]

    const toggleCategory = (cat: string) => {
        if (cat === "All") {
            setSelectedCategories([])
        } else {
            setSelectedCategories(prev =>
                prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
            )
        }
    }

    const filteredProducts = products.filter(p => {
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category)
        const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1]
        const matchesSearch = searchQuery === "" || p.name.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesPrice && matchesSearch
    })

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price
        if (sortBy === "price-high") return b.price - a.price
        if (sortBy === "rating") return b.rating - a.rating
        return 0
    })

    return (
        <main className="min-h-screen bg-slate-50 pt-8 pb-12">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="mb-8 border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-2">
                            <TrendingUp size={14} className="animate-pulse" />
                            <span>Live Catalogue</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-2 uppercase italic">Elite Collection</h1>
                        <p className="text-slate-500 text-sm font-bold max-w-2xl opacity-80">Explore {products.length} premium products, handpicked for the discerning customer.</p>
                    </div>
                    <Button
                        size="sm"
                        variant="premium"
                        onClick={() => {
                            setSelectedCategories([])
                            setPriceRange([0, 200000])
                            setSearchQuery("")
                            toast({ title: "Filters Reset", description: "Showing all products." })
                        }}
                        className="rounded-full px-6 font-black text-[9px] uppercase tracking-widest h-10"
                    >
                        Reset All
                    </Button>
                </div>

                {/* Visual Search & Search Bar */}
                <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Button
                        variant="outline"
                        className="h-16 rounded-2xl flex items-center justify-start gap-4 px-6 border-slate-200 group hover:border-indigo-500/30 transition-all shadow-sm bg-white"
                        onClick={() => toast({ title: "Visual Search coming soon!", description: "We are calibrating the AI sensors." })}
                    >
                        <div className="w-10 h-10 bg-indigo-600/10 rounded-xl flex items-center justify-center text-indigo-600 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            <Upload size={20} />
                        </div>
                        <div className="text-left">
                            <h3 className="text-slate-900 font-black text-sm mb-0.5 uppercase tracking-tight">Visual Search</h3>
                            <p className="text-slate-400 text-[9px] font-bold">Upload to find products</p>
                        </div>
                    </Button>

                    <div className="relative lg:col-span-2">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Quick search products..."
                            className="w-full h-16 bg-white border border-slate-200 rounded-2xl px-12 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500/50 transition-all font-medium shadow-sm"
                        />
                        <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:w-80 shrink-0">
                        <Button
                            onClick={() => setShowFilters(!showFilters)}
                            className="lg:hidden w-full h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-between shadow-sm mb-4 px-6 text-slate-900"
                        >
                            <span className="font-black uppercase tracking-widest text-xs flex items-center gap-2">
                                <SlidersHorizontal size={16} /> Filters
                            </span>
                            {selectedCategories.length > 0 && (
                                <span className="bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full">
                                    {selectedCategories.length}
                                </span>
                            )}
                        </Button>

                        <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                            {/* Sort Options */}
                            <div className="bg-slate-900 rounded-[2rem] p-8 shadow-xl shadow-indigo-900/10 border border-slate-800">
                                <h3 className="text-white font-black uppercase tracking-widest text-[10px] mb-6 flex items-center gap-2">
                                    <div className="w-1 h-4 bg-indigo-500" /> Sort Preference
                                </h3>
                                <div className="grid grid-cols-1 gap-2">
                                    {["featured", "price-low", "price-high", "rating"].map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => setSortBy(option)}
                                            className={`text-left px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] transition-all ${sortBy === option ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                                                }`}
                                        >
                                            {option.replace("-", " ")}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
                                <h3 className="text-slate-900 font-black uppercase tracking-widest text-[10px] mb-6 flex items-center gap-2">
                                    <div className="w-1 h-4 bg-indigo-600" /> Categories
                                </h3>
                                <div className="space-y-3">
                                    {categories.map(cat => (
                                        <label key={cat} className="flex items-center gap-3 cursor-pointer group p-1">
                                            <input
                                                type="checkbox"
                                                checked={cat === "All" ? selectedCategories.length === 0 : selectedCategories.includes(cat)}
                                                onChange={() => toggleCategory(cat)}
                                                className="w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all"
                                            />
                                            <span className={`text-xs uppercase tracking-widest font-black transition-all ${selectedCategories.includes(cat) ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-900'
                                                }`}>
                                                {cat}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
                                <h3 className="text-slate-900 font-black uppercase tracking-widest text-[10px] mb-6 flex items-center gap-2">
                                    <div className="w-1 h-4 bg-indigo-600" /> Price Range
                                </h3>
                                <div className="space-y-4">
                                    <input
                                        type="range"
                                        min="0"
                                        max="200000"
                                        step="1000"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                        className="w-full accent-indigo-600 h-1.5 rounded-lg"
                                    />
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                        <span className="text-slate-400">{formatPrice(priceRange[0])}</span>
                                        <span className="text-indigo-600">{formatPrice(priceRange[1])}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6 border-l-4 border-slate-900 pl-4">
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                                Showing <span className="text-slate-900">{sortedProducts.length}</span> of {products.length} products
                            </p>
                            <Button variant="ghost" className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors px-4">
                                <Heart size={14} />
                                <span className="text-[9px] font-black uppercase tracking-widest">Wishlist</span>
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            <AnimatePresence mode="wait">
                                {sortedProducts.map((product, i) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {sortedProducts.length === 0 && (
                            <div className="aesthetic-card p-24 text-center">
                                <p className="text-slate-500 font-bold text-lg mb-4">No products match your filters</p>
                                <Button
                                    variant="link"
                                    onClick={() => {
                                        setSelectedCategories([])
                                        setPriceRange([0, 200000])
                                        setSearchQuery("")
                                    }}
                                    className="text-indigo-600 font-black uppercase tracking-widest text-sm"
                                >
                                    Reset Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}
