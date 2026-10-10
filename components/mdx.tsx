import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs, TabsContent, TabsList, TabsTrigger } from 'fumadocs-ui/components/tabs';
import { ImageZoom, type ImageZoomProps } from 'fumadocs-ui/components/image-zoom';
import type { MDXComponents } from 'mdx/types';
import { StackDiagram } from '@/components/stack-diagram';
import { StackLayers } from '@/components/stack-layers';
import { ComputeLayers } from '@/components/compute-layers';
import { AgentDemo } from '@/components/agent-demo';
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
    AgentDemo,
    AstraGraph,
    LoopVideo,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
