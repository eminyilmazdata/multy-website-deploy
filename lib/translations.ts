export type Language = 'nl' | 'fr' | 'en' | 'de' | 'it' | 'es';

export interface Translations {
  title: string;
  heading: string;
  description: string;
  emailButton: string;
  delcampeButton: string;
  catawikiButton: string;
}

export const translations: Record<Language, Translations> = {
  nl: {
    title: 'Multystamps - Contact',
    heading: 'Neem Contact Op',
    description: 'Neem contact met ons op of bezoek onze webshop',
    emailButton: 'info@multystamps.be',
    delcampeButton: 'Onze Delcampe Webshop',
    catawikiButton: 'Onze Catawiki Veilingen',
  },
  fr: {
    title: 'Multystamps - Contact',
    heading: 'Contactez-nous',
    description: 'Contactez-nous ou visitez notre boutique en ligne',
    emailButton: 'info@multystamps.be',
    delcampeButton: 'Notre Boutique Delcampe',
    catawikiButton: 'Nos Ventes Catawiki',
  },
  en: {
    title: 'Multystamps - Contact',
    heading: 'Contact Us',
    description: 'Get in touch with us or visit our webshop',
    emailButton: 'info@multystamps.be',
    delcampeButton: 'Our Delcampe Webshop',
    catawikiButton: 'Our Catawiki Auctions',
  },
  de: {
    title: 'Multystamps - Kontakt',
    heading: 'Kontaktieren Sie uns',
    description: 'Nehmen Sie Kontakt mit uns auf oder besuchen Sie unseren Webshop',
    emailButton: 'info@multystamps.be',
    delcampeButton: 'Unser Delcampe Webshop',
    catawikiButton: 'Unsere Catawiki Auktionen',
  },
  it: {
    title: 'Multystamps - Contatto',
    heading: 'Contattaci',
    description: 'Mettiti in contatto con noi o visita il nostro negozio online',
    emailButton: 'info@multystamps.be',
    delcampeButton: 'Il nostro negozio Delcampe',
    catawikiButton: 'Le nostre aste Catawiki',
  },
  es: {
    title: 'Multystamps - Contacto',
    heading: 'Contáctenos',
    description: 'Póngase en contacto con nosotros o visite nuestra tienda en línea',
    emailButton: 'info@multystamps.be',
    delcampeButton: 'Nuestra tienda Delcampe',
    catawikiButton: 'Nuestras subastas Catawiki',
  },
};

export const languageNames: Record<Language, string> = {
  nl: 'Nederlands',
  fr: 'Français',
  en: 'English',
  de: 'Deutsch',
  it: 'Italiano',
  es: 'Español',
};

/**
 * Detects the user's browser language and maps it to a supported language.
 * Checks navigator.language and navigator.languages in priority order.
 * Returns null if no supported language is found.
 */
export function detectBrowserLanguage(): Language | null {
  // Check if navigator is available (SSR safety)
  if (typeof window === 'undefined' || !navigator) {
    return null;
  }

  // Get all browser languages, starting with the primary one
  const browserLanguages: string[] = [];
  if (navigator.language) {
    browserLanguages.push(navigator.language);
  }
  if (navigator.languages && Array.isArray(navigator.languages)) {
    browserLanguages.push(...navigator.languages);
  }

  // Supported language codes
  const supportedLanguages: Language[] = ['nl', 'fr', 'en', 'de', 'it', 'es'];

  // Check each browser language in priority order
  for (const browserLang of browserLanguages) {
    // Extract primary language code (e.g., 'nl-BE' → 'nl', 'fr-FR' → 'fr')
    const primaryLang = browserLang.toLowerCase().split('-')[0];

    // Check if it matches any supported language
    if (supportedLanguages.includes(primaryLang as Language)) {
      return primaryLang as Language;
    }
  }

  // No match found
  return null;
}

