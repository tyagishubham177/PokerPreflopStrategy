import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import hi from './locales/hi.json';
import { SOUND_SETTINGS_LS_KEY } from './Constants/StorageKeys';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
};

let initialLang = 'en';
try {
  const saved = localStorage.getItem(SOUND_SETTINGS_LS_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed.language) {
      initialLang = parsed.language;
    }
  }
} catch (e) {
  console.error('Failed to load language from localStorage', e);
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLang,
    fallbackLng: 'en',
    react: { useSuspense: false },
    initImmediate: false,
    interpolation: {
      escapeValue: false,
    },
  });

i18n.changeLanguage(initialLang);

export default i18n;
