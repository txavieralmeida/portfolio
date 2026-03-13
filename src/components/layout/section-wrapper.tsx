"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  fullHeight?: boolean;
}

export function SectionWrapper({
  id,
  className,
  children,
  fullHeight = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full",
        fullHeight ? "min-h-screen" : "py-20 md:py-28",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-6xl mx-auto px-4 sm:px-6 h-full"
      >
        {children}
      </motion.div>
    </section>
  );
}
