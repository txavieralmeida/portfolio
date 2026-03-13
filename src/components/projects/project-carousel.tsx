"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProjectCard } from "./project-card";
import type { Project } from "@/types/cv";

interface ProjectCarouselProps {
  projects: Project[];
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {projects.map((project) => (
          <CarouselItem
            key={project.id}
            className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
          >
            <ProjectCard project={project} compact />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-4 sm:-left-6" />
      <CarouselNext className="-right-4 sm:-right-6" />
    </Carousel>
  );
}
