'use client'

import { useState } from 'react'
import { Language, getLanguageName } from '@/lib/i18n'
import { Globe } from 'lucide-react'

interface LanguageSwitcherProps {
  currentLocale: Language
  onLocaleChange: (locale: Language) => void
}

export default function LanguageSwitcher({ currentLocale, onLocaleChange }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)

  const languages: Language[] = ['id', 'en']

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Globe className="h-4 w-4" />
        <span>{getLanguageName(currentLocale)}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language}
                onClick={() => {
                  onLocaleChange(language)
                  setIsOpen(false)
                }}
                className={`${
                  currentLocale === language
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-700 hover:bg-gray-100'
                } block w-full text-left px-4 py-2 text-sm`}
              >
                {getLanguageName(language)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 