'use client';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

// A replay of a Claude Code session using the stack, recorded with VHS from
// media/agent-demo in the site's light and dark themes. The theme is only
// known in the browser, so the server renders an empty frame of the same size.
export function AgentDemo() {
  const { resolvedTheme } = useTheme();
  const [reducedMotion, setReducedMotion] = useState<boolean>();

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const name = resolvedTheme === 'light' ? 'agent-light' : 'agent';
  const ready = resolvedTheme !== undefined && reducedMotion !== undefined;

  return (
    <figure className="not-prose my-6">
      <div className="aspect-[1280/800] overflow-hidden rounded-xl border bg-fd-card">
        {ready && (
          <video
            key={name}
            className="size-full"
            aria-label="Claude Code scopes a supernova analysis with the user, writes it into astra.yaml, then runs it with lc."
            autoPlay={!reducedMotion}
            controls
            loop
            muted
            playsInline
          >
            <source src={`/videos/agent-demo/${name}.webm`} type="video/webm" />
            <source src={`/videos/agent-demo/${name}.mp4`} type="video/mp4" />
          </video>
        )}
      </div>
    </figure>
  );
}
