'use client';
import SearchDialog from '@/components/search';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { type ReactNode } from 'react';

export function Provider({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      search={{ SearchDialog }}
      theme={{
        // Light by default like lightconeresearch.org, with a dark toggle.
        defaultTheme: 'light',
        enableSystem: false,
        // Fumadocs styles key off the `.dark` class; the brand tokens key off
        // `data-lightcone-color-scheme`.
        attribute: ['class', 'data-lightcone-color-scheme'],
      }}
    >
      {children}
    </RootProvider>
  );
}
