import { Tabs as BaseTabs, TabsList, TabsTrigger } from 'fumadocs-ui/components/tabs';
import type { ComponentProps } from 'react';

type TabsProps = ComponentProps<typeof BaseTabs> & {
  // Items that are on the way: shown greyed out in their place, and not selectable.
  soon?: string[];
};

// How Fumadocs turns an item into a tab value, so each `<Tab value>` still finds its trigger.
const escapeValue = (v: string) => v.toLowerCase().replace(/\s/, '-');

// Fumadocs' Tabs, with greyed-out `soon` tabs for agents and hosts that aren't ready yet.
export function Tabs({ items, soon, defaultIndex = 0, children, ...props }: TabsProps) {
  if (!soon?.length || !items) {
    return (
      <BaseTabs items={items} defaultIndex={defaultIndex} {...props}>
        {children}
      </BaseTabs>
    );
  }

  const ready = items.filter((item) => !soon.includes(item));
  return (
    <BaseTabs defaultValue={escapeValue(ready[defaultIndex])} {...props}>
      <TabsList>
        {items.map((item) =>
          soon.includes(item) ? (
            <TabsTrigger
              key={item}
              value={escapeValue(item)}
              disabled
              className="cursor-not-allowed data-[disabled]:opacity-50"
            >
              {item} (soon)
            </TabsTrigger>
          ) : (
            <TabsTrigger key={item} value={escapeValue(item)}>
              {item}
            </TabsTrigger>
          ),
        )}
      </TabsList>
      {children}
    </BaseTabs>
  );
}
