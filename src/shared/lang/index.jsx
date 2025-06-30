import React, { createContext, useState, useEffect, useContext } from 'react'

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('app-language') || 'ru'
  })

  // Сохраняем язык в localStorage
  useEffect(() => {
    localStorage.setItem('app-language', language)
  }, [language])

  // Обновляем атрибут lang у <html>
  useEffect(() => {
    document.documentElement.setAttribute('lang', language)
  }, [language])

  // Функция для переключения языка
  const toggleLanguage = () => {
    const newLang = language === 'ru' ? 'en' : 'ru'
    setLanguage(newLang)
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Хук для использования контекста
export const useLanguage = () => useContext(LanguageContext)
