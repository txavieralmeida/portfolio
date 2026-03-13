"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Linkedin, Github, Gitlab } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { PersonalInfo, SocialLink } from "@/types/cv";

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Linkedin,
  Github,
  Gitlab,
};

interface FooterProps {
  personal: PersonalInfo;
  socials: SocialLink[];
}

export function Footer({ personal, socials }: FooterProps) {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-muted/30 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-muted-foreground text-sm font-mono tracking-widest uppercase mb-2">
            {t("eyebrow")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">{t("heading")}</h2>
        </div>

        {/* Contact info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
          <a
            href={`mailto:${personal.email}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-4 w-4" />
            {personal.email}
          </a>
          <a
            href={`tel:${personal.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="h-4 w-4" />
            {personal.phone}
          </a>
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {personal.location}
          </span>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {socials.map((social) => {
            const Icon = SOCIAL_ICONS[social.icon];
            if (!Icon) return null;
            return (
              <Tooltip key={social.label}>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.15, y: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Button variant="outline" size="icon" asChild className="h-10 w-10">
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{social.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        <Separator className="mb-6" />

        {/* Copyright */}
        <p className="text-center text-sm text-muted-foreground">
          &copy; {year} {personal.name}. {t("copyright")}
          {" "}·{" "}
          <span className="font-mono text-xs">
            v{process.env.NEXT_PUBLIC_APP_VERSION}
          </span>
        </p>
      </div>
    </footer>
  );
}
