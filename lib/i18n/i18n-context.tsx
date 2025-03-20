"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Language, translations, type TranslationKey } from "./translations"

type I18nContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  // Try to get language from localStorage, default to 'en'
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    // Get language preference from localStorage if available
    const savedLanguage = localStorage.getItem("language") as Language | null
    if (savedLanguage && ["en", "es", "pt"].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0] as Language
      if (["en", "es", "pt"].includes(browserLang)) {
        setLanguageState(browserLang)
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key
  }

  return <I18nContext.Provider value={{ language, setLanguage, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}

