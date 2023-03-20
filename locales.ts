import 'server-only';
import type { Locale } from './i18n-config'

const locales = {
  en: () => import('@/locales/en.json').then((module) => module.default),
  es: () => import('@/locales/es.json').then((module) => module.default),
};

export const getLocale = async (locale: Locale) => locales[locale]();
