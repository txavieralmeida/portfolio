"use client";

import {motion} from "motion/react";
import Image from "next/image";
import {useTranslations} from "next-intl";
import {Bot, Clapperboard, Cpu, Drone, Heart, Mail, MapPinIcon, Radio, Server, Trophy, Youtube,} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";
import {SectionWrapper} from "@/components/layout/section-wrapper";
import type {PersonalInfo, PersonalInterest} from "@/types/cv";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Radio,
  Trophy,
  Clapperboard,
  Drone,
  Cpu,
  Bot,
  Youtube,
  Server,
  Heart,
};

interface AboutProps {
  personal: PersonalInfo;
  interests: PersonalInterest[];
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function About({ personal, interests }: AboutProps) {
  const t = useTranslations("about");

  return (
    <SectionWrapper id="about">
      {/* Section heading */}
      <div className="mb-12 text-center">
        <p className="text-muted-foreground text-sm font-mono tracking-widest uppercase mb-2">
          {t("eyebrow")}
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold">{t("heading")}</h2>
      </div>

      {/* Profile + bio */}
      <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
        {/* Profile photo */}
        <motion.div
          className="shrink-0"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-56 h-56 md:w-64 md:h-64">
            <Image
              src={personal.profileImage}
              alt={`${personal.name} ${t("profileAlt")}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 224px, 256px"
              priority
            />
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          className="flex-1 space-y-4"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-muted-foreground text-base leading-relaxed">
            {personal.bio}
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className={`flex flex-row items-center gap-2`}><MapPinIcon/> {personal.location}</span>
            <span className={`flex flex-row items-center gap-2`}><Mail/> {personal.email}</span>
          </div>
        </motion.div>
      </div>

      {/* Interest cards */}
      <div className="mb-6 text-center">
        <h3 className="text-xl font-semibold">{t("interestsHeading")}</h3>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {interests.map((interest) => {
          const Icon = ICON_MAP[interest.icon];
          return (
            <motion.div
              key={interest.title}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="flex gap-4 items-start p-5">
                  <div className="shrink-0 p-2 rounded-lg bg-muted">
                    {Icon ? (
                      <Icon className="h-5 w-5 text-foreground" />
                    ) : null}
                  </div>
                  <div>
                    <p className="font-medium mb-1">{interest.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {interest.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
