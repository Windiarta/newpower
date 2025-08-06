import { createContext, useContext } from 'react'
import { Language } from './i18n'

export const LocaleContext = createContext<Language>('id')
export const useLocale = () => useContext(LocaleContext)