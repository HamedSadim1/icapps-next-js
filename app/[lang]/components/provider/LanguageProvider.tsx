// context/LanguageContext.tsx
"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation'
import router from 'next/router';

// Define the context
interface LanguageContextType {
  language: string;
  setLanguage: (newLanguage: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Custom hook to access the context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguagueProviderProps {
  children: ReactNode;

}

// LanguageProvider component
export const LanguageProvider = ({ children }: LanguagueProviderProps) => {
  const [language, setLanguageState] = useState<string>(() => {
    // Retrieve the language from localStorage on component mount
    // Check if window is defined before accessing localStorage
    if (typeof window !== 'undefined') {
      // Retrieve the language from localStorage on component mount
      const storedLanguage = window.localStorage.getItem('language');
      return storedLanguage || 'nl'; // Default to 'en' if not found
    }
    return 'nl'; // Fallback for server-side rendering
  });

  const router = useRouter();

  useEffect(() => {
    // Save the language to localStorage whenever it changes
    localStorage.setItem('language', language);
  }, [language]);
  
  // Set language based on router language on route change
  useEffect(() => {
    if (router) {
      // Assuming `router.locale` contains the current language
      setLanguageState(localStorage.getItem('language') || 'nl'); // Default to 'nl' if not found
    }
  }, [router]);

  const setLanguage: LanguageContextType['setLanguage'] = (newLanguage) => {
    // setLanguageState(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
