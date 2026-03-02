"use client";

import { useState, useEffect, useRef } from "react";
import { cvData } from "@/data/cv-data";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { TimelineSection } from "@/components/sections/timeline";
import { ProjectsSection } from "@/components/sections/projects";
import { Footer } from "@/components/sections/footer";

const SECTIONS = ["hero", "about", "timeline", "projects", "contact"];

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <Navbar activeSection={activeSection} />
      <main>
        <Hero personal={cvData.personal} />
        <About personal={cvData.personal} interests={cvData.interests} />
        <TimelineSection
          experience={cvData.experience}
          education={cvData.education}
        />
        <ProjectsSection projects={cvData.projects} />
      </main>
      <Footer personal={cvData.personal} socials={cvData.socials} />
    </>
  );
}
