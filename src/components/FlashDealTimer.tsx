"use client"

import { useState, useEffect, useCallback } from "react"
import { Clock } from "lucide-react"

interface FlashDealTimerProps {
    endTime?: Date
}

export default function FlashDealTimer({ endTime }: FlashDealTimerProps) {
    const [defaultEndTime] = useState(() => new Date(Date.now() + 24 * 60 * 60 * 1000))

    const calculateTimeLeft = useCallback(() => {
        const end = endTime || defaultEndTime
        const difference = end.getTime() - new Date().getTime()

        if (difference > 0) {
            return {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            }
        }
        return { hours: 0, minutes: 0, seconds: 0 }
    }, [endTime, defaultEndTime])

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft)

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)

        return () => clearInterval(timer)
    }, [calculateTimeLeft])

    return (
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-3 md:px-4 py-2 rounded-lg font-black text-xs md:text-sm">
            <Clock size={16} className="animate-pulse" />
            <span className="hidden md:inline">ENDS IN:</span>
            <div className="flex gap-1">
                <span className="bg-white/20 px-1.5 md:px-2 py-1 rounded min-w-[28px] md:min-w-[32px] text-center text-xs md:text-sm">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span>:</span>
                <span className="bg-white/20 px-1.5 md:px-2 py-1 rounded min-w-[28px] md:min-w-[32px] text-center text-xs md:text-sm">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span>:</span>
                <span className="bg-white/20 px-1.5 md:px-2 py-1 rounded min-w-[28px] md:min-w-[32px] text-center text-xs md:text-sm">{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
        </div>
    )
}
