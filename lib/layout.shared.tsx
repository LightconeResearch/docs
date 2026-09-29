import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Globe } from 'lucide-react';
import { gitConfig, websiteUrl } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <img src="/img/logo-mark-gold.svg" alt="" className="h-6 w-auto" />
          <span className="text-ink">Lightcone</span>
        </>
      ),
    },
    links: [{ text: 'lightconeresearch.org', url: websiteUrl, icon: <Globe /> }],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
