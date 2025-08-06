'use client'

import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity'
import { Company } from '@/types'
import { Language, getTranslation } from '@/lib/i18n'
import { MapPin, Phone, Mail, Globe, Building, Target, Award } from 'lucide-react'

export default function CompanyPage() {
  const [locale, setLocale] = useState<Language>('id')
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)
  const t = getTranslation(locale)

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const query = `*[_type == "company"][0] {
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
        
        const result = await client.fetch(query)
        setCompany(result)
      } catch (error) {
        console.error('Error fetching company:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompany()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {t.company.notAvailable}
            </h1>
            <p className="text-gray-600">
              {t.company.notAvailableDesc}
            </p>
          </div>
        </div>
      </div>
    )
  }

  const name = locale === 'id' ? company.name : company.nameEn
  const description = locale === 'id' ? company.description : company.descriptionEn
  const about = locale === 'id' ? company.about : company.aboutEn
  const vision = locale === 'id' ? company.vision : company.visionEn
  const mission = locale === 'id' ? company.mission : company.missionEn
  const address = locale === 'id' ? company.address : company.addressEn

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t.company.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Company Info */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* About */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Building className="h-6 w-6 mr-2 text-blue-600" />
                {t.company.about}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {about}
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-6 w-6 mr-2 text-blue-600" />
                {t.company.contact}
              </h2>
              <div className="space-y-4">
                {address && (
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">{t.company.address}</p>
                      <p className="text-gray-600">{address}</p>
                    </div>
                  </div>
                )}
                
                {company.phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{t.company.phone}</p>
                      <p className="text-gray-600">{company.phone}</p>
                    </div>
                  </div>
                )}
                
                {company.email && (
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{t.company.email}</p>
                      <p className="text-gray-600">{company.email}</p>
                    </div>
                  </div>
                )}
                
                {company.website && (
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{t.company.website}</p>
                      <a 
                        href={company.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {company.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Vision */}
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Target className="h-6 w-6 mr-2 text-green-600" />
              {t.company.vision}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {vision}
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Award className="h-6 w-6 mr-2 text-purple-600" />
              {t.company.mission}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {mission}
            </p>
          </div>
        </div>

        {/* Social Media */}
        {company.socialMedia && (
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t.company.socialMedia}
            </h2>
            <div className="flex space-x-6">
              {company.socialMedia.facebook && (
                <a
                  href={company.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              
              {company.socialMedia.instagram && (
                <a
                  href={company.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-800 transition-colors"
                >
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                  </svg>
                </a>
              )}
              
              {company.socialMedia.twitter && (
                <a
                  href={company.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600 transition-colors"
                >
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              )}
              
              {company.socialMedia.linkedin && (
                <a
                  href={company.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-900 transition-colors"
                >
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 