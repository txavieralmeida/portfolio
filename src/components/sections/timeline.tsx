"use client";

import { useRef, useEffect, useState, useMemo, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, GraduationCap } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { DATE_LOCALES } from "@/i18n/date-locales";
import type { ExperienceItem, EducationItem, TimelineItem } from "@/types/cv";

// ── helpers ────────────────────────────────────────────────────────────────────

function parseDate(dateStr: string | null): number {
  if (!dateStr) return Date.now();
  const [year, month = "01"] = dateStr.split("-");
  return new Date(Number(year), Number(month) - 1).getTime();
}

function formatDate(dateStr: string | null, presentText: string, dateLocale: string): string {
  if (!dateStr) return presentText;
  const [year, month] = dateStr.split("-");
  return new Date(Number(year), Number(month) - 1).toLocaleDateString(dateLocale, {
    month: "short",
    year: "numeric",
  });
}

function formatYear(dateStr: string | null): string {
  if (!dateStr) return "";
  return dateStr.split("-")[0];
}

// ── constants ──────────────────────────────────────────────────────────────────

/** Horizontal padding on each side of the rail as a fraction of viewport width */
const RAIL_PAD    = 0.09;
/** px distance from rail centre to the midline of each bar lane */
const LANE_OFFSET = 18;
/** px height of each duration bar */
const BAR_HEIGHT  = 6;
/** px diameter of each start dot */
const DOT_SIZE    = 12;

// ── DetailCard ─────────────────────────────────────────────────────────────────

