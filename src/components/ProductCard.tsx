import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { urlFor } from '@/lib/sanity'
import { Product } from '@/types'
import DescriptionModal from './DescriptionModal'

interface ProductCardProps {
  product: Product
  locale: string
}

export default function ProductCard({ product, locale }: ProductCardProps) {
  const name = locale === 'id' ? product.name : product.nameEn
  const description = locale === 'id' ? product.description : product.descriptionEn
  const category = locale === 'id' ? product.category?.title : product.category?.titleEn
  const features = locale === 'id' ? product.features : product.featuresEn
  const images = Array.isArray(product.image) ? product.image : (product.image ? [product.image] : [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const hasMultipleImages = images.length > 1

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

  // Truncate description for display
  const truncatedDescription = description && description.length > 150 
    ? description.substring(0, 150) + '...' 
    : description

  const showPrev = () => {
    if (images.length === 0) return
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const showNext = () => {
    if (images.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        {images.length > 0 && (
          <button
            type="button"
            className="w-full h-full"
            style={{ cursor: 'zoom-in' }}
            onClick={() => {
              // Open modal to show large image
              const imgUrl = urlFor(images[currentIndex]).url()
              const modal = document.createElement('dialog')
              modal.style.padding = '0'
              modal.style.background = 'transparent'
              modal.style.display = 'flex'
              modal.style.justifyContent = 'center'
              modal.style.alignItems = 'center'
              modal.style.position = 'fixed'
              modal.style.top = '0'
              modal.style.left = '0'
              modal.style.width = '100vw'
              modal.style.height = '100vh'
              modal.style.border = 'none'
              modal.style.maxWidth = '100vw'
              modal.style.maxHeight = '100vh'
              modal.style.overflow = 'auto'
              modal.onclick = () => { modal.close(); modal.remove() }
              const img = document.createElement('img')
              img.src = imgUrl
              img.alt = name
              img.style.objectFit = 'contain'
              img.style.maxWidth = '100%'
              img.style.maxHeight = '100%'
              img.style.display = 'block'
              img.style.margin = 'auto'
              img.onclick = (e) => e.stopPropagation()
              modal.appendChild(img)
              document.body.appendChild(modal)
              modal.showModal()
            }}
          >
            <Image
              src={urlFor(images[currentIndex]).url()}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              draggable={false}
            />
          </button>
        )}
        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={showPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 w-8 h-8 rounded-full grid place-items-center shadow"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 w-8 h-8 rounded-full grid place-items-center shadow"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
        
				<h3 className="text-xl font-semibold text-gray-900 mb-2 ">
          {name}
        </h3>
        
				<div className="text-gray-600 text-sm mb-4 leading-relaxed">
          {truncatedDescription ? renderTextWithLineBreaks(truncatedDescription) : null}
          {description && description.length > 150 && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-blue-600 hover:text-blue-800 font-medium ml-1"
            >
              {locale === 'id' ? 'Baca selengkapnya' : 'Read more'}
            </button>
          )}
        </div>
        
        {product.price && (
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-blue-600">
              ${product.price.toLocaleString()}
            </span>
          </div>
        )}
        
        {features && features.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <DescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={name}
        description={description || ''}
        locale={locale}
      />
    </div>
  )
} 