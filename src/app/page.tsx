"use client"

import Link from "next/link"
import ProductCard from "@/components/ProductCard"
import PromotionalCarousel from "@/components/PromotionalCarousel"
import CategoryTiles from "@/components/CategoryTiles"
import { products } from "@/data/products"
import { ArrowRight } from "lucide-react"
import Hero from "@/components/Hero"
import ScrollReveal from "@/components/ScrollReveal"
import { Button } from "@/components/ui/button"
import Newsletter from "@/components/Newsletter"
import RecentlyViewed from "@/components/RecentlyViewed"
import FlashDealTimer from "@/components/FlashDealTimer"
import LiveShoppingEvents from "@/components/LiveShoppingEvents"
import UserGeneratedContent from "@/components/UserGeneratedContent"

export default function Home() {
  const featuredProducts = products.slice(0, 6);

  return (
    <main className="min-h-screen bg-neutral-50 pb-24">
      {/* Hero component handles its own layout and padding */}
      <Hero />

      <ScrollReveal direction="up" delay={0.1}>
        <section className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[9px] sm:text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1">Limited Time buddy</span>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900">Flash Deals da!</h3>
          </div>
          <FlashDealTimer />
        </section>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <PromotionalCarousel />
        </section>
      </ScrollReveal>

      {/* Categories */}
      <ScrollReveal direction="up" delay={0.2}>
        <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <CategoryTiles />
        </section>
      </ScrollReveal>

      {/* Featured Collection */}
      <ScrollReveal direction="up" delay={0.3}>
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 px-2">
            <div>
              <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-[0.3em] mb-3 sm:mb-4 block">Sema Selection buddy</span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-medium text-neutral-900 tracking-tight font-serif italic">
                The <span className="text-neutral-400">Mass</span> Edit.
              </h2>
            </div>
            <Link href="/products" className="text-neutral-400 hover:text-neutral-900 text-[10px] sm:text-[11px] font-medium uppercase tracking-widest transition-colors flex items-center gap-2">
              Check this out buddy <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 sm:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Editorial Sections */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 grid md:grid-cols-2 gap-8 sm:gap-12">
        <ScrollReveal direction="left">
          <div className="bg-neutral-900 aspect-[16/9] rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden group flex flex-col justify-end">
            <div className="relative z-10">
              <span className="text-[9px] font-medium text-neutral-400 uppercase tracking-[0.3em] mb-3 sm:mb-4 block">Chennai&apos;s Choice da</span>
              <h3 className="text-2xl sm:text-3xl font-medium tracking-tight font-serif mb-4 sm:mb-6 leading-tight">Gethu <br /> Interiors.</h3>
              <Link href="/products?category=Home">
                <button className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.2em] border-b border-white pb-1 hover:text-neutral-400 hover:border-neutral-400 transition-all w-fit">Discover buddy</button>
              </Link>
            </div>
            {/* Subtle texture or image overlay could go here */}
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right">
          <div className="bg-neutral-100 aspect-[16/9] rounded-2xl p-8 sm:p-12 text-neutral-900 relative overflow-hidden group flex flex-col justify-end">
            <div className="relative z-10">
              <span className="text-[9px] font-medium text-neutral-500 uppercase tracking-[0.3em] mb-3 sm:mb-4 block">Vibe Series</span>
              <h3 className="text-2xl sm:text-3xl font-medium tracking-tight font-serif mb-4 sm:mb-6 leading-tight">Pakka <br /> Staples.</h3>
              <Link href="/products?category=Computing">
                <button className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.2em] border-b border-neutral-900 pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-all w-fit">Explore buddy</button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Best Sellers / Latest Curation */}
      <ScrollReveal direction="up">
        <section className="container mx-auto px-6 py-24">
          <div className="text-center mb-20">
            <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-[0.3em] mb-6 block">Trending buddy</span>
            <h2 className="text-4xl md:text-5xl font-medium text-neutral-900 tracking-tight font-serif">
              Our <span className="text-neutral-400 italic">Collection buddy.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-20 text-center">
            <Button asChild variant="outline" className="h-14 px-10 rounded-lg text-xs font-medium uppercase tracking-widest border-neutral-200 hover:border-neutral-900 hover:bg-white transition-all">
              <Link href="/products">See All Items buddy</Link>
            </Button>
          </div>
        </section>
      </ScrollReveal>

      <RecentlyViewed />

      <ScrollReveal direction="up">
        <Newsletter />
      </ScrollReveal>
    </main>
  )
}
