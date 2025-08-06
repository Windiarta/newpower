'use client'

import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity'
import { Product } from '@/types'
import ProductCard from '@/components/ProductCard'
import SearchAndFilter from '@/components/SearchAndFilter'
import { Language, getTranslation } from '@/lib/i18n'

export default function ProductsPage() {
  const [locale, setLocale] = useState<Language>('id')
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('')
  const t = getTranslation(locale)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product"] | order(createdAt desc) {
          _id,
          name,
          nameEn,
          description,
          descriptionEn,
          category,
          categoryEn,
          price,
          features,
          featuresEn,
          image,
          createdAt,
          updatedAt
        }`
        
        const result = await client.fetch(query)
        setProducts(result)
        setFilteredProducts(result)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Get unique categories
  const categories = [...new Set(products.map(product => 
    locale === 'id' ? product.category : product.categoryEn
  ))]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterProducts(query, selectedCategory, sortBy)
  }

  const handleFilter = (category: string, sort: string) => {
    setSelectedCategory(category)
    setSortBy(sort)
    filterProducts(searchQuery, category, sort)
  }

  const filterProducts = (search: string, category: string, sort: string) => {
    let filtered = [...products]

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(product => {
        const name = locale === 'id' ? product.name : product.nameEn
        const description = locale === 'id' ? product.description : product.descriptionEn
        return name.toLowerCase().includes(searchLower) || 
               description.toLowerCase().includes(searchLower)
      })
    }

    // Category filter
    if (category) {
      filtered = filtered.filter(product => {
        const productCategory = locale === 'id' ? product.category : product.categoryEn
        return productCategory === category
      })
    }

    // Sort
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
        // Sort by name
        filtered.sort((a, b) => {
          const nameA = locale === 'id' ? a.name : a.nameEn
          const nameB = locale === 'id' ? b.name : b.nameEn
          return nameA.localeCompare(nameB)
        })
    }

    setFilteredProducts(filtered)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t.products.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.products.description}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <SearchAndFilter
            onSearch={handleSearch}
            onFilter={handleFilter}
            categories={categories}
            t={t}
          />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredProducts.length} {t.products.productsFound}
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
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
  )
} 