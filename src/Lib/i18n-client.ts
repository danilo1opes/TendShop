'use client';

import { useTranslation } from 'react-i18next';
import i18next from '@/utils/i18n';

export function useI18n() {
  return useTranslation();
}

export function changeLanguage(lang: string) {
  i18next.changeLanguage(lang);
}
