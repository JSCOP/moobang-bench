import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import en from './en.json';
import ko from './ko.json';

type Language = 'en' | 'ko';
type Dictionary = Record<string, string>;

type I18nValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
};

const dictionaries: Record<Language, Dictionary> = { en, ko };
const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: PropsWithChildren) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    const saved = window.localStorage.getItem('lang');
    if (saved === 'en' || saved === 'ko') {
      setLangState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLang = (next: Language) => {
    setLangState(next);
    window.localStorage.setItem('lang', next);
    document.documentElement.lang = next;
  };

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang,
      t: (key) => dictionaries[lang][key] ?? dictionaries.en[key] ?? key,
    }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used inside I18nProvider');
  return value;
}
