export type Language = 'nl' | 'fr' | 'en';

export interface Translations {
  title: string;
  heading: string;
  description: string;
  emailButton: string;
  webshopButton: string;
}

export const translations: Record<Language, Translations> = {
  nl: {
    title: 'Multystamps - Contact',
    heading: 'Neem Contact Op',
    description: 'Neem contact met ons op of bezoek onze webshop',
    emailButton: 'info@multystamps.be',
    webshopButton: 'Bezoek Onze Webshop',
  },
  fr: {
    title: 'Multystamps - Contact',
    heading: 'Contactez-nous',
    description: 'Contactez-nous ou visitez notre boutique en ligne',
    emailButton: 'info@multystamps.be',
    webshopButton: 'Visitez Notre Boutique',
  },
  en: {
    title: 'Multystamps - Contact',
    heading: 'Contact Us',
    description: 'Get in touch with us or visit our webshop',
    emailButton: 'info@multystamps.be',
    webshopButton: 'Visit Our Webshop',
  },
};

export const languageNames: Record<Language, string> = {
  nl: 'Nederlands',
  fr: 'Français',
  en: 'English',
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
  const supportedLanguages: Language[] = ['nl', 'fr', 'en'];

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

