import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <img src="/img/logo-mark-gold.svg" alt="" className="h-6 w-auto" />
          <span>Lightcone</span>
        </>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
