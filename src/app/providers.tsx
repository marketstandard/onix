'use client';

import * as React from 'react';
import { NextUIProvider } from '@nextui-org/system';
// import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/navigation';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: any;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return <NextUIProvider navigate={router.push}>{children}</NextUIProvider>;
}
