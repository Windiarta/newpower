export interface Product {
  _id: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  image: {
    asset: {
      _ref: string
    }
  }
  category: string
  categoryEn: string
  price?: number
  features?: string[]
  featuresEn?: string[]
  createdAt: string
  updatedAt: string
}

export interface Company {
  _id: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  logo: {
    asset: {
      _ref: string
    }
  }
  about: string
  aboutEn: string
  vision: string
  visionEn: string
  mission: string
  missionEn: string
  address: string
  addressEn: string
  phone: string
  email: string
  website: string
  socialMedia: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
  }
  updatedAt: string
}

export interface Contact {
  _id: string
  name: string
  nameEn: string
  position: string
  positionEn: string
  email: string
  phone: string
  whatsapp?: string
  image?: {
    asset: {
      _ref: string
    }
  }
}

export interface Category {
  _id: string
  name: string
  nameEn: string
  slug: string
}

export interface Language {
  id: string
  name: string
  flag: string
} 