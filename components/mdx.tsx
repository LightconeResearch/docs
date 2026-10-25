import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs, TabsContent, TabsList, TabsTrigger } from 'fumadocs-ui/components/tabs';
import { ImageZoom, type ImageZoomProps } from 'fumadocs-ui/components/image-zoom';
import type { MDXComponents } from 'mdx/types';
import { StackDiagram } from '@/components/stack-diagram';
import { StackLayers } from '@/components/stack-layers';
import { ComputeLayers } from '@/components/compute-layers';
import { ComputeBackends } from '@/components/compute-backends';
import { TerminalVideo } from '@/components/terminal-video';
import { AstraGraph } from '@/components/astra-graph';
import { LoopVideo } from '@/components/loop-video';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    img: (props) => <ImageZoom {...(props as ImageZoomProps)} />,
    Step,
    Steps,
    Tab,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    StackDiagram,
    StackLayers,
    ComputeLayers,
    ComputeBackends,
    TerminalVideo,
    AstraGraph,
    LoopVideo,
    // Notes for agents: the site shows nothing, the Markdown versions keep them as written.
    ForAgents: () => null,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
