"use client";

import { useState, useEffect } from "react";

export interface ParticleData {
  positions: Float32Array;
  alphas: Float32Array;
  count: number;
  aspectRatio: number; // img.height / img.width
}

const EMPTY: ParticleData = {
  positions: new Float32Array(0),
  alphas: new Float32Array(0),
  count: 0,
  aspectRatio: 1,
};

/**
 * Loads an image and returns particle positions + alphas.
 *
 * Normal mode (invert=false): samples bright pixels on a black background.
 * Inverted mode (invert=true): samples dark pixels on a white background —
 *   used for light-mode halftone images where the dots are dark on white.
 */
export function usePortraitParticles(
  imageSrc: string,
  threshold = 30,
  invert = false,
): ParticleData {
  const [data, setData] = useState<ParticleData>(EMPTY);

  useEffect(() => {
    if (!imageSrc) return;

    // Use a larger step on low-end / mobile devices
    const sampleStep =
      typeof navigator !== "undefined" && (navigator.hardwareConcurrency ?? 8) <= 4
        ? 3
        : 2;

    const img = new window.Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      let imageData: ImageData;
      try {
        imageData = ctx.getImageData(0, 0, img.width, img.height);
      } catch {
        // CORS or security error — silently skip
        return;
      }

      const positions: number[] = [];
      const alphas: number[] = [];

      for (let y = 0; y < img.height; y += sampleStep) {
        for (let x = 0; x < img.width; x += sampleStep) {
          const i = (y * img.width + x) * 4;
          const r = imageData.data[i];
          const g = imageData.data[i + 1];
          const b = imageData.data[i + 2];
          // Perceptual luminance
          const brightness = r * 0.299 + g * 0.587 + b * 0.114;
          // Inverted mode: treat darkness as the signal (dark dots on white bg)
          const signal = invert ? 255 - brightness : brightness;

          if (signal > threshold) {
            // Width fills [-0.5, 0.5]; height proportional to image aspect ratio.
            // Viewport-fill scaling is handled by uScale in the vertex shader.
            const px = x / img.width - 0.5;
            const py = -(y / img.height - 0.5) * (img.height / img.width);
            positions.push(px, py, 0);
            alphas.push(signal / 255);
          }
        }
      }

      setData({
        positions: new Float32Array(positions),
        alphas: new Float32Array(alphas),
        count: positions.length / 3,
        aspectRatio: img.height / img.width,
      });
    };

    img.onerror = () => {
      // Image missing — silently leave particles empty (background gradient shows)
    };

    img.src = imageSrc;
  }, [imageSrc, threshold, invert]);

  return data;
}
