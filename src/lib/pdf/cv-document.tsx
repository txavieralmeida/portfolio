import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import type { CVData } from "@/types/cv";

const DARK = "#09090b";          // zinc-950
const BODY = "#52525b";          // zinc-600
const MUTED = "#71717a";         // zinc-500
const BORDER = "#e4e4e7";        // zinc-200
const SKILL_BADGE_BG = "#f4f4f5";   // zinc-100
const SKILL_BADGE_TEXT = "#18181b"; // zinc-900
const PROJECT_BADGE_BG = "#18181b"; // zinc-900
const PROJECT_BADGE_TEXT = "#fafafa"; // zinc-50

const LEFT_WIDTH = 310;
const RIGHT_WIDTH = 199;
const COL_GAP = 14;

const MAX_INTERESTS = 4;

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 8,
    color: DARK,
    paddingTop: 28,
    paddingBottom: 24,
    paddingLeft: 36,
    paddingRight: 36,
    lineHeight: 1.4,
  },
  // Header
  header: {
    marginBottom: 8,
    paddingBottom: 8,
  },
  name: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    marginBottom: 3,
  },
  titleText: {
    fontSize: 11,
    color: BODY,
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 4,
    alignItems: "center",
  },
  contactItem: {
    fontSize: 7.5,
    color: MUTED,
  },
  contactSep: {
    fontSize: 7.5,
    color: MUTED,
  },
  headerBio: {
    marginTop: 8,
    fontSize: 8,
    color: BODY,
    lineHeight: 1.5,
  },
  // Body
  body: {
    flexDirection: "row",
    gap: COL_GAP,
  },
  leftCol: {
    width: LEFT_WIDTH,
  },
  rightCol: {
    width: RIGHT_WIDTH,
  },
  // Sections
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
    paddingBottom: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER,
    color: DARK,
  },
  // Timeline items
  timelineItem: {
    marginBottom: 6,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  itemTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    flex: 1,
  },
  itemDate: {
    fontSize: 7,
    color: MUTED,
  },
  itemSubtitle: {
    fontSize: 7.5,
    color: BODY,
    marginBottom: 3,
  },
  itemDescription: {
    fontSize: 7.5,
    color: BODY,
    marginBottom: 3,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 1,
  },
  bulletDot: {
    width: 10,
    fontSize: 7.5,
    color: BODY,
  },
  bulletText: {
    flex: 1,
    fontSize: 7.5,
    color: BODY,
  },
  // Tech badges (experience)
  techRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
    marginTop: 3,
  },
  techBadge: {
    backgroundColor: SKILL_BADGE_BG,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    fontSize: 6.5,
    fontFamily: "Helvetica-Bold",
    color: SKILL_BADGE_TEXT,
  },
  // Skills
  skillItem: {
    marginBottom: 5,
  },
  skillCategory: {
    fontSize: 6.5,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    color: MUTED,
    marginBottom: 3,
  },
  skillBadgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
  },
  skillBadge: {
    backgroundColor: SKILL_BADGE_BG,
    color: SKILL_BADGE_TEXT,
    fontSize: 6.5,
    fontFamily: "Helvetica-Bold",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
  // Projects
  projectCard: {
    borderWidth: 0.5,
    borderColor: BORDER,
    borderRadius: 4,
    padding: 8,
    marginBottom: 5,
  },
  projectTitleRow: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    marginBottom: 1,
  },
  projectTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
  },
  projectDesc: {
    fontSize: 7.5,
    color: BODY,
    marginBottom: 4,
  },
  projectBadgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
  },
  projectBadge: {
    backgroundColor: PROJECT_BADGE_BG,
    color: PROJECT_BADGE_TEXT,
    fontSize: 6,
    fontFamily: "Helvetica-Bold",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
  // Interests
  interestItem: {
    marginBottom: 3,
  },
  interestTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    color: DARK,
  },
  interestDesc: {
    fontSize: 7,
    color: BODY,
  },
  // Links
  link: {
    color: DARK,
    textDecoration: "none",
  },
  readMore: {
    fontSize: 7,
    color: MUTED,
    marginTop: 2,
  },
  // Page footer
  pageFooter: {
    position: "absolute",
    bottom: 8,
    left: 36,
    right: 36,
    textAlign: "center",
    fontSize: 7,
    color: MUTED,
  },
});

export interface PDFTranslations {
  present: string;
  inWord: string;
  experience: string;
  education: string;
  skills: string;
  projects: string;
  interests: string;
  visitFull: string;
}

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

interface CVDocumentProps {
  data: CVData;
  translations: PDFTranslations;
  dateLocale: string;
}

