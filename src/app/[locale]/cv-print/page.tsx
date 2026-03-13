"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { getCvData } from "@/data/cv-data";
import { DATE_LOCALES } from "@/i18n/date-locales";
import {
  Mail,
  Github,
  Gitlab,
  Linkedin,
  MapPin,
  Phone,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Wrench,
  Globe,
  PrinterIcon,
} from "lucide-react";
import type { ReactNode } from "react";

const MAX_EXPERIENCE = 3;
const MAX_EDUCATION = 2;
const MAX_PROJECTS = 3;

function formatDate(
  dateStr: string | null,
  presentText: string,
  dateLocale: string
): string {
  if (!dateStr) return presentText;
  const [year, month = "01"] = dateStr.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString(dateLocale, { month: "short", year: "numeric" });
}

function parseDate(dateStr: string | null): number {
  if (!dateStr) return Date.now();
  const [year, month = "01"] = dateStr.split("-");
  return new Date(Number(year), Number(month) - 1).getTime();
}

const Badge = ({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "secondary";
}) => {
  const base =
    "inline-flex items-center rounded border px-1.5 py-px text-[10px] font-semibold";
  const variants = {
    default: "border-transparent bg-zinc-900 text-zinc-50",
    secondary: "border-transparent bg-zinc-100 text-zinc-900",
  };
  return <span className={`${base} ${variants[variant]}`}>{children}</span>;
};

const SectionHeader = ({
  title,
  icon,
}: {
  title: string;
  icon: ReactNode;
}) => (
  <div className="flex items-center gap-1.5 mb-2 pb-1">
    <div className="text-zinc-500">{icon}</div>
    <h2 className="text-sm font-semibold text-zinc-950 tracking-tight">
      {title}
    </h2>
  </div>
);

const socialIconMap: Record<string, ReactNode> = {
  LinkedIn: <Linkedin size={12} />,
  GitHub: <Github size={12} />,
  GitLab: <Gitlab size={12} />,
};

