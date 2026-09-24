"use client";

import { useEffect, useRef } from "react";

export default function VideoBackground() {
  const videoRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <div
      aria-hidden="true"
      className="scene-root pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover object-[15%_center] sm:object-center"
        src="/painter-park.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
    </div>
  );
}
