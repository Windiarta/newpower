'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { client } from '@/lib/sanity'
import { Product, Company, Contact } from '@/types'
import { getTranslation } from '@/lib/i18n'
import { useLocale } from '@/lib/LocaleContext'
import ProductCard from '@/components/ProductCard'
import DescriptionModal from '@/components/DescriptionModal'
import { ArrowRight, Package, Building, Users, Phone, Mail, MapPin, Globe, Target, Award } from 'lucide-react'

const PRODUCTS_PER_PAGE = 9;

export default function HomePage() {
  const locale = useLocale()
  const [products, setProducts] = useState<Product[]>([])
  const [company, setCompany] = useState<Company | null>(null)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false)
  const t = getTranslation(locale)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResult, companyResult, contactsResult] = await Promise.all([
          client.fetch(`*[_type == "product"] {
            _id,
            name,
            nameEn,
            description,
            descriptionEn,
            category->{
              _id,
              title,
              titleEn
            },
            price,
            image,
            features,
            featuresEn,
            createdAt
          } | order(createdAt desc)`),
          client.fetch(`*[_type == "company"][0]`),
          client.fetch(`*[_type == "contact"] | order(name asc)`)
        ])
        setProducts(productsResult)
        setFilteredProducts(productsResult)
        setCompany(companyResult)
        setContacts(contactsResult)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    setCurrentPage(1)
    filterProducts(searchQuery, selectedCategory, sortBy)
    // eslint-disable-next-line
  }, [products, locale])

  const categories = [...new Set(products.map(product => 
    locale === 'id' ? product.category?.title : product.category?.titleEn
  ).filter(Boolean))]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
    filterProducts(query, selectedCategory, sortBy)
  }

  const handleFilter = (category: string, sort: string) => {
    setSelectedCategory(category)
    setSortBy(sort)
    setCurrentPage(1)
    filterProducts(searchQuery, category, sort)
  }

  const filterProducts = (search: string, category: string, sort: string) => {
    let filtered = [...products]
    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(product => {
        const name = locale === 'id' ? product.name : product.nameEn
        const description = locale === 'id' ? product.description : product.descriptionEn
        return name.toLowerCase().includes(searchLower) || 
               description.toLowerCase().includes(searchLower)
      })
    }
    if (category) {
      filtered = filtered.filter(product => {
        const productCategory = locale === 'id' ? product.category?.title : product.category?.titleEn
        return productCategory === category
      })
    }
    switch (sort) {
      case 'price-low':
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0))
        break
      case 'price-high':
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0))
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      default:
        filtered.sort((a, b) => {
          const nameA = locale === 'id' ? a.name : a.nameEn
          const nameB = locale === 'id' ? b.name : b.nameEn
          return nameA.localeCompare(nameB)
        })
    }
    setFilteredProducts(filtered)
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="animate-pulse">
          <div className="h-16 bg-white border-b"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-3">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-64 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t.home.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t.home.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#products" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                {t.home.viewProducts}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a href="#company" className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                {t.home.learnMore}
              </a>
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

      {/* Products Section */}
      <div id="products" className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t.products.filter}
                </h3>
                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    {t.products.category}
                  </h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleFilter('', sortBy)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === ''
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {t.products.allProducts}
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleFilter(category, sortBy)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === category
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Sort Options */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    {t.products.sortBy}
                  </h4>
                  <div className="space-y-2">
                    {[
                      { value: '', label: t.products.name },
                      { value: 'price-low', label: t.products.priceLow },
                      { value: 'price-high', label: t.products.priceHigh },
                      { value: 'newest', label: t.products.newest },
                      { value: 'oldest', label: t.products.oldest }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleFilter(selectedCategory, option.value)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          sortBy === option.value
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t.products.search}
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                  <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-gray-600">
                  {filteredProducts.length} {t.products.productsFound}
                </p>
              </div>
              {/* Products Grid */}
              {paginatedProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {paginatedProducts.map((product) => (
                      <ProductCard key={product._id} product={product} locale={locale} />
                    ))}
                  </div>
                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-8">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                      >
                        {t.products.previous || 'Previous'}
                      </button>
                      <span className="text-gray-700">
                        {t.products.pageOf
                          ? t.products.pageOf.replace('{current}', String(currentPage)).replace('{total}', String(totalPages))
                          : `Page ${currentPage} of ${totalPages}`}
                      </span>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                      >
                        {t.products.next || 'Next'}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Package className="mx-auto h-12 w-12" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {t.products.noProducts}
                  </h3>
                  <p className="text-gray-600">
                    {t.products.noProductsDesc}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Company Section */}
      <div id="company" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {company ? (
            <>
              {/* Company Info */}
              <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* About */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <Building className="h-6 w-6 mr-2 text-blue-600" />
                      {t.company.about}
                    </h2>
                    <div className="text-gray-600 leading-relaxed">
                      {(() => {
                        const aboutText = locale === 'id' ? company.about : company.aboutEn
                        const truncatedAbout = aboutText && aboutText.length > 300 
                          ? aboutText.substring(0, 600) + '...' 
                          : aboutText
                        
                        // Function to render text with line breaks
                        const renderTextWithLineBreaks = (text: string) => {
                          if (!text) return null
                          
                          return text.split('\n').map((line, index) => (
                            <span key={index}>
                              {line}
                              {index < text.split('\n').length - 1 && <br />}
                            </span>
                          ))
                        }
                        
                        return (
                          <>
                            {truncatedAbout ? renderTextWithLineBreaks(truncatedAbout) : null}
                            {aboutText && aboutText.length > 300 && (
                              <button
                                onClick={() => setIsCompanyModalOpen(true)}
                                className="text-blue-600 hover:text-blue-800 font-medium ml-1"
                              >
                                {locale === 'id' ? 'Baca selengkapnya' : 'Read more'}
                              </button>
                            )}
                          </>
                        )
                      })()}
                    </div>
                  </div>
                  {/* Contact Info */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <MapPin className="h-6 w-6 mr-2 text-blue-600" />
                      {t.company.contact}
                    </h2>
                    <div className="space-y-4">
                      {company.address && (
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-900">{t.company.address}</p>
                            <p className="text-gray-600">
                              {locale === 'id' ? company.address : company.addressEn}
                            </p>
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
              
            </>
          ) : (
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {t.company.notAvailable}
              </h1>
              <p className="text-gray-600">
                {t.company.notAvailableDesc}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Persons */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t.contact.contactPerson}
              </h2>
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact._id} className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-start">
                      {contact.image && (
                        <Image
                          src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${contact.image.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png')}`}
                          alt={contact.name}
                          width={48}
                          height={48}
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
            </div>
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
          </div>
        </div>
      </div>
      
      {/* Company Description Modal */}
      {company && (
        <DescriptionModal
          isOpen={isCompanyModalOpen}
          onClose={() => setIsCompanyModalOpen(false)}
          title={t.company.about}
          description={locale === 'id' ? company.about : company.aboutEn || ''}
          locale={locale}
        />
      )}
    </div>
  )
}