export function CVDocument({ data, translations: tr, dateLocale }: CVDocumentProps) {
  const { personal, experience, education, projects, skills, interests, socials } = data;

  const fmt = (d: string | null) => formatDate(d, tr.present, dateLocale);

  const sortedExperience = [...experience].sort(
    (a, b) => parseDate(b.startDate) - parseDate(a.startDate)
  );
  const sortedEducation = [...education].sort(
    (a, b) => parseDate(b.startDate) - parseDate(a.startDate)
  );

  const visibleInterests = interests.slice(0, MAX_INTERESTS);
  const interestsTruncated = interests.length > MAX_INTERESTS;

  return (
    <Document
      title={`${personal.name} — CV`}
      author={personal.name}
      subject="Curriculum Vitae"
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personal.name}</Text>
          <Text style={styles.titleText}>{personal.title}</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>{personal.email}</Text>
            <Text style={styles.contactSep}>·</Text>
            <Text style={styles.contactItem}>{personal.phone}</Text>
            <Text style={styles.contactSep}>·</Text>
            <Text style={styles.contactItem}>{personal.location}</Text>
            {socials.map((s) => (
              <View key={s.label} style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                <Text style={styles.contactSep}>·</Text>
                <Link src={s.url} style={[styles.contactItem, styles.link]}>
                  {s.label}
                </Link>
              </View>
            ))}
          </View>
          <Text style={styles.headerBio}>{personal.bio}</Text>
        </View>

        {/* 2-column body */}
        <View style={styles.body}>
          {/* Left column: Experience, Education */}
          <View style={styles.leftCol}>
            {/* Experience */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{tr.experience}</Text>
              {sortedExperience.map((item, i) => {
                const dateRange = `${fmt(item.startDate)} — ${fmt(item.endDate)}`;
                return (
                  <View key={i} style={styles.timelineItem}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemTitle}>{item.role}</Text>
                      <Text style={styles.itemDate}>{dateRange}</Text>
                    </View>
                    <Text style={styles.itemSubtitle}>{item.company}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                    {item.responsibilities.map((r, j) => (
                      <View key={j} style={styles.bullet}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.bulletText}>{r}</Text>
                      </View>
                    ))}
                    {item.technologies.length > 0 && (
                      <View style={styles.techRow}>
                        {item.technologies.map((tech) => (
                          <Text key={tech} style={styles.techBadge}>{tech}</Text>
                        ))}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>

            {/* Education */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{tr.education}</Text>
              {sortedEducation.map((item, i) => {
                const dateRange = `${fmt(item.startDate)} — ${fmt(item.endDate)}`;
                return (
                  <View key={i} style={styles.timelineItem}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemTitle}>
                        {item.degree} {tr.inWord} {item.field}
                      </Text>
                      <Text style={styles.itemDate}>{dateRange}</Text>
                    </View>
                    <Text style={styles.itemSubtitle}>{item.institution}</Text>
                    {item.description && (
                      <Text style={styles.itemDescription}>{item.description}</Text>
                    )}
                  </View>
                );
              })}
            </View>
          </View>

          {/* Right column: Skills, Projects, Interests */}
          <View style={styles.rightCol}>
            {/* Skills */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{tr.skills}</Text>
              {Object.entries(skills).map(([category, items]) => (
                <View key={category} style={styles.skillItem}>
                  <Text style={styles.skillCategory}>{category}</Text>
                  <View style={styles.skillBadgeRow}>
                    {items.map((skill) => (
                      <Text key={skill} style={styles.skillBadge}>{skill}</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            {/* Projects */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{tr.projects}</Text>
              {projects.map((project) => (
                <View key={project.id} style={styles.projectCard}>
                  <View style={styles.projectTitleRow}>
                    <Text style={styles.projectTitle}>{project.title}</Text>
                    {(project.repoUrl ?? project.liveUrl) && (
                      <Link
                        src={(project.repoUrl ?? project.liveUrl)!}
                        style={[styles.link, { fontSize: 7, color: MUTED }]}
                      >
                        View →
                      </Link>
                    )}
                  </View>
                  <Text style={styles.projectDesc}>{project.description}</Text>
                  <View style={styles.projectBadgeRow}>
                    {project.technologies.map((tech) => (
                      <Text key={tech} style={styles.projectBadge}>{tech}</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            {/* Interests */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{tr.interests}</Text>
              {visibleInterests.map((interest) => (
                <View key={interest.title} style={styles.interestItem}>
                  <Text style={styles.interestTitle}>{interest.title}</Text>
                  <Text style={styles.interestDesc}>{interest.description}</Text>
                </View>
              ))}
              {interestsTruncated && personal.website && (
                <Link src={`${personal.website}/#about`} style={styles.readMore}>
                  {tr.visitFull} {personal.website}/#about →
                </Link>
              )}
            </View>
          </View>
        </View>

        {/* Page footer */}
        {personal.website && (
          <View style={styles.pageFooter}>
            <Link src={personal.website} style={[styles.link, { fontSize: 7, color: MUTED }]}>
              {tr.visitFull} {personal.website}
            </Link>
          </View>
        )}
      </Page>
    </Document>
  );
}
