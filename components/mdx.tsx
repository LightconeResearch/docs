import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab } from 'fumadocs-ui/components/tabs';
import type { MDXComponents } from 'mdx/types';
import { StackDiagram } from '@/components/stack-diagram';
import { Tabs } from '@/components/tabs';
import { ComputeLayers } from '@/components/compute-layers';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Step,
    Steps,
    Tab,
    Tabs,
    StackDiagram,
    ComputeLayers,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
