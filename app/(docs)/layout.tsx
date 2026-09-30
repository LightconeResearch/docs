import { source } from '@/lib/source';
import { GlassLayout } from 'fumadocs-ui/layouts/glass';
import { getLayoutTabs } from 'fumadocs-ui/layouts/shared';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  const tree = source.getPageTree();
  // The project selector. The default transform stretches each icon to fill its
  // box, which suits the Docs layout's tabs but not Glass's dropdown, so the
  // icons are kept as the loader renders them (as fumadocs.dev does).
  const tabs = getLayoutTabs(tree, { transform: (option) => option });

  return (
    <GlassLayout tree={tree} tabs={tabs} {...baseOptions()}>
      {children}
    </GlassLayout>
  );
}
