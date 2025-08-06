'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Globe } from 'lucide-react'
import { Language, getLanguageName } from '@/lib/i18n'

interface HeaderProps {
  locale: Language
  onLanguageChange: (locale: Language) => void
  t: Record<string, any>
}

export default function Header({ locale, onLanguageChange, t }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: t.navigation.home, href: '/' },
    { name: t.navigation.products, href: '/products' },
    { name: t.navigation.company, href: '/company' },
    { name: t.navigation.contact, href: '/contact' },
  ]

  const languages: { code: Language; name: string }[] = [
    { code: 'id', name: 'Indonesia' },
    { code: 'en', name: 'English' },
  ]

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Company Catalog
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  pathname === item.href
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-900'
                } px-3 py-2 text-sm font-medium transition-colors`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Selector */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                <Globe className="h-4 w-4" />
                <span>{getLanguageName(locale)}</span>
              </button>

              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code)
                        setIsLanguageOpen(false)
                      }}
                      className={`${
                        locale === lang.code
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      } block w-full text-left px-4 py-2 text-sm`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-900"
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-500 hover:text-gray-900'
                  } block px-3 py-2 text-base font-medium`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Language Selector */}
              <div className="px-3 py-2">
                <div className="text-sm font-medium text-gray-500 mb-2">
                  Language
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code)
                      setIsMenuOpen(false)
                    }}
                    className={`${
                      locale === lang.code
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    } block w-full text-left px-3 py-2 text-sm rounded-md`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 