"use client"
import { User, Package, MapPin, CreditCard, Shield, LogOut, ChevronRight, ChevronLeft } from 'lucide-react'
import { useAuth } from "@/context/AuthContext"
import { motion, AnimatePresence } from 'framer-motion'
import { formatPrice } from "@/utils/formatPrice"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function AccountPage() {
    const { user, login, logout, isAuthenticated, updateUser } = useAuth()
    const [activeSection, setActiveSection] = useState("Profile Info")
    const { toast } = useToast()
    const [orders, setOrders] = useState<{ id: string, date: string, total: number, status: string }[]>([])
    const [isEditingProfile, setIsEditingProfile] = useState(false)

    // Onboarding State
    const [step, setStep] = useState<"phone" | "otp" | "profile">("phone")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [profileData, setProfileData] = useState({ name: "", email: "", gender: "Male" })

    // Extended States for Interactivity
    const [addresses, setAddresses] = useState([
        { id: 1, label: "Home (Primary)", address: "42, Anna Salai, T. Nagar, Chennai - 600017" },
        { id: 2, label: "Office", address: "Tech Park, OMR, Sholinganallur, Chennai - 600119" }
    ])
    const [bankDetails, setBankDetails] = useState({ holder: "Elite Customer", account: "•••• •••• •••• 4242", expiry: "12/28" })
    const [isAddingAddress, setIsAddingAddress] = useState(false)
    const [newAddress, setNewAddress] = useState({ label: "", address: "" })
    const [isEditingBank, setIsEditingBank] = useState(false)

    // Edit State
    const [editName, setEditName] = useState("")
    const [editPhone, setEditPhone] = useState("")

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                setEditName(user.name || "")
                setEditPhone(user.phone || "")
            }, 0)
        }
    }, [user])

    useEffect(() => {
        const timer = setTimeout(() => {
            const savedOrders = localStorage.getItem('shopclone_orders')
            if (savedOrders) {
                setOrders(JSON.parse(savedOrders))
            }
        }, 0)
        return () => clearTimeout(timer)
    }, [])

    const handleSaveProfile = () => {
        updateUser({ name: editName, phone: editPhone })
        setIsEditingProfile(false)
        toast({ title: "Updated", description: "Profile node synchronized." })
    }

    // Handle case where user is not logged in
    if (!isAuthenticated) {
        return (
            <main className="min-h-screen bg-[#FDFCFB] pt-[140px] pb-24 flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white border border-neutral-100 rounded-[2.5rem] p-10 md:p-14 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-neutral-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>

                    <AnimatePresence mode="wait">
                        {step === "phone" && (
                            <motion.div
                                key="phone"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="relative z-10"
                            >
                                <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center mb-10 border border-neutral-100">
                                    <User size={24} className="text-neutral-300" />
                                </div>
                                <h1 className="text-3xl font-medium text-neutral-900 tracking-tight font-serif italic mb-4">
                                    Vanakkam <span className="text-neutral-400">Buddy!</span>
                                </h1>
                                <p className="text-neutral-400 text-[11px] font-medium mb-12 uppercase tracking-widest leading-relaxed">
                                    Mobile number podunga buddy, let&apos;s get started.
                                </p>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-20 h-14 bg-neutral-50 border border-neutral-100 rounded-xl flex items-center justify-center text-xs font-medium text-neutral-400">
                                            +91
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                type="tel"
                                                placeholder="Phone Number buddy"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                className="w-full h-14 bg-neutral-50 border border-neutral-100 rounded-xl px-6 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => phoneNumber.length >= 10 && setStep("otp")}
                                        disabled={phoneNumber.length < 10}
                                        className="w-full h-14 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-all font-medium uppercase tracking-widest text-[11px]"
                                    >
                                        OTP Anupunga
                                    </Button>
                                    <p className="text-center text-[9px] text-neutral-300 uppercase tracking-widest leading-relaxed">
                                        By continuing, you agree to our <span className="text-neutral-400 border-b border-neutral-100">Terms</span> and <span className="text-neutral-400 border-b border-neutral-100">Policy</span>.
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {step === "otp" && (
                            <motion.div
                                key="otp"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="relative z-10 text-center"
                            >
                                <h1 className="text-3xl font-medium text-neutral-900 tracking-tight font-serif italic mb-4 text-left">
                                    Verify <span className="text-neutral-400">Node.</span>
                                </h1>
                                <p className="text-neutral-400 text-[11px] font-medium mb-12 uppercase tracking-widest leading-relaxed text-left">
                                    Sent to +91 {phoneNumber} • <button onClick={() => setStep("phone")} className="text-neutral-900 border-b border-neutral-900">Change</button>
                                </p>
                                <div className="space-y-8">
                                    <div className="flex justify-between gap-4">
                                        {[1, 2, 3, 4].map((i) => (
                                            <input
                                                key={i}
                                                type="text"
                                                maxLength={1}
                                                className="w-16 h-16 bg-neutral-50 border border-neutral-100 rounded-xl text-center text-xl font-serif italic focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all"
                                            />
                                        ))}
                                    </div>
                                    <Button
                                        onClick={() => setStep("profile")}
                                        className="w-full h-14 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-all font-medium uppercase tracking-widest text-[11px]"
                                    >
                                        Verify OTP
                                    </Button>
                                    <p className="text-[10px] text-neutral-400 font-medium uppercase tracking-widest">
                                        Didn&apos;t receive? <span className="text-neutral-900">Resend (45s)</span>
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {step === "profile" && (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="relative z-10"
                            >
                                <h1 className="text-3xl font-medium text-neutral-900 tracking-tight font-serif italic mb-4">
                                    Enna <span className="text-neutral-400">Name Buddy?</span>
                                </h1>
                                <p className="text-neutral-400 text-[11px] font-medium mb-10 uppercase tracking-widest leading-relaxed">
                                    Idhu namba ShopClone, ungala pathi konjam sollunga.
                                </p>
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-[9px] font-medium text-neutral-400 uppercase tracking-widest mb-3 block">Full Name buddy</label>
                                        <input
                                            type="text"
                                            value={profileData.name}
                                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                            className="w-full h-14 bg-neutral-50 border border-neutral-100 rounded-xl px-6 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all"
                                            placeholder="Enter Name"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setProfileData({ ...profileData, gender: "Male" })}
                                            className={`h-14 rounded-xl text-[10px] font-medium uppercase tracking-widest transition-all ${profileData.gender === "Male" ? 'bg-neutral-900 text-white shadow-lg' : 'bg-neutral-50 text-neutral-400 border border-neutral-100'}`}
                                        >
                                            Pasanga
                                        </button>
                                        <button
                                            onClick={() => setProfileData({ ...profileData, gender: "Female" })}
                                            className={`h-14 rounded-xl text-[10px] font-medium uppercase tracking-widest transition-all ${profileData.gender === "Female" ? 'bg-neutral-900 text-white shadow-lg' : 'bg-neutral-50 text-neutral-400 border border-neutral-100'}`}
                                        >
                                            Ponunga
                                        </button>
                                    </div>
                                    <Button
                                        onClick={() => {
                                            login(phoneNumber)
                                            toast({ title: "Authorized buddy", description: "Node synchronized successfully." })
                                        }}
                                        disabled={!profileData.name}
                                        className="w-full h-14 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-all font-medium uppercase tracking-widest text-[11px] mt-4"
                                    >
                                        Ready Machi!
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        )
    }

    if (!user) return null

    return (
        <main className="min-h-screen bg-[#FDFCFB] pt-[140px] pb-24 text-neutral-900">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Profile Header (Meesho Style) */}
                <div className="bg-white border border-neutral-100 rounded-3xl p-8 mb-10 shadow-sm flex items-center gap-8">
                    <div className="w-20 h-20 rounded-full bg-neutral-50 border border-neutral-100 relative overflow-hidden shrink-0">
                        <Image src={user.avatar} alt="Avatar" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-medium tracking-tight font-serif italic mb-1">{user.name}</h2>
                        <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-widest">{user.phone || user.email}</p>
                    </div>
                    <button
                        onClick={() => {
                            setEditName(user.name || "")
                            setEditPhone(user.phone || "")
                            setIsEditingProfile(true)
                        }}
                        className="h-10 px-6 rounded-lg border border-neutral-200 text-[10px] font-medium uppercase tracking-widest hover:border-neutral-900 transition-all"
                    >
                        Edit
                    </button>
                </div>

                {/* Account Navigation / Hub */}
                <div className="space-y-4">
                    <AccountHubItem
                        icon={<Package size={18} />}
                        label="Semma Orders buddy"
                        sub="Check status & track items"
                        onClick={() => setActiveSection("Order History")}
                    />
                    <AccountHubItem
                        icon={<CreditCard size={18} />}
                        label="Namba Bank Details"
                        sub="Manage measurements & payments"
                        onClick={() => setActiveSection("Payment Methods")}
                    />
                    <AccountHubItem
                        icon={<MapPin size={18} />}
                        label="Enna Address buddy?"
                        sub="Coordinates for delivery"
                        onClick={() => setActiveSection("Addresses")}
                    />
                    <AccountHubItem
                        icon={<Shield size={18} />}
                        label="Account Safety buddy"
                        sub="Manage nodes & access"
                        onClick={() => setActiveSection("Profile Info")}
                    />
                    <div className="pt-8">
                        <button
                            onClick={() => logout()}
                            className="w-full flex items-center justify-center gap-4 h-16 rounded-2xl border border-red-50 text-red-400 hover:bg-red-50 transition-all text-[11px] font-medium uppercase tracking-widest"
                        >
                            <LogOut size={16} />
                            Tata Bye Bye Buddy!
                        </button>
                    </div>
                </div>

                {/* Active Section Modal/Overlay ( Meesho uses separate pages, we'll use state-based overlays for high interactivity ) */}
                <AnimatePresence>
                    {activeSection !== "Profile Info" && (
                        <motion.div
                            initial={{ opacity: 0, y: "100%" }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: "100%" }}
                            className="fixed inset-0 z-[100] bg-white pt-[100px] overflow-y-auto no-scrollbar"
                        >
                            <div className="max-w-4xl mx-auto px-6 pb-24">
                                <button
                                    onClick={() => setActiveSection("Profile Info")}
                                    className="flex items-center gap-2 mb-12 text-[10px] font-medium uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-all"
                                >
                                    <ChevronLeft size={16} /> Back to Hub
                                </button>

                                {activeSection === "Order History" && (
                                    <div className="space-y-12">
                                        <h1 className="text-4xl font-serif italic text-neutral-900">Recent <span className="text-neutral-400">Purchases Machi.</span></h1>
                                        <div className="space-y-6">
                                            {orders.map((order) => (
                                                <div key={order.id} className="bg-white border border-neutral-100 rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-all">
                                                    <div>
                                                        <div className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest mb-2">{order.date}</div>
                                                        <div className="text-lg font-medium text-neutral-900">{order.id}</div>
                                                    </div>
                                                    <div className="flex items-center gap-12">
                                                        <div className="text-right">
                                                            <div className="text-[9px] font-medium uppercase tracking-widest text-neutral-300 mb-1">Bill Amount buddy</div>
                                                            <div className="text-sm font-medium">{formatPrice(order.total)}</div>
                                                        </div>
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => toast({ title: "In Transit buddy", description: "Vandhute iruku buddy, kavalapadadhinga!" })}
                                                            className="rounded-lg text-[9px] font-medium uppercase tracking-widest"
                                                        >
                                                            Track Order
                                                        </Button>
                                                        <span className={`px-4 py-2 rounded-lg text-[9px] font-medium uppercase tracking-widest ${order.status === 'Delivered' ? 'bg-neutral-100 text-neutral-600' : 'bg-neutral-50 text-neutral-400'}`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeSection === "Addresses" && (
                                    <div className="space-y-12">
                                        <div className="flex items-center justify-between">
                                            <h1 className="text-4xl font-serif italic text-neutral-900">Delivery <span className="text-neutral-400">Points Machi.</span></h1>
                                            <Button onClick={() => setIsAddingAddress(true)} className="rounded-lg text-[10px] font-medium uppercase tracking-widest">+ Pudhu Address</Button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {addresses.map((addr) => (
                                                <div key={addr.id} className="bg-white border-2 border-neutral-900 rounded-3xl p-10 relative">
                                                    <div className="text-[10px] font-medium uppercase tracking-widest text-neutral-400 mb-6">{addr.label}</div>
                                                    <div className="text-sm font-medium mb-10 text-neutral-900 leading-loose">
                                                        {addr.address}
                                                    </div>
                                                    <div className="flex gap-8">
                                                        <button className="text-[10px] font-medium uppercase tracking-widest border-b border-neutral-900">Edit buddy</button>
                                                        <button
                                                            onClick={() => setAddresses(addresses.filter(a => a.id !== addr.id))}
                                                            className="text-[10px] font-medium uppercase tracking-widest text-neutral-300"
                                                        >
                                                            Venam buddy
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeSection === "Payment Methods" && (
                                    <div className="space-y-12">
                                        <h1 className="text-4xl font-serif italic text-neutral-900">Bank <span className="text-neutral-400">Details Buddy.</span></h1>
                                        <div className="bg-neutral-900 rounded-3xl p-12 text-white relative h-64 flex flex-col justify-between overflow-hidden shadow-2xl">
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                                            <div className="flex justify-between items-start opacity-50 text-[10px] font-medium uppercase tracking-widest">
                                                <span>{bankDetails.holder}&apos;s Node</span>
                                                <Shield size={16} />
                                            </div>
                                            <div className="text-2xl font-mono tracking-[0.3em]">
                                                {bankDetails.account}
                                            </div>
                                            <div className="flex justify-between text-[10px] font-medium uppercase tracking-widest">
                                                <span>{bankDetails.holder}</span>
                                                <span className="opacity-50">{bankDetails.expiry}</span>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            onClick={() => setIsEditingBank(true)}
                                            className="w-full h-14 rounded-2xl uppercase tracking-widest text-[11px] font-medium"
                                        >
                                            Pudhu Card Podunga buddy
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {isEditingProfile && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[200] bg-neutral-900/40 backdrop-blur-sm flex items-end md:items-center justify-center p-6"
                        >
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                className="bg-white w-full max-w-lg rounded-[2.5rem] p-12 shadow-2xl"
                            >
                                <h1 className="text-3xl font-medium tracking-tight font-serif italic mb-8">Edit <span className="text-neutral-400">Machi.</span></h1>
                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[9px] font-medium text-neutral-400 uppercase tracking-widest ml-1">Full Name buddy</label>
                                        <input
                                            type="text"
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                            className="w-full h-14 bg-neutral-50 border border-neutral-100 rounded-xl px-6 text-sm font-medium focus:ring-1 focus:ring-neutral-900 transition-all outline-none"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[9px] font-medium text-neutral-400 uppercase tracking-widest ml-1">Phone Machi</label>
                                        <input
                                            type="text"
                                            value={editPhone}
                                            onChange={(e) => setEditPhone(e.target.value)}
                                            className="w-full h-14 bg-neutral-50 border border-neutral-100 rounded-xl px-6 text-sm font-medium focus:ring-1 focus:ring-neutral-900 transition-all outline-none"
                                        />
                                    </div>
                                    <div className="flex gap-4 pt-4">
                                        <Button
                                            onClick={handleSaveProfile}
                                            className="flex-1 h-14 bg-neutral-900 text-white rounded-xl uppercase tracking-widest text-[11px] font-medium"
                                        >
                                            Save Pannunga
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => setIsEditingProfile(false)}
                                            className="flex-1 h-14 rounded-xl uppercase tracking-widest text-[11px] font-medium text-neutral-400 border-neutral-100"
                                        >
                                            Venam buddy
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Address Addition Overlay */}
                    {isAddingAddress && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[200] bg-neutral-900/40 backdrop-blur-sm flex items-end md:items-center justify-center p-6"
                        >
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                className="bg-white w-full max-w-lg rounded-[2.5rem] p-12 shadow-2xl"
                            >
                                <h1 className="text-3xl font-medium tracking-tight font-serif italic mb-8">Pudhu <span className="text-neutral-400">Address.</span></h1>
                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[9px] font-medium text-neutral-400 uppercase tracking-widest ml-1">Label (Home/Office)</label>
                                        <input
                                            type="text"
                                            value={newAddress.label}
                                            onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                                            className="w-full h-14 bg-neutral-50 border border-neutral-100 rounded-xl px-6 text-sm font-medium outline-none"
                                            placeholder="Ex: Home buddy"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[9px] font-medium text-neutral-400 uppercase tracking-widest ml-1">Full Address buddy</label>
                                        <textarea
                                            value={newAddress.address}
                                            onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                                            className="w-full h-32 bg-neutral-50 border border-neutral-100 rounded-xl p-6 text-sm font-medium outline-none resize-none"
                                            placeholder="Address type pannunga buddy"
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <Button
                                            onClick={() => {
                                                setAddresses([...addresses, { id: Date.now(), ...newAddress }])
                                                setIsAddingAddress(false)
                                                setNewAddress({ label: "", address: "" })
                                                toast({ title: "Address Added buddy", description: "Pudhu area locked machi!" })
                                            }}
                                            className="flex-1 h-14 bg-neutral-900 text-white rounded-xl uppercase tracking-widest text-[11px] font-medium"
                                        >
                                            Add buddy
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => setIsAddingAddress(false)}
                                            className="flex-1 h-14 rounded-xl uppercase tracking-widest text-[11px] font-medium text-neutral-400 border-neutral-100"
                                        >
                                            Discard
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Bank Detail Overlay */}
                    {isEditingBank && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[200] bg-neutral-900/40 backdrop-blur-sm flex items-end md:items-center justify-center p-6"
                        >
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                className="bg-white w-full max-w-lg rounded-[2.5rem] p-12 shadow-2xl"
                            >
                                <h1 className="text-3xl font-medium tracking-tight font-serif italic mb-8">Pudhu <span className="text-neutral-400">Card Podunga buddy.</span></h1>
                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[9px] font-medium text-neutral-400 uppercase tracking-widest ml-1">Card Number buddy</label>
                                        <input
                                            type="text"
                                            value={bankDetails.account}
                                            onChange={(e) => setBankDetails({ ...bankDetails, account: e.target.value })}
                                            className="w-full h-14 bg-neutral-50 border border-neutral-100 rounded-xl px-6 text-sm font-medium outline-none"
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <Button
                                            onClick={() => {
                                                setIsEditingBank(false)
                                                toast({ title: "Bank Updated Buddy", description: "Vanthenda paalkara... card locked!" })
                                            }}
                                            className="flex-1 h-14 bg-neutral-900 text-white rounded-xl uppercase tracking-widest text-[11px] font-medium"
                                        >
                                            Lock buddy
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => setIsEditingBank(false)}
                                            className="flex-1 h-14 rounded-xl uppercase tracking-widest text-[11px] font-medium text-neutral-400 border-neutral-100"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    )
}

function AccountHubItem({ icon, label, sub, onClick }: { icon: React.ReactNode, label: string, sub: string, onClickText?: string, onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className="w-full bg-white border border-neutral-100 rounded-2xl p-8 flex items-center justify-between group hover:shadow-md transition-all text-left"
        >
            <div className="flex items-center gap-8">
                <div className="w-14 h-14 bg-neutral-50 rounded-2xl flex items-center justify-center text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-all">
                    {icon}
                </div>
                <div>
                    <div className="text-[11px] font-medium text-neutral-900 uppercase tracking-widest mb-1">{label}</div>
                    <div className="text-[10px] text-neutral-400 font-medium uppercase tracking-widest">{sub}</div>
                </div>
            </div>
            <ChevronRight size={18} className="text-neutral-200 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" />
        </button>
    )
}
