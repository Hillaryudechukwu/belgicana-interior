import portuguese from './locales/pt.json';
export type Locale = 'en' | 'pt';
export function translator(locale: Locale) {
  return (text: string): string => locale === 'pt' ? (portuguese as Record<string, string>)[text] ?? text : text;
}
export function localize<T>(value: T, locale: Locale): T {
  const t = translator(locale);
  if (typeof value === 'string') return t(value) as T;
  if (Array.isArray(value)) return value.map(item => localize(item, locale)) as T;
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localize(item, locale)])) as T;
  return value;
}
