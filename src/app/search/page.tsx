"use client"

import { useSearchParams } from "next/navigation"
import { products } from "@/data/products"
import ProductCard from "@/components/ProductCard"
import { Search, SlidersHorizontal, ArrowRight, Inbox } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Suspense } from "react"

function SearchResultsContent() {
    const searchParams = useSearchParams()
    const query = searchParams.get("q") || ""

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <div className="container mx-auto px-6">
            {/* Header */}
            <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 px-2">
                <div>
                    <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-[0.4em] mb-4 block">Search Results Buddy</span>
                    <h1 className="text-4xl md:text-6xl font-medium tracking-tight font-serif italic text-neutral-900">
                        {query ? `Results for "${query}"` : 'All Pieces.'}
                    </h1>
                </div>

                <div className="flex items-center gap-8">
                    <button className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors">
                        <SlidersHorizontal size={14} /> Filter
                    </button>
                    <span className="text-[10px] font-medium text-neutral-300 uppercase tracking-widest">
                        {filteredProducts.length} Results
                    </span>
                </div>
            </div>

            {/* Results Grid */}
            <AnimatePresence mode="wait">
                {filteredProducts.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 mb-32"
                    >
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-32 text-center max-w-lg mx-auto"
                    >
                        <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-10 border border-neutral-100">
                            <Inbox size={24} className="text-neutral-300" />
                        </div>
                        <h2 className="text-3xl font-medium text-neutral-900 tracking-tight font-serif mb-6 italic">Onnum kedeikala buddy.</h2>
                        <p className="text-neutral-400 text-sm font-medium mb-12 uppercase tracking-widest leading-relaxed">
                            &quot;{query}&quot;-ku matching items illa machi. Search refine pannunga illana collections browse pannunga!
                        </p>
                        <Button asChild className="h-14 px-10 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-all font-medium uppercase tracking-widest text-[11px]">
                            <Link href="/products" className="flex items-center gap-3">
                                Ellaa product-um paakalam <ArrowRight size={16} />
                            </Link>
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function SearchPage() {
    return (
        <main className="min-h-screen bg-[#FDFCFB] pt-[140px] pb-24 text-neutral-900">
            <Suspense fallback={
                <div className="container mx-auto px-6 py-24 text-center">
                    <div className="w-12 h-12 border border-neutral-200 border-t-neutral-900 rounded-full animate-spin mx-auto mb-8"></div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-neutral-400">Searching Archive...</p>
                </div>
            }>
                <SearchResultsContent />
            </Suspense>
        </main>
    )
}
