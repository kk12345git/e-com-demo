"use client"

import { useState } from "react"
import { Ruler, CheckCircle2, AlertCircle } from "lucide-react"

interface SizeRecommendationProps {
    productCategory: string
}

const sizeGuide = {
    "Audio": null, // No sizing needed
    "Computing": null,
    "Components": null,
    "Photography": null,
    "Apparel": {
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        measurements: {
            "XS": { chest: "34-36", waist: "28-30" },
            "S": { chest: "36-38", waist: "30-32" },
            "M": { chest: "38-40", waist: "32-34" },
            "L": { chest: "40-42", waist: "34-36" },
            "XL": { chest: "42-44", waist: "36-38" },
            "XXL": { chest: "44-46", waist: "38-40" }
        }
    }
}

export default function SizeRecommendation({ productCategory }: SizeRecommendationProps) {
    const [selectedHeight, setSelectedHeight] = useState<string>("")
    const [selectedWeight, setSelectedWeight] = useState<string>("")
    const [recommendedSize, setRecommendedSize] = useState<string | null>(null)

    const category = productCategory as keyof typeof sizeGuide
    const guide = sizeGuide[category]

    // AI size calculation (simplified algorithm)
    const calculateSize = () => {
        if (!selectedHeight || !selectedWeight) return

        const height = parseInt(selectedHeight)
        const weight = parseInt(selectedWeight)

        // Simple BMI-based size recommendation
        const bmi = weight / ((height / 100) ** 2)

        let size = "M"
        if (bmi < 18.5) size = "XS"
        else if (bmi < 22) size = "S"
        else if (bmi < 25) size = "M"
        else if (bmi < 28) size = "L"
        else if (bmi < 32) size = "XL"
        else size = "XXL"

        setRecommendedSize(size)
    }

    if (!guide) return null

    return (
        <div className="aesthetic-card p-8 space-y-8">
            {/* Header */}
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-400 shrink-0">
                    <Ruler size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-black text-white tracking-tighter mb-2 uppercase">AI Size Assistant</h3>
                    <p className="text-slate-500 text-sm font-medium">Get your perfect fit with our intelligent sizing recommendation</p>
                </div>
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="text-slate-400 font-bold text-sm uppercase tracking-widest mb-3 block">
                        Height (cm)
                    </label>
                    <input
                        type="number"
                        value={selectedHeight}
                        onChange={(e) => setSelectedHeight(e.target.value)}
                        placeholder="170"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-indigo-500 transition-all"
                    />
                </div>
                <div>
                    <label className="text-slate-400 font-bold text-sm uppercase tracking-widest mb-3 block">
                        Weight (kg)
                    </label>
                    <input
                        type="number"
                        value={selectedWeight}
                        onChange={(e) => setSelectedWeight(e.target.value)}
                        placeholder="70"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-indigo-500 transition-all"
                    />
                </div>
            </div>

            <button
                onClick={calculateSize}
                disabled={!selectedHeight || !selectedWeight}
                className="w-full btn-premium h-14 rounded-[1.25rem] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Calculate My Size
            </button>

            {/* Recommendation Result */}
            {recommendedSize && (
                <div className="p-6 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-2xl">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 shrink-0">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <h4 className="text-emerald-400 font-black text-lg mb-2 uppercase tracking-tight">
                                Recommended Size: {recommendedSize}
                            </h4>
                            <p className="text-slate-300 text-sm font-medium mb-4">
                                Based on your measurements, we recommend size <span className="text-white font-black">{recommendedSize}</span> for the best fit.
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-xs">
                                <div>
                                    <span className="text-slate-500 font-bold uppercase tracking-widest block mb-1">Chest</span>
                                    <span className="text-white font-black">{guide.measurements[recommendedSize as keyof typeof guide.measurements]?.chest}" inches</span>
                                </div>
                                <div>
                                    <span className="text-slate-500 font-bold uppercase tracking-widest block mb-1">Waist</span>
                                    <span className="text-white font-black">{guide.measurements[recommendedSize as keyof typeof guide.measurements]?.waist}" inches</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Size Chart */}
            <div>
                <h4 className="text-white font-black text-sm uppercase tracking-widest mb-4">Full Size Chart</h4>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left text-slate-500 font-black uppercase tracking-widest py-3">Size</th>
                                <th className="text-left text-slate-500 font-black uppercase tracking-widest py-3">Chest (in)</th>
                                <th className="text-left text-slate-500 font-black uppercase tracking-widest py-3">Waist (in)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {guide.sizes.map(size => (
                                <tr
                                    key={size}
                                    className={`border-b border-white/5 ?{recommendedSize === size ? 'bg-indigo-600/10' : ''}`}
                                >
                                    <td className="py-3 text-white font-black">{size}</td>
                                    <td className="py-3 text-slate-400 font-bold">{guide.measurements[size as keyof typeof guide.measurements]?.chest}</td>
                                    <td className="py-3 text-slate-400 font-bold">{guide.measurements[size as keyof typeof guide.measurements]?.waist}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Fit Guarantee */}
            <div className="p-4 bg-indigo-600/10 border border-indigo-500/20 rounded-xl flex items-center gap-3">
                <AlertCircle size={20} className="text-indigo-400 shrink-0" />
                <p className="text-slate-400 text-xs font-medium">
                    <span className="text-indigo-400 font-black">Fit Guarantee:</span> Free returns within 30 days if the size doesn't fit perfectly.
                </p>
            </div>
        </div>
    )
}
