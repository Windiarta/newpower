'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Language, getTranslation } from '@/lib/i18n'
import { client } from '@/lib/sanity'
import { Company, Contact } from '@/types'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [locale, setLocale] = useState<Language>('id')
  const [company, setCompany] = useState<Company | null>(null)
  const [contacts, setContacts] = useState<Contact[]>([])
  const t = getTranslation(locale)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch company
        const companyQuery = `*[_type == "company"][0] {
          _id,
          name,
          nameEn,
          description,
          descriptionEn,
          logo,
          about,
          aboutEn,
          vision,
          visionEn,
          mission,
          missionEn,
          address,
          addressEn,
          phone,
          email,
          website,
          socialMedia,
          updatedAt
        }`
        
        // Fetch contacts
        const contactsQuery = `*[_type == "contact"] | order(name asc) {
          _id,
          name,
          nameEn,
          position,
          positionEn,
          email,
          phone,
          whatsapp,
          image
        }`
        
        const [companyResult, contactsResult] = await Promise.all([
          client.fetch(companyQuery),
          client.fetch(contactsQuery)
        ])
        
        setCompany(companyResult)
        setContacts(contactsResult)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={locale} onLanguageChange={setLocale} t={t} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer company={company} contacts={contacts} t={t} />
    </div>
  )
} 