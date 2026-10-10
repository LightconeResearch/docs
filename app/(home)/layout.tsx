import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { Banner } from 'fumadocs-ui/components/banner';
import Link from 'fumadocs-core/link';
import { Rocket } from 'lucide-react';
import { baseOptions } from '@/lib/layout.shared';
import { layers } from '@/components/stack-layers';

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
        // The Quick Start, then each element of the stack, in the order of the
        // overview's layers figure. The logo already says "Lightcone", so the
        // navbar drops it from "Lightcone Lab" and "Lightcone CLI" to fit.
        links={[
          { icon: <Rocket />, text: 'Quick Start', url: '/docs/quickstart' },
          ...layers.map((layer) => ({
            icon: <layer.icon />,
            text: layer.name.replace(/^Lightcone /, ''),
            url: layer.href,
            active: 'nested-url' as const,
          })),
        ]}
      >
        {children}
      </HomeLayout>
    </>
  );
}
