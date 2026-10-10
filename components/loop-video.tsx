'use client';
import { useEffect, useState } from 'react';

// A muted, looping video, such as the ASTRA walkthrough from astra-spec.org.
// It renders in the browser, where React sets `muted` before playback starts,
// and doesn't autoplay for readers who prefer reduced motion. The server
// renders an empty frame of the same size.
export function LoopVideo({ src, label, width, height }: { src: string; label: string; width: number; height: number }) {
  const [reducedMotion, setReducedMotion] = useState<boolean>();

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <figure className="not-prose my-6">
      <div className="overflow-hidden rounded-xl border bg-fd-card" style={{ aspectRatio: `${width} / ${height}` }}>
        {reducedMotion !== undefined && (
          <video
            className="size-full"
            aria-label={label}
            autoPlay={!reducedMotion}
            controls
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src={src} type="video/mp4" />
          </video>
        )}
      </div>
    </figure>
  );
}
