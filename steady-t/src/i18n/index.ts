import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from '../../assets/i18n/en.json';

let initialized = false;

export function initI18n() {
  if (initialized) return i18n;
  initialized = true;
  const locale = Localization.getLocales()[0]?.languageCode ?? 'en';
  i18n
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v4',
      lng: locale,
      fallbackLng: 'en',
      resources: { en: { translation: en } },
      interpolation: { escapeValue: false },
    });
  return i18n;
}

export default i18n;