import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Globe } from 'lucide-react';
import { appName, websiteUrl } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <img src="/img/logo-mark-gold.svg" alt="" className="h-6 w-auto" />
          <span className="text-[0.9375rem] font-normal text-ink">{appName}</span>
        </>
      ),
    },
    links: [{ text: 'lightconeresearch.org', url: websiteUrl, icon: <Globe /> }],
  };
}
