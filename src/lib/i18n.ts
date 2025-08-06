import id from '@/locales/id.json'
import en from '@/locales/en.json'

export const languages = {
  id: 'id',
  en: 'en'
} as const

export type Language = keyof typeof languages

export const translations = {
  id,
  en
}

export function getTranslation(locale: Language) {
  return translations[locale]
}

export function getLanguageName(locale: Language) {
  const names = {
    id: 'Indonesia',
    en: 'English'
  }
  return names[locale]
} 