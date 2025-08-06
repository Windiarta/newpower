import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
  locale: string
}

export default function ProductCard({ product, locale }: ProductCardProps) {
  const name = locale === 'id' ? product.name : product.nameEn
  const description = locale === 'id' ? product.description : product.descriptionEn
  const category = locale === 'id' ? product.category : product.categoryEn
  const features = locale === 'id' ? product.features : product.featuresEn

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        {product.image && (
          <Image
            src={urlFor(product.image).url()}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {description}
        </p>
        
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
    </div>
  )
} 