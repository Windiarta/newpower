'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Language, getTranslation } from '@/lib/i18n'
import { Menu, X, Globe } from 'lucide-react'

interface HeaderProps {
  locale: Language
  onLocaleChange: (locale: Language) => void
}

export default function Header({ locale, onLocaleChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = getTranslation(locale)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLocaleChange = (newLocale: Language) => {
    onLocaleChange(newLocale)
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              {t.navigation.home}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-gray-400" />
              <button
                onClick={() => handleLocaleChange('id')}
                className={`px-2 py-1 text-sm rounded transition-colors ${
                  locale === 'id'
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                ID
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => handleLocaleChange('en')}
                className={`px-2 py-1 text-sm rounded transition-colors ${
                  locale === 'en'
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                EN
              </button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t">
              {/* Language Switcher */}
              <div className="flex items-center space-x-2 px-3 py-2">
                <Globe className="h-4 w-4 text-gray-400" />
                <button
                  onClick={() => handleLocaleChange('id')}
                  className={`px-2 py-1 text-sm rounded transition-colors ${
                    locale === 'id'
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  ID
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => handleLocaleChange('en')}
                  className={`px-2 py-1 text-sm rounded transition-colors ${
                    locale === 'en'
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 