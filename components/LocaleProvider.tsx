'use client';
import { createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';
import { translator, type Locale } from '@/lib/i18n';
const LocaleContext = createContext<Locale>('en');
export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}
export function useLocale() {
  const locale = useContext(LocaleContext);
  return { locale, t: translator(locale) };
}
export function LanguageSwitcher() {
  const { locale } = useLocale();
  const pathname = usePathname();
  return <nav className="language-switcher" aria-label={locale === 'pt' ? 'Idioma' : 'Language'}>
    {(['en', 'pt'] as const).map(language => <a key={language} href={`/api/locale?locale=${language}&returnTo=${encodeURIComponent(pathname)}`} lang={language === 'pt' ? 'pt-PT' : 'en'} hrefLang={language === 'pt' ? 'pt-PT' : 'en'} aria-current={language === locale ? 'true' : undefined} aria-label={language === 'pt' ? 'Português' : 'English'}>{language.toUpperCase()}</a>)}
  </nav>;
}