function DetailCard({ item }: { item: TimelineItem }) {
  const t = useTranslations("timeline");
  const locale = useLocale();
  const dateLocale = DATE_LOCALES[locale as keyof typeof DATE_LOCALES] ?? "en-GB";
  const [sheetOpen, setSheetOpen] = useState(false);

  const isExperience = item.type === "experience";
  const title    = isExperience ? item.role : `${item.degree} ${t("inWord")} ${item.field}`;
  const subtitle = isExperience ? item.company : item.institution;
  const logo     = item.logo;

  const badgeClass = isExperience
    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
    : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300";

  const fmt = (d: string | null) => formatDate(d, t("present"), dateLocale);
  const fullDateRange = `${fmt(item.startDate)} — ${fmt(item.endDate)}`;

  const hasDetails = isExperience
    ? !!(item.description || item.responsibilities.length || item.technologies.length)
    : !!item.description;

  // Full details body — reused inline (desktop) and in the sheet (mobile)
  const detailBody = (
    <>
      {isExperience ? (
        <>
          {item.description && (
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
          )}
          {item.responsibilities.length > 0 && (
            <ul className="text-sm text-muted-foreground space-y-1 mb-4 list-disc list-inside">
              {item.responsibilities.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          )}
          {item.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {item.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </div>
          )}
        </>
      ) : (
        item.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
        )
      )}
    </>
  );

  return (
    <div className="rounded-xl border bg-card p-4 sm:p-6 shadow-sm w-full">

      {/* Header — always visible on all screen sizes */}
      <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 relative shrink-0 rounded-lg overflow-hidden bg-muted/40 flex items-center justify-center">
          {logo ? (
            <Image src={logo} alt={subtitle} fill className="object-contain p-1.5" />
          ) : isExperience ? (
            <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          ) : (
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", badgeClass)}>
              {isExperience ? t("experience") : t("education")}
            </span>
            <span className="text-xs text-muted-foreground font-mono">{fullDateRange}</span>
          </div>
          <h3 className="text-base sm:text-xl font-semibold leading-snug">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      {/* Details — shown inline on desktop (sm+) */}
      <div className="hidden sm:block">{detailBody}</div>

      {/* Read more — mobile only, opens a bottom sheet */}
      {hasDetails && (
        <div className="sm:hidden mt-2">
          <button
            onClick={() => setSheetOpen(true)}
            className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline transition-colors"
          >
            {t("readMore")}
          </button>

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto rounded-t-xl px-6 pb-8">
              <SheetHeader className="mb-4 text-left">
                <SheetTitle>{title}</SheetTitle>
                <p className="text-sm text-muted-foreground">{subtitle} · {fullDateRange}</p>
              </SheetHeader>
              {detailBody}
            </SheetContent>
          </Sheet>
        </div>
      )}

    </div>
  );
}

// ── component ─────────────────────────────────────────────────────────────────

interface TimelineSectionProps {
  experience: ExperienceItem[];
  education: EducationItem[];
}

export function TimelineSection({ experience, education }: TimelineSectionProps) {
  const t = useTranslations("timeline");
  const outerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress]           = useState(0);
  const [hoveredIndex, setHoveredIndex]   = useState<number | null>(null);

  // Gate all position-dependent rendering to client-only to avoid hydration
  // mismatches from Date.now() producing different values on server vs client.
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  // Sort oldest → newest
  const items: TimelineItem[] = useMemo(
    () =>
      [...experience, ...education].sort(
        (a, b) => parseDate(a.startDate) - parseDate(b.startDate)
      ),
    [experience, education]
  );

  // Date span — maxDate captured once at mount via lazy state initializer
  const minDate           = useMemo(() => parseDate(items[0]?.startDate ?? null), [items]);
  const [maxDate]         = useState<number>(() => Date.now());
  const totalSpan = maxDate - minDate;
  const nowX      = 1 - RAIL_PAD;

  // Start x for each item [fraction 0–1]
  const itemXs = useMemo(
    () =>
      items.map((item) => {
        const t = (parseDate(item.startDate) - minDate) / totalSpan;
        return RAIL_PAD + t * (nowX - RAIL_PAD);
      }),
    [items, minDate, totalSpan, nowX]
  );

  // End x for each item [fraction 0–1], capped at nowX
  const itemEndXs = useMemo(
    () =>
      items.map((item) => {
        const t = (parseDate(item.endDate) - minDate) / totalSpan;
        return Math.min(nowX, RAIL_PAD + t * (nowX - RAIL_PAD));
      }),
    [items, minDate, totalSpan, nowX]
  );

  // Scroll tracking
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const handle = () => {
      const { top, height } = el.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      setProgress(scrollable > 0 ? Math.max(0, Math.min(1, -top / scrollable)) : 0);
    };

    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, []);

  // Sweeping line position (%)
  const lineXPct = progress * nowX * 100;

  // Active item: prefer items whose bar currently contains the sweep line,
  // fall back to the last item whose start has been passed.
  const activeIndex = useMemo(() => {
    // Items whose bar spans the current sweep line position
    const containing: number[] = [];
    for (let i = 0; i < items.length; i++) {
      const startPct = itemXs[i] * 100;
      const endPct   = itemEndXs[i] * 100;
      if (lineXPct >= startPct && lineXPct <= endPct) containing.push(i);
    }
    if (containing.length > 0) return containing[containing.length - 1];

    // Fallback: last item whose start has been passed
    let idx = -1;
    for (let i = 0; i < items.length; i++) {
      if (itemXs[i] * 100 <= lineXPct) idx = i;
    }
    return idx;
  }, [items, itemXs, itemEndXs, lineXPct]);

  const displayIndex = hoveredIndex ?? activeIndex;

  // Unique year labels at each item's start date
  const yearLabels = useMemo(() => {
    const seen   = new Set<string>();
    const labels: Array<{ x: number; year: string }> = [];
    items.forEach((item, i) => {
      const year = formatYear(item.startDate);
      if (year && !seen.has(year)) {
        seen.add(year);
        labels.push({ x: itemXs[i] * 100, year });
      }
    });
    return labels;
  }, [items, itemXs]);

  // y positions within the rail container (calc strings)
  const barTop  = (laneY: number) => `calc(50% + ${laneY}px - ${BAR_HEIGHT / 2}px)`;
  const dotTop  = (laneY: number) => `calc(50% + ${laneY}px)`;
  const labelY  = `calc(50% + ${LANE_OFFSET + BAR_HEIGHT / 2 + 14}px)`;

  return (
    /*
     * Outer container — tall enough to scroll through the animation.
     * 250vh total → 150vh of scroll drives progress 0→1.
     */
    <div ref={outerRef} id="timeline" style={{ height: "250vh" }}>

      {/* Sticky panel — top-16 to clear the 64px fixed navbar */}
      <div className="sticky top-20 h-[calc(100vh-4rem)] flex flex-col overflow-hidden">

        {/* ── Top 1/3: heading + rail ──────────────────────────────────── */}
        <div className="h-1/3 flex flex-col justify-center overflow-hidden px-4 md:px-8">

          {/* Heading */}
          <div className="mb-5 text-center">
            <p className="text-muted-foreground text-sm font-mono tracking-widest uppercase mb-1">
              {t("eyebrow")}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold">{t("heading")}</h2>
            <div className="flex items-center justify-center gap-6 mt-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.55_0.2_262)] dark:bg-[oklch(0.65_0.2_262)]" />
                {t("experience")}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.55_0.18_155)] dark:bg-[oklch(0.65_0.18_155)]" />
                {t("education")}
              </span>
            </div>
          </div>

          {/* Rail area */}
          <div className="relative w-full" style={{ height: "100px" }}>

            {/* Background rail */}
            <div
              className="absolute h-px bg-border"
              style={{ top: "50%", left: `${RAIL_PAD * 100}%`, right: `${RAIL_PAD * 100}%` }}
            />

            {/* Revealed rail segment */}
            <div
              className="absolute h-px bg-foreground/40"
              style={{
                top:   "50%",
                left:  `${RAIL_PAD * 100}%`,
                width: `${Math.max(0, lineXPct - RAIL_PAD * 100)}%`,
              }}
            />

            {/* Vertical sweep line */}
            <div
              className="absolute inset-y-0 w-px bg-foreground/20"
              style={{ left: `${lineXPct}%` }}
            />

            {/* ── Duration bars, dots, year labels — client-only ───────── */}
            {/* Skipped during SSR to prevent hydration mismatches caused by  */}
            {/* Date.now() producing different left% on server vs client.     */}
            {mounted && items.map((item, i) => {
              const isExp      = item.type === "experience";
              const laneY      = isExp ? -LANE_OFFSET : LANE_OFFSET;
              // CSS variables defined in globals.css — theme-aware, no JS needed
              const color      = isExp ? "var(--experience-accent)" : "var(--education-accent)";
              const startPct   = itemXs[i] * 100;
              const endPct     = itemEndXs[i] * 100;
              const revealedW  = Math.max(0, Math.min(lineXPct, endPct) - startPct);
              const isActive   = displayIndex === i;
              const isStarted  = lineXPct >= startPct;

              return (
                <div key={`${item.type}-${i}`}>

                  {/* Revealed bar (clipped to sweep line) */}
                  <div
                    className="absolute rounded-full cursor-pointer transition-opacity duration-150"
                    style={{
                      top:             barTop(laneY),
                      left:            `${startPct}%`,
                      width:           `${revealedW}%`,
                      height:          `${BAR_HEIGHT}px`,
                      backgroundColor: color,
                      opacity:         isActive ? 1 : 0.6,
                    }}
                    onMouseEnter={() => { if (isStarted) setHoveredIndex(i); }}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />

                  {/* Start dot */}
                  <div
                    className="absolute cursor-pointer transition-opacity duration-300"
                    style={{
                      top:             dotTop(laneY),
                      left:            `${startPct}%`,
                      transform:       "translate(-50%, -50%)",
                      width:           `${DOT_SIZE}px`,
                      height:          `${DOT_SIZE}px`,
                      borderRadius:    "50%",
                      backgroundColor: color,
                      opacity:         isStarted ? 1 : 0,
                    }}
                    onMouseEnter={() => { if (isStarted) setHoveredIndex(i); }}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />

                </div>
              );
            })}

            {/* ── Year labels — appear when sweep line passes them ─────── */}
            {mounted && yearLabels.map(({ x, year }) => (
              <span
                key={year}
                className="absolute text-xs font-mono text-muted-foreground whitespace-nowrap select-none transition-opacity duration-300"
                style={{
                  top:     labelY,
                  left:    `${x}%`,
                  transform: "translateX(-50%)",
                  opacity: lineXPct >= x ? 1 : 0,
                }}
              >
                {year}
              </span>
            ))}

            {/* "Now" year label — tied to the pulsing dot threshold */}
            <span
              className="absolute text-xs font-mono text-muted-foreground whitespace-nowrap select-none transition-opacity duration-500"
              style={{
                top:     labelY,
                left:    `${nowX * 100}%`,
                transform: "translateX(-50%)",
                opacity: progress >= 0.98 ? 1 : 0,
              }}
            >
              {t("now")}
            </span>

            {/* "Now" pulsing dot on the rail */}
            <motion.div
              className="absolute"
              style={{
                left:      `${nowX * 100}%`,
                top:       "50%",
                transform: "translate(-50%, -50%)",
              }}
              animate={{ opacity: progress >= 0.98 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative flex items-center justify-center">
                <motion.span
                  className="absolute w-5 h-5 rounded-full bg-foreground opacity-30"
                  animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative z-10 w-3 h-3 rounded-full bg-foreground" />
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── Bottom 2/3: detail card ───────────────────────────────────── */}
        <div className="h-2/3 flex items-center justify-center px-4 md:px-8 py-6">
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait">
              {displayIndex >= 0 && (
                <motion.div
                  key={displayIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <DetailCard item={items[displayIndex]} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
