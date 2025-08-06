'use client'

import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity'
import { Contact } from '@/types'
import { Language, getTranslation } from '@/lib/i18n'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function ContactPage() {
  const [locale, setLocale] = useState<Language>('id')
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const t = getTranslation(locale)

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const query = `*[_type == "contact"] | order(name asc) {
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
        
        const result = await client.fetch(query)
        setContacts(result)
      } catch (error) {
        console.error('Error fetching contacts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContacts()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t.contact.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.contact.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t.contact.sendMessage}
            </h2>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800">{t.contact.success}</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">{t.contact.error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.contact.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.contact.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.contact.phone}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.contact.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    {t.contact.send}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Persons */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t.contact.contactPerson}
            </h2>

            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                      <div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact._id} className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-start">
                      {contact.image && (
                        <img
                          src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${contact.image.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}`}
                          alt={contact.name}
                          className="w-12 h-12 rounded-full mr-4 object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {locale === 'id' ? contact.name : contact.nameEn}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {locale === 'id' ? contact.position : contact.positionEn}
                        </p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                            <a 
                              href={`mailto:${contact.email}`}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              {contact.email}
                            </a>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                            <a 
                              href={`tel:${contact.phone}`}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              {contact.phone}
                            </a>
                          </div>
                          
                          {contact.whatsapp && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="h-4 w-4 mr-2 text-gray-400" />
                              <a 
                                href={`https://wa.me/${contact.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600 hover:text-green-800"
                              >
                                WhatsApp: {contact.whatsapp}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 