"use client";

import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { ProjectList } from "@/components/projects/project-list";
import type { Project } from "@/types/cv";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const t = useTranslations("projects");

  return (
    <SectionWrapper id="projects">
      <div className="mb-12 text-center">
        <p className="text-muted-foreground text-sm font-mono tracking-widest uppercase mb-2">
          {t("eyebrow")}
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold">{t("heading")}</h2>
      </div>

      <div className="px-6 sm:px-10">
        <ProjectList projects={projects} />
      </div>
    </SectionWrapper>
  );
}
