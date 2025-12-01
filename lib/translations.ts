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

