'use client';

// import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { LocaleProvider } from '@/lib/contexts/LocaleContext';

export default function Providers({ children }: { children: ReactNode }) {
  // NextAuth needs the basePath to be explicitly set when using basePath in next.config.ts
  // The basePath prop should be the full API path
  // const nextAuthBasePath = basePath ? `${basePath}/api/auth` : '/api/auth';
  
  return (
    // <SessionProvider basePath={nextAuthBasePath}>
    <LocaleProvider>
      {children}
    </LocaleProvider>
    // </SessionProvider>
  );
}

