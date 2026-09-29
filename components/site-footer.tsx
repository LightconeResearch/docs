import Link from 'next/link';
import { DiscordIcon, GitHubIcon, LinkedInIcon, MailIcon } from '@/components/icons';
import { websiteUrl } from '@/lib/shared';

// The lightconeresearch.org footer, so the docs end the same way the website does.

const website = (path: string) => new URL(path, websiteUrl).href;

const socials = [
  {
    label: 'Lightcone Research on GitHub',
    href: 'https://github.com/LightconeResearch',
    Icon: GitHubIcon,
  },
  {
    label: 'Join Lightcone Research on Discord',
    href: 'https://discord.gg/EbG6JKuyAx',
    Icon: DiscordIcon,
  },
  {
    label: 'Lightcone Research on LinkedIn',
    href: 'https://www.linkedin.com/company/lightconeresearch/about/',
    Icon: LinkedInIcon,
  },
  {
    label: 'Email Lightcone Research',
    href: 'mailto:info@lightconeresearch.org',
    Icon: MailIcon,
  },
];

const columns = [
  {
    heading: 'Project',
    links: [
      { label: 'Team', href: website('/about#people') },
      { label: 'Perspective paper', href: 'https://zenodo.org/records/20181269' },
      { label: 'Careers', href: website('/careers') },
    ],
  },
  {
    heading: 'Build',
    links: [
      { label: 'ASTRA spec', href: 'https://astra-spec.org' },
      { label: 'Lightcone CLI', href: '/docs' },
      { label: 'Projects', href: website('/projects') },
    ],
  },
  {
    heading: 'Community',
    links: [
      { label: 'Blog', href: website('/blog') },
      { label: 'Discord', href: 'https://discord.gg/EbG6JKuyAx' },
      { label: 'GitHub', href: 'https://github.com/LightconeResearch' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t bg-fd-muted">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-start gap-10 px-10 pt-8 pb-6 md:grid-cols-[minmax(0,1.25fr)_minmax(0,2fr)] md:gap-[clamp(2.5rem,6vw,5rem)] md:pt-12">
        <div>
          <div className="mb-5" aria-label="Institutional supporters">
            <p className="mb-4 text-[1.0625rem] leading-[1.55] text-fd-foreground/85">
              An open-source initiative from{' '}
              <strong className="font-semibold text-fd-foreground">UC Berkeley</strong> and{' '}
              <strong className="font-semibold text-fd-foreground">CNRS</strong>, with support
              from <strong className="font-semibold text-fd-foreground">Eric and Wendy Schmidt</strong>.
            </p>
            <div className="inline-flex flex-wrap items-center gap-12">
              <img
                src="/img/berkeley.svg"
                alt="UC Berkeley"
                // A single-colour wordmark, so dark mode renders it in white.
                className="h-9 w-auto opacity-90 transition-opacity hover:opacity-100 md:h-16 dark:brightness-0 dark:invert"
              />
              <span aria-hidden="true" className="inline-block h-10 w-px bg-fd-border" />
              <img
                src="/img/cnrs-blue.png"
                alt="CNRS"
                className="h-11 w-auto opacity-90 transition-opacity hover:opacity-100 md:h-[76px]"
              />
            </div>
          </div>
          <ul className="flex items-center gap-2.5" aria-label="Social channels">
            {socials.map(({ label, href, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
                  aria-label={label}
                  className="inline-flex size-9 items-center justify-center rounded-full border bg-fd-card/60 text-ink transition-colors hover:border-gold hover:bg-fd-card hover:text-gold focus-visible:border-gold focus-visible:text-gold focus-visible:outline-none"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-[clamp(1.5rem,4vw,3rem)]"
        >
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-3.5 border-b pb-2 label-caps text-ink">{col.heading}</h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[0.95rem] text-fd-foreground transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-fd-border/60">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-2 px-10 py-4">
          <p className="text-[0.8125rem] text-fd-muted-foreground">
            {`© ${new Date().getFullYear()} CNRS & The Regents of the University of California`}
          </p>
          <p className="label-caps text-fd-muted-foreground/80">Berkeley &middot; Paris</p>
        </div>
      </div>
    </footer>
  );
}
