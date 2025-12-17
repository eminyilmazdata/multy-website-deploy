'use client';

import { useState, useEffect } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Language, translations, detectBrowserLanguage } from '@/lib/translations';

export default function Home() {
  const [language, setLanguage] = useState<Language>('nl');

  // Load language preference from localStorage on mount, or detect browser language
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['nl', 'fr', 'en', 'de', 'it', 'es'].includes(savedLanguage)) {
      // Use saved preference if available
      setLanguage(savedLanguage);
    } else {
      // No saved preference - detect browser language
      const browserLanguage = detectBrowserLanguage();
      if (browserLanguage) {
        setLanguage(browserLanguage);
      } else {
        // Fall back to Dutch for .be domain if browser language not supported
        setLanguage('nl');
      }
    }
  }, []);

  // Save language preference to localStorage
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = translations[language];

  // Language-specific URL segments for Delcampe
  const delcampeUrls: Record<Language, string> = {
    nl: 'https://www.delcampe.net/nl/verzamelingen/store/multy',
    fr: 'https://www.delcampe.net/fr/collections/store/multy',
    en: 'https://www.delcampe.net/en_GB/collectables/store/multy',
    de: 'https://www.delcampe.net/de/sammlerobjekte/store/multy',
    it: 'https://www.delcampe.net/it/collezionismo/store/multy',
    es: 'https://www.delcampe.net/es/coleccionismo/store/multy',
  };

  // Catawiki URL with language
  const catawikiUrl = `https://www.catawiki.com/${language}/u/285887-multy`;

  return (
    <main className="container">
      <LanguageSwitcher currentLanguage={language} onLanguageChange={handleLanguageChange} />
      <div className="content">
        <div className="logo">
          <h1>Multystamps</h1>
        </div>
        <div className="message">
          <h2>{t.heading}</h2>
          <p>{t.description}</p>
        </div>
        <div className="contact-links">
          <a 
            href="mailto:info@multystamps.be" 
            className="contact-button email-button"
          >
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {t.emailButton}
          </a>
          <a 
            href={delcampeUrls[language]} 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-button shop-button"
          >
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {t.delcampeButton}
          </a>
          <a 
            href={catawikiUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-button shop-button"
          >
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t.catawikiButton}
          </a>
        </div>
      </div>
    </main>
  );
}
