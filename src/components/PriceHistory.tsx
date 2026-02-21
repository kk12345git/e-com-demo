"use client"

import { Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js"
import { TrendingDown, TrendingUp, AlertCircle } from "lucide-react"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

interface PriceHistoryProps {
    currentPrice: number
    productName: string
}

export default function PriceHistory({ currentPrice, productName }: PriceHistoryProps) {
    // Simulated 90-day price history
    const generatePriceHistory = () => {
        const history: number[] = []
        const basePrice = currentPrice * 1.2 // Start 20% higher

        for (let i = 0; i < 90; i++) {
            const volatility = Math.sin(i / 10) * 0.1 + Math.random() * 0.05
            const trend = -0.002 * i // Gradual downward trend
            const price = basePrice * (1 + volatility + trend)
            history.push(Math.round(price))
        }

        return history
    }

    const priceHistory = generatePriceHistory()
    const highestPrice = Math.max(...priceHistory)
    const lowestPrice = Math.min(...priceHistory)
    const averagePrice = Math.round(priceHistory.reduce((a, b) => a + b, 0) / priceHistory.length)
    const savingsVsAverage = averagePrice - currentPrice
    const savingsVsHigh = highestPrice - currentPrice

    const chartData = {
        labels: Array.from({ length: 90 }, (_, i) => `Day ?{i + 1}`),
        datasets: [
            {
                label: "Price (?)",
                data: priceHistory,
                borderColor: "rgb(99, 102, 241)",
                backgroundColor: "rgba(99, 102, 241, 0.1)",
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                borderWidth: 2
            }
        ]
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                titleColor: "#fff",
                bodyColor: "#94a3b8",
                borderColor: "rgba(255, 255, 255, 0.1)",
                borderWidth: 1,
                padding: 12,
                displayColors: false,
                callbacks: {
                    title: (context: any) => `Day ?{context[0].dataIndex + 1}`,
                    label: (context: any) => `??{context.parsed.y}`
                }
            }
        },
        scales: {
            x: {
                display: false
            },
            y: {
                ticks: {
                    color: "#64748b",
                    font: {
                        size: 12,
                        weight: "bold" as const
                    },
                    callback: (value: any) => `??{value}`
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.05)"
                }
            }
        }
    }

    const isGoodDeal = currentPrice <= lowestPrice * 1.05
    const trend = priceHistory[priceHistory.length - 1] < priceHistory[priceHistory.length - 30] ? "down" : "up"

    return (
        <div className="aesthetic-card p-8 space-y-8">
            {/* Header */}
            <div>
                <h3 className="text-2xl font-black text-white tracking-tighter mb-2 uppercase">Price History (90 Days)</h3>
                <p className="text-slate-500 text-sm font-medium">Track price trends and get the best deal</p>
            </div>

            {/* Chart */}
            <div className="h-64 bg-slate-900/50 rounded-2xl p-6">
                <Line data={chartData} options={chartOptions} />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="aesthetic-card bg-slate-900/50 p-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Current</p>
                    <p className="text-2xl font-black text-white">?{currentPrice}</p>
                </div>
                <div className="aesthetic-card bg-slate-900/50 p-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Average</p>
                    <p className="text-2xl font-black text-white">?{averagePrice}</p>
                </div>
                <div className="aesthetic-card bg-slate-900/50 p-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Highest</p>
                    <p className="text-2xl font-black text-white">?{highestPrice}</p>
                </div>
                <div className="aesthetic-card bg-slate-900/50 p-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Lowest</p>
                    <p className="text-2xl font-black text-white">?{lowestPrice}</p>
                </div>
            </div>

            {/* AI Insight */}
            <div className={`p-6 rounded-2xl border-2 ?{isGoodDeal ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-amber-500/10 border-amber-500/30'}`}>
                <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ?{isGoodDeal ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        {isGoodDeal ? <TrendingDown size={24} /> : <AlertCircle size={24} />}
                    </div>
                    <div>
                        <h4 className={`font-black text-lg mb-2 uppercase tracking-tight ?{isGoodDeal ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {isGoodDeal ? "🎯 Excellent Deal!" : "⏰ Price Watch Active"}
                        </h4>
                        <p className="text-slate-300 text-sm font-medium leading-relaxed mb-3">
                            {isGoodDeal
                                ? `This is one of the lowest prices we've seen for ?{productName}. You're saving ??{savingsVsAverage.toFixed(2)} vs the 90-day average!`
                                : `Price is ?{trend === "up" ? "trending upward" : "stable"}. The best time to buy was ?{Math.abs(priceHistory.indexOf(lowestPrice) - 89)} days ago at ??{lowestPrice}.`
                            }
                        </p>
                        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                            <span className={isGoodDeal ? 'text-emerald-500' : 'text-amber-500'}>
                                {isGoodDeal ? "Best Time to Buy" : "Set Price Alert"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Savings Breakdown */}
            <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-indigo-600/10 rounded-xl border border-indigo-500/20">
                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2">vs Highest</p>
                    <p className="text-3xl font-black text-white">-?{savingsVsHigh}</p>
                </div>
                <div className="text-center p-4 bg-emerald-600/10 rounded-xl border border-emerald-500/20">
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">vs Average</p>
                    <p className="text-3xl font-black text-white">-?{savingsVsAverage.toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}
