"use client";

import { motion } from "motion/react";
import { ChevronDown, Download, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ParticlePortrait } from "@/components/particles/particle-portrait";
import type { PersonalInfo } from "@/types/cv";

interface HeroProps {
  personal: PersonalInfo;
}

export function Hero({ personal }: HeroProps) {
  const t = useTranslations("hero");
  const { resolvedTheme } = useTheme();
  const particleImage = resolvedTheme === "light"
    ? "/images/halftone light.png"
    : "/images/halftone dark.png";

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollDown = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background — gradient base + particle portrait overlay */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30 dark:to-muted/10" />
        <ParticlePortrait
          imageSrc={particleImage}
          className="absolute inset-0 opacity-10"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Greeting */}
        <motion.p
          className="text-muted-foreground text-sm sm:text-base font-mono mb-4 tracking-widest uppercase"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t("greeting")}
        </motion.p>

        {/* Name */}
        <motion.h1
          className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {personal.name}
        </motion.h1>

        {/* Title */}
        <motion.p
          className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-light mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {personal.title}
        </motion.p>

        {/* Separator */}
        <motion.div
          className="w-16 h-px bg-border mx-auto mb-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />

        {/* Mission */}
        <motion.p
          className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          {personal.mission}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Button
            size="lg"
            onClick={scrollToProjects}
            className="gap-2 min-w-40"
          >
            {t("viewWork")}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="gap-2 min-w-40"
          >
            <Link href="/cv-print">
              <Download className="h-4 w-4" />
              {t("downloadCV")}
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        aria-label={t("scrollDown")}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
