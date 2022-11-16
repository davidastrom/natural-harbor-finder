import { createI18n } from 'vue-i18n';

import en from '../locales/en.json';
import se from '../locales/se.json';

export const i18n = createI18n({
  locale: 'se',
  fallbackLocale: 'en',
  messages: {
    en: en,
    se: se,
  },
});
