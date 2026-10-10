import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { Banner } from 'fumadocs-ui/components/banner';
import Link from 'fumadocs-core/link';
import { ArrowUpRight, Rocket } from 'lucide-react';
import { baseOptions } from '@/lib/layout.shared';
import { layers } from '@/components/stack-layers';

// The navbar's links to elements of the stack, by name, in navbar order.
// The logo already says "Lightcone", so the navbar drops it from "Lightcone
// Lab" and "Lightcone CLI" to fit.
const navLayers = ['Agent Skills', 'Lightcone CLI', 'Lightcone Lab'].map((name) => {
  const layer = layers.find((layer) => layer.name === name)!;
  return {
    icon: <layer.icon />,
    text: layer.name.replace(/^Lightcone /, ''),
    url: layer.href,
    active: 'nested-url' as const,
  };
});

const astra = layers.find((layer) => layer.name === 'ASTRA')!;

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <Banner id="public-beta">
        Public beta:&nbsp;
        <Link href="https://github.com/LightconeResearch/lightcone-cli/issues" className="underline">
          tell us what to build next
        </Link>
      </Banner>
      <HomeLayout
        {...baseOptions()}
        // The Quick Start, then elements of the stack. ASTRA links out to its
        // own site, with an arrow to show that it leaves the docs.
        links={[
          { icon: <Rocket />, text: 'Quick Start', url: '/docs/quickstart' },
          ...navLayers,
          {
            icon: <astra.icon />,
            text: (
              <>
                ASTRA
                <ArrowUpRight aria-hidden className="ms-0.5 inline size-3.5" />
              </>
            ),
            url: 'https://astra-spec.org',
            external: true,
          },
        ]}
      >
        {children}
      </HomeLayout>
    </>
  );
}
