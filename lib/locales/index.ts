import { en } from './en';
import { bn } from './bn';

export type Locale = 'en' | 'bn';

export const translations = {
  en,
  bn,
};

export type TranslationKey = keyof typeof en;
