'use client'

import { Company, Contact } from '@/types'
import { Language, getTranslation } from '@/lib/i18n'
import { Mail, Phone, MapPin } from 'lucide-react'

interface FooterProps {
  locale: Language
  company: Company | null
  contacts: Contact[]
}

export default function Footer({ locale, company, contacts }: FooterProps) {
  const t = getTranslation(locale)

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {company ? (locale === 'id' ? company.name : company.nameEn) : 'Company Catalog'}
            </h3>
            <p className="text-gray-300 mb-4">
              {company ? (locale === 'id' ? company.description : company.descriptionEn) : t.footer.poweredBy}
            </p>
            {company && (
              <div className="space-y-2 text-sm text-gray-300">
                {company.address && (
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{locale === 'id' ? company.address : company.addressEn}</span>
                  </div>
                )}
                {company.phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{company.phone}</span>
                  </div>
                )}
                {company.email && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{company.email}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  {t.navigation.products}
                </a>
              </li>
              <li>
                <a href="#company" className="hover:text-white transition-colors">
                  {t.navigation.company}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  {t.navigation.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Persons */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.contact.contactPerson}</h3>
            <div className="space-y-3">
              {contacts.slice(0, 3).map((contact) => (
                <div key={contact._id} className="text-sm text-gray-300">
                  <p className="font-medium text-white">
                    {locale === 'id' ? contact.name : contact.nameEn}
                  </p>
                  <p className="text-gray-400">
                    {locale === 'id' ? contact.position : contact.positionEn}
                  </p>
                  <p className="text-gray-300">{contact.email}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>{t.footer.copyright}</p>
          <p className="mt-1">{t.footer.poweredBy}</p>
        </div>
      </div>
    </footer>
  )
} 