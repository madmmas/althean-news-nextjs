# Locale System Documentation

This project uses a simple locale system for internationalization (i18n) supporting English (en) and Bengali (bn).

## Usage

### 1. Using the Locale Hook in Components

```tsx
'use client';

import { useLocale } from '@/lib/contexts/LocaleContext';

export default function MyComponent() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div>
      <h1>{t.common.home}</h1>
      <button onClick={() => setLocale(locale === 'en' ? 'bn' : 'en')}>
        Switch Language
      </button>
    </div>
  );
}
```

### 2. Available Translation Keys

The translation object `t` has the following structure:

- `t.header.*` - Header-related translations
- `t.menu.*` - Menu item translations
- `t.common.*` - Common translations
- `t.topbar.*` - Topbar slider messages

### 3. Adding New Translations

1. Add the English translation in `lib/locales/en.ts`
2. Add the Bengali translation in `lib/locales/bn.ts`
3. Use the new key in your components with `t.yourCategory.yourKey`

### 4. Language Persistence

The selected language is automatically saved to `localStorage` and persists across page reloads.

### 5. Locale Provider

The `LocaleProvider` is already set up in `app/providers.tsx`, so all components can use the `useLocale` hook.
