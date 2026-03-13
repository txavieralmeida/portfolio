"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

// Only load the WebGL scene on the client
const ParticleScene = dynamic(() => import("./particle-scene"), { ssr: false });

// ---------------------------------------------------------------------------
// WebGL capability check — runs only on the client
// ---------------------------------------------------------------------------

function checkWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

// useSyncExternalStore avoids the setState-in-effect ESLint rule
// while correctly handling SSR (server returns false, client returns true)
const subscribe = () => () => {};

// ---------------------------------------------------------------------------

interface ParticlePortraitProps {
  imageSrc: string;
  className?: string;
}

export function ParticlePortrait({ imageSrc, className }: ParticlePortraitProps) {
  const webglSupported = useSyncExternalStore(
    subscribe,
    checkWebGL,
    () => false, // SSR snapshot
  );

  if (!webglSupported) return null;

  return (
    <div className={cn("w-full h-full", className)} aria-hidden="true">
      <ParticleScene imageSrc={imageSrc} />
    </div>
  );
}
