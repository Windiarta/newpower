'use client'

import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'

interface SearchAndFilterProps {
  onSearch: (query: string) => void
  onFilter: (category: string, sortBy: string) => void
  categories: string[]
  t: Record<string, any>
}

export default function SearchAndFilter({ onSearch, onFilter, categories, t }: SearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onSearch(query)
  }

  const handleFilter = () => {
    onFilter(selectedCategory, sortBy)
  }

  const clearFilters = () => {
    setSelectedCategory('')
    setSortBy('')
    onFilter('', '')
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder={t.products.search}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Filter className="h-4 w-4" />
          <span>{t.products.filter}</span>
        </button>

        {(selectedCategory || sortBy) && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-2 px-3 py-1 text-sm text-red-600 hover:text-red-700"
          >
            <X className="h-4 w-4" />
            <span>{t.products.clearFilters}</span>
          </button>
        )}
      </div>

      {/* Filter Options */}
      {isFilterOpen && (
        <div className="border-t pt-4 space-y-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.products.category}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">{t.products.allProducts}</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.products.sortBy}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">{t.products.name}</option>
              <option value="price-low">{t.products.priceLow}</option>
              <option value="price-high">{t.products.priceHigh}</option>
              <option value="newest">{t.products.newest}</option>
              <option value="oldest">{t.products.oldest}</option>
            </select>
          </div>

          {/* Apply Filter Button */}
          <button
            onClick={handleFilter}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t.products.applyFilters}
          </button>
        </div>
      )}
    </div>
  )
} 