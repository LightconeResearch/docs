import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { LinkItemType } from 'fumadocs-ui/layouts/shared';
import { Banner } from 'fumadocs-ui/components/banner';
import Link from 'fumadocs-core/link';
import { ArrowUpRight, Rocket } from 'lucide-react';
import { baseOptions } from '@/lib/layout.shared';
import { AstraIcon, layers } from '@/components/stack-layers';

const discordUrl = 'https://discord.gg/EbG6JKuyAx';

// The Quick Start, then the elements of the stack. The logo already says
// "Lightcone", so the navbar drops it from "Lightcone Lab" and "Lightcone CLI"
// to fit. ASTRA links out to its own site, with an arrow to show that it
// leaves the docs.
const navLinks = [
  { icon: <Rocket />, text: 'Quick Start', url: '/docs/quickstart' },
  ...['Agent Skills', 'Lightcone CLI', 'Lightcone Lab', 'MySTRA'].map((name) => {
    const layer = layers.find((layer) => layer.name === name)!;
    return {
      icon: <layer.icon />,
      text: layer.name.replace(/^Lightcone /, ''),
      url: layer.href,
      active: 'nested-url' as const,
    };
  }),
  {
    icon: <AstraIcon />,
    text: (
      <>
        ASTRA
        <ArrowUpRight aria-hidden className="ms-0.5 inline size-3.5" />
      </>
    ),
    url: 'https://astra-spec.org',
    external: true,
  },
];

// The navbar shows a link's `icon` only in the mobile menu, so each link is
// given twice: the menu's with its icon, and the navbar's with the icon in its
// text, shown where the navbar is wide enough for it.
function withIcons({ icon, text, ...link }: (typeof navLinks)[number]): LinkItemType[] {
  return [
    { ...link, icon, text, on: 'menu' },
    {
      ...link,
      on: 'nav',
      text: (
        <span className="inline-flex items-center gap-1.5 [&>span>svg]:size-4">
          <span className="contents max-[68rem]:hidden">{icon}</span>
          {text}
        </span>
      ),
    },
  ];
}

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <Banner id="public-beta">
        Public beta:&nbsp;
        <Link href={discordUrl} className="underline">
          join the Discord channel
        </Link>
        <span className="max-sm:hidden">&nbsp;to tell us what to build next</span>
      </Banner>
      <HomeLayout {...baseOptions()} links={navLinks.flatMap(withIcons)}>
        {children}
      </HomeLayout>
    </>
  );
}
