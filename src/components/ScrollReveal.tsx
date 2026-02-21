"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface ScrollRevealProps {
    children: React.ReactNode
    width?: "fit-content" | "100%"
    direction?: "up" | "down" | "left" | "right"
    delay?: number
}

export default function ScrollReveal({ children, width = "fit-content", direction = "up", delay = 0.2 }: ScrollRevealProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
            x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
            filter: "blur(10px)"
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            filter: "blur(0px)"
        }
    }

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "visible" }}>
            <motion.div
                variants={variants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
            >
                {children}
            </motion.div>
        </div>
    )
}
