"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '@/data/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    // Try to load from localStorage, default to 'en'
    const [language, setLanguageState] = useState<Language>('en');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const saved = localStorage.getItem('deeshora-lang') as Language;
        if (saved && (saved === 'en' || saved === 'ta' || saved === 'mm')) {
            setLanguageState(saved);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        if (isClient) {
            localStorage.setItem('deeshora-lang', lang);
        }
    };

    const t = (key: string): string => {
        const translation = translations[key];
        if (!translation) {
            console.warn(`Translation missing for key: ${key}`);
            return key; // Fallback to key itself
        }
        // Fallback to English if translation is somehow missing (though TS prevents this in the object)
        return translation[language] || translation['en'];
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
