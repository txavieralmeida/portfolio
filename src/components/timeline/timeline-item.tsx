"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Briefcase, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import type { TimelineItem } from "@/types/cv";

interface TimelineNodeProps {
  item: TimelineItem;
  /** card sits above the rail */
  above: boolean;
  /** sweeping line has passed this node */
  isRevealed: boolean;
  /** horizontal position in viewport percent */
  xPct: number;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "Present";
  const [year, month] = dateStr.split("-");
  return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}

function formatYear(dateStr: string | null): string {
  if (!dateStr) return "Now";
  return dateStr.split("-")[0];
}

export function TimelineNode({ item, above, isRevealed, xPct }: TimelineNodeProps) {
  const [open, setOpen] = useState(false);

  const isExperience = item.type === "experience";
  const isCurrent    = item.endDate === null;

  const dotColor = isExperience
    ? "bg-[oklch(0.55_0.2_262)] dark:bg-[oklch(0.65_0.2_262)]"
    : "bg-[oklch(0.55_0.18_155)] dark:bg-[oklch(0.65_0.18_155)]";

  const title    = isExperience ? item.role : `${item.degree} in ${item.field}`;
  const subtitle = isExperience ? item.company : item.institution;
  const logo     = item.logo;

  const dateLabel    = `${formatYear(item.startDate)}–${formatYear(item.endDate)}`;
  const fullDateRange = `${formatDate(item.startDate)} — ${formatDate(item.endDate)}`;

  const badgeClass = isExperience
    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
    : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300";

  const cardInner = (
    <div className="flex flex-col items-center text-center gap-1 w-36 select-none">
      <div className="w-8 h-8 relative rounded-lg overflow-hidden bg-muted/40 flex items-center justify-center shrink-0">
        {logo ? (
          <Image src={logo} alt={subtitle} fill className="object-contain p-1" />
        ) : isExperience ? (
          <Briefcase className="w-4 h-4 text-muted-foreground" />
        ) : (
          <GraduationCap className="w-4 h-4 text-muted-foreground" />
        )}
      </div>
      <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
        {dateLabel}
      </span>
      <p className="text-xs font-semibold leading-snug line-clamp-2">{title}</p>
      <p className="text-xs text-muted-foreground leading-snug">{subtitle}</p>
    </div>
  );

  const detailCard = (
    <>
      <div className="flex items-start gap-3 mb-3">
        {logo && (
          <div className="w-10 h-10 relative shrink-0 rounded-lg overflow-hidden bg-muted/40">
            <Image src={logo} alt={subtitle} fill className="object-contain p-1" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", badgeClass)}>
              {isExperience ? "Experience" : "Education"}
            </span>
            <span className="text-xs text-muted-foreground font-mono">{fullDateRange}</span>
          </div>
          <h3 className="text-sm font-semibold leading-snug">{title}</h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      {isExperience ? (
        <>
          {item.description && (
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{item.description}</p>
          )}
          {item.responsibilities.length > 0 && (
            <ul className="text-xs text-muted-foreground space-y-1 mb-3 list-disc list-inside">
              {item.responsibilities.slice(0, 4).map((r, i) => (
                <li key={i}>{r}</li>
              ))}
              {item.responsibilities.length > 4 && (
                <li className="text-muted-foreground/60">+{item.responsibilities.length - 4} more…</li>
              )}
            </ul>
          )}
          {item.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs py-0">{tech}</Badge>
              ))}
            </div>
          )}
        </>
      ) : (
        item.description && (
          <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
        )
      )}
    </>
  );

  return (
    <div
      className="absolute"
      style={{ left: `${xPct}%`, top: "50%", transform: "translate(-50%, -50%)" }}
    >
      <div className="flex flex-col items-center">

        {/* ── top area (card + connector when above) ───────────────── */}
        <div className="h-[108px] flex flex-col items-center justify-end">
          {above && (
            <>
              <motion.div
                style={{ pointerEvents: isRevealed ? "auto" : "none" }}
                animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 10 }}
                transition={{ duration: 0.35 }}
              >
                <HoverCard open={open} onOpenChange={setOpen} openDelay={150} closeDelay={100}>
                  <HoverCardTrigger asChild>
                    <div className="cursor-pointer" onClick={() => setOpen((v) => !v)}>
                      {cardInner}
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent side="top" align="center" className="w-80 p-4">
                    {detailCard}
                  </HoverCardContent>
                </HoverCard>
              </motion.div>
              <motion.div
                className="w-px bg-border"
                style={{ height: "16px" }}
                animate={{ opacity: isRevealed ? 1 : 0 }}
              />
            </>
          )}
        </div>

        {/* ── dot ──────────────────────────────────────────────────── */}
        <div className="relative flex items-center justify-center">
          {isCurrent && isRevealed && (
            <motion.span
              className={cn("absolute w-5 h-5 rounded-full opacity-40", dotColor)}
              animate={{ scale: [1, 1.9, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <motion.div
            className={cn("relative z-10 w-3 h-3 rounded-full", dotColor)}
            animate={{ scale: isRevealed ? 1 : 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 220 }}
          />
        </div>

        {/* ── bottom area (connector + card when below) ─────────────── */}
        <div className="h-[108px] flex flex-col items-center justify-start">
          {!above && (
            <>
              <motion.div
                className="w-px bg-border"
                style={{ height: "16px" }}
                animate={{ opacity: isRevealed ? 1 : 0 }}
              />
              <motion.div
                style={{ pointerEvents: isRevealed ? "auto" : "none" }}
                animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : -10 }}
                transition={{ duration: 0.35 }}
              >
                <HoverCard open={open} onOpenChange={setOpen} openDelay={150} closeDelay={100}>
                  <HoverCardTrigger asChild>
                    <div className="cursor-pointer" onClick={() => setOpen((v) => !v)}>
                      {cardInner}
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent side="bottom" align="center" className="w-80 p-4">
                    {detailCard}
                  </HoverCardContent>
                </HoverCard>
              </motion.div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
