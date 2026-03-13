"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageLightbox } from "@/components/projects/image-lightbox";
import type { Project } from "@/types/cv";

interface ProjectCardProps {
  project: Project;
  compact?: boolean;
}

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  const t = useTranslations("projects");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const alt = `${project.title} ${t("screenshotAlt")}`;

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02, y: -3 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="h-full"
      >
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow overflow-hidden">
          {/* Image */}
          <div
            className="relative w-full aspect-video bg-muted cursor-pointer"
            onClick={() => setLightboxOpen(true)}
          >
            <Image
              src={project.image}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

        <CardHeader className="pb-2">
          <h3 className="font-semibold text-base leading-snug">{project.title}</h3>
        </CardHeader>

        <CardContent className="flex-1 pt-0">
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            {compact ? project.description : (project.longDescription ?? project.description)}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="gap-2 flex-wrap pt-0">
          {project.liveUrl && (
            <Button size="sm" variant="default" asChild>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-1.5"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                {t("liveDemo")}
              </a>
            </Button>
          )}
          {project.repoUrl && (
            <Button size="sm" variant="outline" asChild>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-1.5"
              >
                <Github className="h-3.5 w-3.5" />
                {t("source")}
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>

      <ImageLightbox
        src={project.image}
        alt={alt}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />
    </>
  );
}
