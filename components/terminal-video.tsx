'use client';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

// A terminal recording made with VHS, such as media/agent-demo or
// media/cli-demo, in the site's light and dark themes: `name` is the dark
// recording's path under public/videos, without its extension, and the light
// one adds `-light`. The theme is only known in the browser, so the server
// renders an empty frame of the same size.
export function TerminalVideo({ name, label }: { name: string; label: string }) {
  const { resolvedTheme } = useTheme();
  const [reducedMotion, setReducedMotion] = useState<boolean>();

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const src = `/videos/${name}${resolvedTheme === 'light' ? '-light' : ''}`;
  const ready = resolvedTheme !== undefined && reducedMotion !== undefined;

  return (
    <figure className="not-prose my-6">
      <div className="aspect-[1280/800] overflow-hidden rounded-xl border bg-fd-card">
        {ready && (
          <video
            key={src}
            className="size-full"
            aria-label={label}
            autoPlay={!reducedMotion}
            controls
            loop
            muted
            playsInline
          >
            <source src={`${src}.webm`} type="video/webm" />
            <source src={`${src}.mp4`} type="video/mp4" />
          </video>
        )}
      </div>
    </figure>
  );
}
