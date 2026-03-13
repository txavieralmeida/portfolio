export interface PersonalInfo {
  name: string;
  title: string;
  mission: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  profileImage: string;
  website?: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string; // lucide icon name
}

export interface ExperienceItem {
  type: "experience";
  company: string;
  role: string;
  startDate: string;
  endDate: string | null; // null = present
  description: string;
  responsibilities: string[];
  technologies: string[];
  logo?: string;
}

export interface EducationItem {
  type: "education";
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | null;
  description?: string;
  logo?: string;
}

export type TimelineItem = ExperienceItem | EducationItem;

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
}

export interface PersonalInterest {
  icon: string; // lucide icon name
  title: string;
  description: string;
}

export interface CVData {
  personal: PersonalInfo;
  socials: SocialLink[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: Project[];
  interests: PersonalInterest[];
  skills: Record<string, string[]>;
}
