"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { cn } from "@/lib/utils";

export function Navbar({ activeSection }: { activeSection?: string }) {
  const t = useTranslations("navbar");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const NAV_LINKS = [
    { label: t("about"), href: "#about" },
    { label: t("experience"), href: "#timeline" },
    { label: t("projects"), href: "#projects" },
    { label: t("contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo / Name */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-semibold text-lg tracking-tight hover:opacity-70 transition-opacity"
          aria-label={t("scrollToTop")}
        >
          TA
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <button
                onClick={() => handleNavClick(href)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  activeSection === href.slice(1)
                    ? "text-foreground bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-9 w-9"
                aria-label={t("openMenu")}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle>{t("navigation")}</SheetTitle>
              </SheetHeader>
              <ul className="flex flex-col gap-2 mt-6">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <button
                      onClick={() => handleNavClick(href)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        activeSection === href.slice(1)
                          ? "text-foreground bg-muted"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
