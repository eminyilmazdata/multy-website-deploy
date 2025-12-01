'use client';

import { useState, useEffect } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Language, translations } from '@/lib/translations';

export default function Home() {
  const [language, setLanguage] = useState<Language>('nl');

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['nl', 'fr', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      // Default to Dutch for .be domain
      setLanguage('nl');
    }
  }, []);

  // Save language preference to localStorage
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = translations[language];

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
            href="https://www.delcampe.net/nl/verzamelingen/store/multy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-button shop-button"
          >
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {t.webshopButton}
          </a>
        </div>
      </div>
    </main>
  );
}
