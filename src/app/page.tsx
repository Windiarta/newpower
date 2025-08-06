'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Language, getTranslation } from '@/lib/i18n'
import { ArrowRight, Package, Building, Users, Phone } from 'lucide-react'

export default function HomePage() {
  const [locale, setLocale] = useState<Language>('id')
  const t = getTranslation(locale)

  const features = [
    {
      icon: Package,
      title: t.home.productCatalog,
      description: t.home.productCatalogDesc
    },
    {
      icon: Building,
      title: t.home.companyProfile,
      description: t.home.companyProfileDesc
    },
    {
      icon: Users,
      title: t.home.contactTeam,
      description: t.home.contactTeamDesc
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t.home.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t.home.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t.home.viewProducts}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <Link
                href="/company"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t.home.learnMore}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t.home.keyFeatures}
            </h2>
            <p className="text-lg text-gray-600">
              {t.home.keyFeaturesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-white rounded-lg shadow-sm border p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t.home.readyToStart}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {t.home.readyToStartDesc}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Phone className="mr-2 h-5 w-5" />
              {t.home.contactUs}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
