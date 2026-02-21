"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
    name: string
    email: string
    phone?: string
    gender?: string
    memberSince: string
    rank: string
    avatar: string
    auraPoints: number
}

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    login: (email: string) => void
    logout: () => void
    updateUser: (data: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        if (typeof window !== 'undefined') {
            const savedUser = localStorage.getItem('shopclone_user')
            if (savedUser) {
                try {
                    return JSON.parse(savedUser)
                } catch (e) {
                    console.error("Failed to parse user from localStorage", e)
                }
            }
            // Default mock user for testing if no user exists
            const mockUser: User = {
                name: "Elite Customer",
                email: "aura@shopclone.com",
                phone: "9876543210",
                gender: "Unspecified",
                memberSince: "February 2026",
                rank: "Platinum Tier",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elite",
                auraPoints: 4250
            }
            return mockUser
        }
        return null
    })

    const login = (phoneOrEmail: string) => {
        const isEmail = phoneOrEmail.includes('@')
        const newUser: User = {
            name: isEmail ? phoneOrEmail.split('@')[0] : "User",
            email: isEmail ? phoneOrEmail : "",
            phone: isEmail ? "" : phoneOrEmail,
            gender: "Unspecified",
            memberSince: "February 2026",
            rank: "New Member",
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${phoneOrEmail}`,
            auraPoints: 0
        }
        setUser(newUser)
        localStorage.setItem('shopclone_user', JSON.stringify(newUser))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('shopclone_user')
    }

    const updateUser = (data: Partial<User>) => {
        setUser(prev => prev ? { ...prev, ...data } : null)
    }

    useEffect(() => {
        if (user) {
            localStorage.setItem('shopclone_user', JSON.stringify(user))
        }
    }, [user])

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            login,
            logout,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
