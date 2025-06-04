import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import hi from './locales/hi.json';
import { LANGUAGE_LS_KEY } from './Constants/StorageKeys';

let savedLanguage = 'en';
try {
  const stored = localStorage.getItem(LANGUAGE_LS_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    if (parsed && parsed.language) {
      savedLanguage = parsed.language;
    } else if (typeof stored === 'string' && stored.length <= 4) {
      savedLanguage = stored;
    }
  }
} catch (e) {
  // ignore parse errors
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
    },
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
