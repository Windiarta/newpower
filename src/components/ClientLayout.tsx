'use client'

import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity'
import { Company, Contact } from '@/types'
import { Language } from '@/lib/i18n'
import { LocaleContext } from '@/lib/LocaleContext'
import Header from './Header'
import Footer from './Footer'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [locale, setLocale] = useState<Language>('id')
  const [company, setCompany] = useState<Company | null>(null)
  const [contacts, setContacts] = useState<Contact[]>([])

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const [companyResult, contactsResult] = await Promise.all([
          client.fetch(`*[_type == "company"][0]`),
          client.fetch(`*[_type == "contact"] | order(name asc)`)
        ])
        setCompany(companyResult)
        setContacts(contactsResult)
      } catch (error) {
        console.error('Error fetching global data:', error)
      }
    }
    fetchGlobalData()
  }, [])

  const handleLocaleChange = (newLocale: Language) => {
    setLocale(newLocale)
  }

  return (
    <LocaleContext.Provider value={locale}>
      <div className="min-h-screen flex flex-col">
        <Header 
          locale={locale} 
          onLocaleChange={handleLocaleChange} 
        />
        <main className="flex-1">
          {children}
        </main>
        <Footer 
          locale={locale}
          company={company}
          contacts={contacts}
        />
      </div>
    </LocaleContext.Provider>
  )
} 