export default function CVPrintPage() {
  const locale = useLocale();
  const t = useTranslations("pdf");
  const router = useRouter();
  const dateLocale = DATE_LOCALES[locale as keyof typeof DATE_LOCALES] ?? "en-GB";

  const { personal, experience, education, projects, skills, socials } =
    getCvData(locale);

  const fmt = (d: string | null) => formatDate(d, t("present"), dateLocale);

  const visibleExperience = [...experience]
    .sort((a, b) => parseDate(b.startDate) - parseDate(a.startDate))
    .slice(0, MAX_EXPERIENCE);

  const visibleEducation = [...education]
    .sort((a, b) => parseDate(b.startDate) - parseDate(a.startDate))
    .slice(0, MAX_EDUCATION);

  const visibleProjects = projects
    .sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1))
    .slice(0, MAX_PROJECTS);

  return (
    <>
    <div className="min-h-screen bg-zinc-100 py-8 px-4 sm:px-8 font-sans flex flex-col items-center print:bg-white print:p-0 print:m-0">
      {/* Floating action buttons */}
      <div className="fixed bottom-8 right-8 print:hidden flex items-center gap-2 z-50">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 bg-white text-zinc-900 border border-zinc-300 px-4 py-2 rounded-full shadow-lg hover:bg-zinc-50 transition-colors"
        >
          <span className="text-sm font-medium">{t("backToWebsite")}</span>
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-zinc-900 text-zinc-50 px-4 py-2 rounded-full shadow-lg hover:bg-zinc-800 transition-colors"
        >
          <PrinterIcon size={18} />
          <span className="text-sm font-medium">{t("printToPdf")}</span>
        </button>
      </div>

      {/* A4 Page Container */}
      <div className="relative bg-white w-full max-w-[210mm] min-h-[276mm] print:h-[276mm] p-8 print:p-0 text-zinc-950">
        {/* Halftone background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/halftone light.png"
          alt=""
          aria-hidden
          className="absolute top-0 left-0 w-full h-[276mm] object-cover opacity-[.03] pointer-events-none"
        />
        {/* ── Content (above background image) ───────────────────── */}
        <div className="relative">

        {/* ── Header ─────────────────────────────────────────────── */}
        <header className="mb-4 flex gap-4 items-center">
          {/* Profile picture */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={personal.profileImage}
            alt={personal.name}
            className="w-32 h-32 object-contain shrink-0"
          />

          {/* Name, title, contacts, bio */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold tracking-tight mb-0.5">
              {personal.name}
            </h1>
            <p className="text-sm font-medium text-zinc-600">{personal.title}</p>

            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2.5 text-xs text-zinc-500">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-1 hover:text-zinc-900 transition-colors"
              >
                <Mail size={11} /> {personal.email}
              </a>
              <span className="flex items-center gap-1">
                <Phone size={11} /> {personal.phone}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={11} /> {personal.location}
              </span>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  className="flex items-center gap-1 hover:text-zinc-900 transition-colors"
                >
                  {socialIconMap[s.label] ?? <Globe size={11} />}
                  {s.url.replace("https://", "")}
                </a>
              ))}
            </div>

            <p className="mt-2.5 text-xs leading-relaxed text-zinc-600">
              {personal.bio}
            </p>
          </div>
        </header>

        {/* ── Two-column body ─────────────────────────────────────── */}
        <div className="grid grid-cols-[2fr_1.2fr] gap-5 mb-4">
          {/* Left: Experience + Education */}
          <div className="space-y-4">
            <section>
              <SectionHeader
                title={t("experience")}
                icon={<Briefcase size={14} />}
              />
              <div className="space-y-3">
                {visibleExperience.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start mb-0.5">
                      <h3 className="text-xs font-semibold">{item.role}</h3>
                      <span className="text-[10px] text-zinc-500 whitespace-nowrap ml-3">
                        {fmt(item.startDate)} –{" "}
                        {fmt(item.endDate)}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 mb-1">{item.company}</p>
                    <ul className="text-xs text-zinc-600 space-y-1 list-disc list-outside ml-3.5">
                      {item.responsibilities.map((r, j) => (
                        <li key={j}>{r}</li>
                      ))}
                    </ul>
                    {item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <SectionHeader
                title={t("education")}
                icon={<GraduationCap size={14} />}
              />
              <div className="space-y-2">
                {visibleEducation.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start mb-0.5">
                      <h3 className="text-xs font-semibold">
                        {item.degree} {t("inWord")} {item.field}
                      </h3>
                      <span className="text-[10px] text-zinc-500 whitespace-nowrap ml-3">
                        {fmt(item.startDate)} –{" "}
                        {fmt(item.endDate)}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600">{item.institution}</p>
                    {item.description && (
                      <p className="text-xs text-zinc-600 mt-0.5">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Projects */}
          <div>
            <SectionHeader
              title={t("projects")}
              icon={<FolderGit2 size={14} />}
            />
            <div className="space-y-2">
              {visibleProjects.map((project) => (
                <div
                  key={project.id}
                  className="border border-zinc-200 rounded-md p-2 flex flex-col gap-1.5"
                >
                  <div className="flex items-center gap-1.5">
                    <FolderGit2 size={11} className="text-zinc-500 shrink-0" />
                    <h3 className="text-xs font-semibold">{project.title}</h3>
                  </div>
                  <p className="text-[10px] text-zinc-600 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="default">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {(project.repoUrl ?? project.liveUrl) && (
                    <a
                      href={(project.repoUrl ?? project.liveUrl)!}
                      className="text-[9px] text-zinc-400 hover:text-zinc-700 transition-colors break-all"
                    >
                      {(project.repoUrl ?? project.liveUrl)!.replace("https://", "")}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer: Skills (full width, 3-column grid) ──────────── */}
        <div>
          <SectionHeader title={t("skills")} icon={<Wrench size={14} />} />
          <div className="grid grid-cols-3 gap-x-5 gap-y-3">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <h4 className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500 mb-1">
                  {category}
                </h4>
                <div className="flex flex-wrap gap-1">
                  {items.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        </div> {/* end relative content wrapper */}

        {/* ── Page footer — pinned to bottom of A4 ────────────────── */}
        {personal.website && (
          <p className="absolute bottom-2 left-0 right-0 text-center text-[9px] text-zinc-400">
            {t("generatedAutomatically")} · v{process.env.NEXT_PUBLIC_APP_VERSION} —{" "}
            <a
              href={personal.website}
              className="hover:text-zinc-700 transition-colors"
            >
              {personal.website}
            </a>
            {" "}· {t("visitFull")}
          </p>
        )}
      </div>
    </div>
    </>
  );
}
