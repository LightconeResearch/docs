import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // The primary logo; in dark mode, a copy with RESEARCH in parchment
      // rather than Blue Ink, which would not read on charcoal.
      title: (
        <>
          <img
            src="/img/logo-primary.svg"
            alt="Lightcone Research"
            className="h-5 w-auto dark:hidden"
          />
          <img
            src="/img/logo-primary-dark.svg"
            alt="Lightcone Research"
            className="hidden h-5 w-auto dark:block"
          />
        </>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
