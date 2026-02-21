"use client"

import Link from "next/link"
import { Smartphone, Headphones, Laptop, Watch, Camera, Home, Shirt, ShoppingBag, Zap, Gift, Tag, Star } from "lucide-react"

export default function CategoryTiles() {
    const categories = [
        { name: "Electronics", icon: <Zap size={24} />, link: "/products?category=Electronics" },
        { name: "Fashion", icon: <Shirt size={24} />, link: "/products?category=Fashion" },
        { name: "Mobiles", icon: <Smartphone size={24} />, link: "/products?category=Computing" },
        { name: "Audio", icon: <Headphones size={24} />, link: "/products?category=Audio" },
        { name: "Laptops", icon: <Laptop size={24} />, link: "/products?category=Computing" },
        { name: "Watches", icon: <Watch size={24} />, link: "/products" },
        { name: "Cameras", icon: <Camera size={24} />, link: "/products?category=Photography" },
        { name: "Home", icon: <Home size={24} />, link: "/products" },
        { name: "Bags", icon: <ShoppingBag size={24} />, link: "/products" },
        { name: "Gifts", icon: <Gift size={24} />, link: "/products" },
        { name: "Offers", icon: <Tag size={24} />, link: "/products" },
        { name: "Trending", icon: <Star size={24} />, link: "/products" }
    ]

    return (
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-6 md:gap-8">
            {categories.map((category, index) => (
                <Link
                    key={index}
                    href={category.link}
                    className="group"
                >
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-400 group-hover:bg-neutral-900 group-hover:text-white group-hover:border-neutral-900 transition-all duration-300">
                            {category.icon}
                        </div>
                        <span className="text-[11px] font-medium text-neutral-500 uppercase tracking-widest text-center group-hover:text-neutral-900 transition-colors">
                            {category.name}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    )
}
