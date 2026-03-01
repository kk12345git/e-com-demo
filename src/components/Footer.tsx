"use client"

import Link from "next/link"
import Image from "next/image"

export default function Footer() {
    return (
        <footer className="bg-[#FDFCFB] border-t border-neutral-100 py-24 text-neutral-900">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
                    <div className="col-span-1 md:col-span-2">
                        <div className="relative w-48 h-16 xl:w-56 xl:h-20 mb-6">
                            <Image
                                src="/logo.png"
                                alt="Deeshora"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                        <p className="text-neutral-500 text-sm font-medium leading-relaxed max-w-sm">
                            From India To The World. Authentic premium marketplace.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-medium uppercase tracking-[0.4em] text-neutral-900 mb-8">Namba Pages</h4>
                        <ul className="text-neutral-400 text-[10px] font-medium uppercase tracking-[0.3em] flex flex-col gap-6">
                            <li><Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link></li>
                            <li><Link href="/products" className="hover:text-neutral-900 transition-colors">Collection</Link></li>
                            <li><Link href="/cart" className="hover:text-neutral-900 transition-colors">Bag</Link></li>
                            <li><Link href="/wishlist" className="hover:text-neutral-900 transition-colors">Wishlist</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-medium uppercase tracking-[0.4em] text-neutral-900 mb-8">Uthavi Buddy</h4>
                        <ul className="text-neutral-400 text-[10px] font-medium uppercase tracking-[0.3em] flex flex-col gap-6">
                            <li><Link href="/support" className="hover:text-neutral-900 transition-colors">Help Center</Link></li>
                            <li><Link href="/support" className="hover:text-neutral-900 transition-colors">Shipment Tracking</Link></li>
                            <li><Link href="/support" className="hover:text-neutral-900 transition-colors">Returns</Link></li>
                            <li><Link href="#" className="hover:text-neutral-900 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-neutral-900 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-neutral-50 flex flex-col md:flex-row items-center justify-between text-[9px] text-neutral-300 font-medium tracking-[0.4em] uppercase gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-1.5 h-1.5 bg-neutral-100 rounded-full"></div>
                        <span>© 2026 Deeshora.</span>
                    </div>
                    <div className="flex gap-12">
                        <span>Authenticity Guaranteed</span>
                        <span>Secure Transactions</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
