'use client';

// import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { getBasePath } from '@/lib/basePath';

export default function Providers({ children }: { children: ReactNode }) {
  const basePath = getBasePath();
  
  // NextAuth needs the basePath to be explicitly set when using basePath in next.config.ts
  // The basePath prop should be the full API path
  // const nextAuthBasePath = basePath ? `${basePath}/api/auth` : '/api/auth';
  
  return (
    // <SessionProvider basePath={nextAuthBasePath}>
    <>
      {children}
    </>
    // </SessionProvider>
  );
}

