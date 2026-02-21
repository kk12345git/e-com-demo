"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, ShieldCheck, MessageSquare } from "lucide-react"

export default function Concierge() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { id: 1, text: "Vanakkam buddy! ShopClone Concierge pesuren. Enna help venum machi?", sender: "bot" }
    ])
    const [inputText, setInputText] = useState("")

    const handleSend = () => {
        if (!inputText.trim()) return
        setMessages([...messages, { id: Date.now(), text: inputText, sender: "user" }])
        setInputText("")

        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now(),
                text: "Semma selection buddy! Namba premium limited pieces try pannunga, delivery complimentary buddy!",
                sender: "bot"
            }])
        }, 1200)
    }

    return (
        <div className="fixed bottom-10 right-10 z-[2000]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.95 }}
                        className="absolute bottom-24 right-0 w-[380px] h-[580px] bg-white flex flex-col overflow-hidden rounded-2xl border border-neutral-100 shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-8 bg-neutral-50 border-b border-neutral-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-neutral-900 rounded-lg flex items-center justify-center">
                                    <MessageSquare size={18} className="text-white" />
                                </div>
                                <div>
                                    <h4 className="text-[11px] font-medium text-neutral-900 uppercase tracking-[0.2em] leading-none mb-1.5">Concierge Buddy</h4>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-neutral-300 rounded-full"></div>
                                        <span className="text-[9px] text-neutral-400 font-medium uppercase tracking-widest">On-line iruken buddy</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-300 hover:text-neutral-900">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[85%] p-5 rounded-xl text-[13px] leading-relaxed font-medium ${msg.sender === "user"
                                        ? "bg-neutral-900 text-white"
                                        : "bg-neutral-50 text-neutral-600 border border-neutral-100"
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-8 border-t border-neutral-100 flex gap-4 bg-white">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                placeholder="Edhavadhu pesalaiye buddy..."
                                className="flex-1 bg-neutral-50 border border-neutral-100 rounded-lg px-5 py-4 text-[13px] text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-900 transition-all font-medium"
                            />
                            <button onClick={handleSend} className="w-14 h-14 bg-neutral-900 rounded-lg flex items-center justify-center hover:bg-neutral-800 transition-all text-white">
                                <Send size={16} />
                            </button>
                        </div>

                        {/* Trust Footer */}
                        <div className="px-8 py-4 bg-neutral-50 flex items-center justify-center gap-3">
                            <ShieldCheck size={14} className="text-neutral-300" />
                            <span className="text-[9px] font-medium text-neutral-400 uppercase tracking-widest">Premium Security Guaranteed</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center shadow-2xl relative"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isOpen ? "open" : "closed"}
                        initial={{ opacity: 0, rotate: -45 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 45 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isOpen ? <X size={20} className="text-white" /> : <MessageSquare size={20} className="text-white" />}
                    </motion.div>
                </AnimatePresence>
            </motion.button>
        </div>
    )
}
