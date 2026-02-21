"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface SectionRevealProps {
    children: ReactNode
    width?: "fit-content" | "100%"
    delay?: number
    direction?: "up" | "down" | "left" | "right"
}

export default function SectionReveal({
    children,
    width = "100%",
    delay = 0,
    direction = "up"
}: SectionRevealProps) {
    const directions = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 }
    }

    return (
        <div style={{ position: "relative", width, overflow: "hidden" }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, ...directions[direction] },
                    visible: { opacity: 1, x: 0, y: 0 }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
                {children}
            </motion.div>
        </div>
    )
}
