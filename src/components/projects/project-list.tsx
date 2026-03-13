"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageLightbox } from "@/components/projects/image-lightbox";
import type { Project } from "@/types/cv";

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const t = useTranslations("projects");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <>
      <div className="space-y-16">
        {projects.map((project, index) => {
          const imageOnLeft = index % 2 === 0;
          const alt = `${project.title} ${t("screenshotAlt")}`;
          return (
            <motion.div
              key={project.id}
              className={`flex flex-col md:flex-row gap-8 items-center ${
                !imageOnLeft ? "md:flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              {/* Image */}
              <motion.div
                className="w-full md:w-1/2 aspect-video relative rounded-xl overflow-hidden bg-muted ring-1 ring-border cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                onClick={() => setLightbox({ src: project.image, alt })}
              >
                <Image
                  src={project.image}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>

            {/* Text */}
            <div className="w-full md:w-1/2 space-y-4">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.longDescription ?? project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-3 flex-wrap">
                {project.liveUrl && (
                  <Button size="sm" asChild>
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
              </div>
            </div>
            </motion.div>
          );
        })}
      </div>

      {lightbox && (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          open={true}
          onOpenChange={(open) => { if (!open) setLightbox(null); }}
        />
      )}
    </>
  );
}
