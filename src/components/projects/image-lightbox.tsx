"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { VisuallyHidden } from "radix-ui";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ImageLightboxProps {
  src: string;
  alt: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 8;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function ImageLightbox({ src, alt, open, onOpenChange }: ImageLightboxProps) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const [prevOpen, setPrevOpen] = useState(open);

  // Reset zoom/pan when dialog opens — derived state pattern avoids setState-in-effect
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setScale(1);
      setOffset({ x: 0, y: 0 });
      setIsInteracting(false);
    }
  }
  const containerRef = useRef<HTMLDivElement>(null);

  // Track drag state
  const drag = useRef<{ active: boolean; startX: number; startY: number; originX: number; originY: number }>({
    active: false, startX: 0, startY: 0, originX: 0, originY: 0,
  });

  // Track pinch state
  const pinch = useRef<{ active: boolean; startDist: number; startScale: number }>({
    active: false, startDist: 0, startScale: 1,
  });

  const constrainOffset = useCallback((x: number, y: number, s: number) => {
    const el = containerRef.current;
    if (!el) return { x, y };
    const maxX = (el.clientWidth * (s - 1)) / 2;
    const maxY = (el.clientHeight * (s - 1)) / 2;
    return { x: clamp(x, -maxX, maxX), y: clamp(y, -maxY, maxY) };
  }, []);

  // Wheel zoom
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
    setScale((prev) => {
      const next = clamp(prev * factor, MIN_SCALE, MAX_SCALE);
      setOffset((off) => constrainOffset(off.x, off.y, next));
      return next;
    });
  }, [constrainOffset]);

  // Mouse drag
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale <= 1) return;
    e.preventDefault();
    drag.current = { active: true, startX: e.clientX, startY: e.clientY, originX: offset.x, originY: offset.y };
    setIsInteracting(true);
  }, [scale, offset]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    const dy = e.clientY - drag.current.startY;
    setOffset(constrainOffset(drag.current.originX + dx, drag.current.originY + dy, scale));
  }, [scale, constrainOffset]);

  const onMouseUp = useCallback(() => { drag.current.active = false; setIsInteracting(false); }, []);

  // Touch handlers
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinch.current = { active: true, startDist: Math.hypot(dx, dy), startScale: scale };
      setIsInteracting(true);
    } else if (e.touches.length === 1 && scale > 1) {
      drag.current = {
        active: true,
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        originX: offset.x,
        originY: offset.y,
      };
      setIsInteracting(true);
    }
  }, [scale, offset]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinch.current.active) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const next = clamp(pinch.current.startScale * (dist / pinch.current.startDist), MIN_SCALE, MAX_SCALE);
      setScale(next);
      setOffset((off) => constrainOffset(off.x, off.y, next));
    } else if (e.touches.length === 1 && drag.current.active) {
      const dx = e.touches[0].clientX - drag.current.startX;
      const dy = e.touches[0].clientY - drag.current.startY;
      setOffset(constrainOffset(drag.current.originX + dx, drag.current.originY + dy, scale));
    }
  }, [scale, constrainOffset]);

  const onTouchEnd = useCallback(() => {
    pinch.current.active = false;
    drag.current.active = false;
    setIsInteracting(false);
    if (scale < 1.05) {
      setScale(1);
      setOffset({ x: 0, y: 0 });
    }
  }, [scale]);

  // Double-click to toggle zoom
  const onDoubleClick = useCallback(() => {
    if (scale > 1) {
      setScale(1);
      setOffset({ x: 0, y: 0 });
    } else {
      setScale(2.5);
    }
  }, [scale]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[98vw] max-w-[98vw] sm:max-w-[98vw] h-[95vh] p-0 border-0 bg-black [&>button]:text-white [&>button]:top-3 [&>button]:right-3 [&>button]:z-50 overflow-hidden">
        <VisuallyHidden.Root>
          <DialogTitle>{alt}</DialogTitle>
        </VisuallyHidden.Root>
        <div
          ref={containerRef}
          className="w-full h-full overflow-hidden flex items-center justify-center"
          style={{ cursor: scale > 1 ? "grab" : "zoom-in" }}
          onWheel={onWheel}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onDoubleClick={onDoubleClick}
        >
          <div
            className="relative w-full h-full"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
              transformOrigin: "center",
              transition: isInteracting ? "none" : "transform 0.15s ease",
              willChange: "transform",
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              sizes="98vw"
              draggable={false}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
