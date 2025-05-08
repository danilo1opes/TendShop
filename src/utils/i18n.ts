import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import pt from '../locales/pt/ common.json';
import en from '../locales/en/ common.json';

i18next.use(initReactI18next).init({
  fallbackLng: 'pt',
  supportedLngs: ['en', 'pt'],
  lng: 'pt',
  resources: {
    pt: { translation: pt },
    en: { translation: en },
  },
});

export default i18next;
