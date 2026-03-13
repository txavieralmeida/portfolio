import type { CVData } from "@/types/cv";

export const cvDataSv: CVData = {
  personal: {
    name: "Tiago Almeida",
    title: "Frontend Squad Lead",
    mission:
      "Passionerad av att bygga säker och pålitlig mjukvara, leda teamet i att leverera den bästa användarupplevelsen",
    email: "talmeida.pro@gmail.com",
    phone: "+351 915 836 356",
    location: "Portugal",
    bio: "Trots att jag agerar som Frontend Squad Lead fortsätter jag att aktivt utveckla mjukvara, alltid med fokus på bästa praxis för säkerhet från början till slut. På Devoteam Cybertrust arbetar jag exakt i den skärningspunkten mellan säkerhet och ingenjörskonst. Jag älskar att lösa komplexa problem, automatisera processer och bygga verktyg som gör skillnad. Utanför jobbet tränar jag ungdomsfotboll, flyger drönare, skapar föremål på min 3D skrivare och underhåller en server som kör några tjänster i Docker med hjälp av Cloudflare",
    profileImage: "/images/profile.png",
    website: "https://tiago-almeida.pt",
  },

  socials: [
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/tiagoxalmeida/",
      icon: "Linkedin",
    },
    {
      label: "GitLab",
      url: "https://gitlab.com/tiago-almeida",
      icon: "Gitlab",
    },
  ],

  experience: [
    {
      type: "experience",
      company: "Devoteam Cybertrust",
      role: "Mjukvaruutvecklare",
      startDate: "2021-09",
      endDate: null,
      logo: "/images/logos/devoteam.jpg",
      description:
        "Arbetar i skärningspunkten mellan cybersäkerhetskonsulting och mjukvaruutveckling, bygger interna verktyg, automatiserar säkerhetsarbetsflöden och stödjer kundprojekt.",
      responsibilities: [
        "Utveckla och underhålla interna säkerhetsverktyg och dashboards",
        "Automatisera repetitiva arbetsflöden för säkerhetsbedömning med Python och Bash",
        "Stödja penetrationstestningsprojekt med anpassade skript och rapporteringsverktyg",
        "Samarbeta med tvärfunktionella team för att leverera säkra mjukvarulösningar",
        "Bidra till design av CI/CD-pipelines och DevSecOps-praxis",
      ],
      technologies: [
        "HTML",
        "CSS3",
        "Bootstrap",
        "Tailwind",
        "JavaScript",
        "TypeScript",
        "React",
        "Docker",
        "GitLab",
        "Php",
        "Symfony",
        "Bash",
        "RabbitMQ",
        "Redis",
        "MySQL",
      ],
    },
  ],

  education: [
    {
      type: "education",
      institution: "Instituto Superior de Engenharia do Porto",
      degree: "Utbildning",
      field: "Angular",
      startDate: "2024-05",
      endDate: "2024-06",
      logo: "/images/logos/ISEP.png",
      description:
        "Utbildning i Angular-ekosystemet, konsoliderar kunskaper i RxJS, applikationens livscykel och webbstandarder för utveckling.",
    },
    {
      type: "education",
      institution: "Universidade da Beira Interior",
      degree: "Kandidatexamen",
      field: "Datateknik",
      startDate: "2018-09",
      endDate: "2021-06",
      logo: "/images/logos/UBI.png",
      description:
        "Solid grund i mjukvaruteknik, programmering och systemarkitektur.\n" +
        "\n" +
        "Strukturella kunskaper i datanätverk, databaser och säkerhet.\n" +
        "\n" +
        "Utveckling av stark analytisk förmåga och lösning av komplexa problem.\n" +
        "\n" +
        "Fokus på lagarbete och tillämpning av utvecklingsmetodologier.",
    },
  ],

  projects: [
    {
      id: "aponto",
      title: "APonto",
      description:
        "Plattformsoberoende mjukvara för finansiell och logistisk hantering av studiecenter.",
      longDescription:
        "Skrivbordsapplikation utvecklad i Electron för Windows, Linux och macOS, utformad för att centralisera kontrollen av månadsavgifter, mat och transporter. Den utmärker sig för sin inbyggda integration med SMSGateway via Android, vilket möjliggör automatiserat utskick av aviseringar och notiser utan extra kostnader för externa tjänster.",
      image: "/images/projects/aponto-mockup.png",
      technologies: [
        "Electron",
        "Node.js",
        "Tailwind CSS",
        "TypeScript",
        "SQLite",
        "Rest API",
        "SMS Gateway",
      ],
      featured: true,
    },
    {
      id: "gdpiao-store",
      title: "Butik - Grupo Desportivo do Pião",
      description:
        "Nätbutik med interaktiv 3D-tröjkonfigurator för Grupo Desportivo do Pião, med orderhantering och adminpanel.",
      longDescription:
        "Full-stack e-handelsplattform utvecklad för Grupo Desportivo do Pião, som låter fans anpassa och beställa officiella tröjor med 3D-förhandsvisning i realtid. Konfiguratorn stödjer namn (upp till 15 tecken), nummer, ärmemblem, designvariant och storlek. Inkluderar ett virtuellt kösystem via Socket.IO för att hantera trafikstoppar, orderuppföljning, en komplett adminpanel och ett sponsringssystem med konfigurerbara nivåer.",
      image: "/images/projects/gdpiao-mockup.png",
      technologies: [
        "React",
        "Three.js",
        "Node.js",
        "Axios",
        "Drizzle ORM",
        "SQLite",
        "Docker",
      ],
      featured: true,
    },
    // {
    //   id: "pentest-automation",
    //   title: "Pentest-automationsverktyg",
    //   description:
    //     "En samling Python-skript och wrappers som automatiserar repetitiva steg i penetrationstestning av webbapplikationer.",
    //   longDescription:
    //     "Omsluter vanliga verktyg (nmap, nikto, sqlmap) i ett enhetligt CLI med strukturerad JSON-utdata och genererar automatiskt en findings-rapport i Markdown och HTML.",
    //   image: "/images/projects/pentest.png",
    //   technologies: ["Python", "Click", "Jinja2", "Docker", "Bash"],
    //   repoUrl: "https://gitlab.com/tiago-almeida/pentest-toolkit",
    //   featured: false,
    // },
  ],

  interests: [
    {
      icon: "Drone",
      title: "Drönare",
      description:
        "Jag älskar utmaningen att flyga en FPV-drönare och fånga luftbilder.",
    },
    {
      icon: "Trophy",
      title: "Fotboll",
      description:
        "Jag hjälper barn att utveckla färdigheter, lagarbete och kärlek till spelet.",
    },
    {
      icon: "Clapperboard",
      title: "Film och serier",
      description:
        "Jag uppskattar film med en preferens för science fiction och komedi.",
    },
    {
      icon: "Youtube",
      title: "Tech-videor",
      description:
        "Håller alltid koll på det senaste inom tech, utveckling och säkerhet — YouTube är mitt andra hem.",
    },
    {
      icon: "Heart",
      title: "Familj",
      description:
        "Grunden till allt — där kärlek föds och band blir eviga.",
    },
    {
      icon: "Server",
      title: "Hemserver",
      description:
        "Entusiast för självhosting: Jellyfin, WireGuard, Bitwarden, webbhotell, RAID och mer, igång 24/7.",
    },
    {
      icon: "Cpu",
      title: "Elektronik",
      description:
        "Där fascination för teknik möter praktik; skapar smarta och uppkopplade projekt med ESP och Arduinos.",
    },
    {
      icon: "Bot",
      title: "Artificiell intelligens",
      description:
        "Passionerad av världen av Artificiell Intelligens och byggandet av lösningar som kombinerar GenAI med optimering av vardagens uppgifter.",
    },
  ],

  skills: {
    Languages: ["Python", "TypeScript", "JavaScript", "Bash", "SQL", "PHP", "Java", "C++"],
    Frontend: ["React", "Angular", "Next.js", "Tailwind CSS", "HTML/CSS"],
    Backend: ["Node.js", "Express", "Redis", "MySQL", "PHP"],
    DevOps: ["Docker", "GitLab CI", "Cloudflare", "AWS"],
    Security: [
      "XSS Prevention",
      "SQL Injection Prevention",
      "MFA",
      "Passkeys",
      "Obfuscation",
      "Rate limiting",
      "Audit logs",
    ],
    Tools: ["Git", "Linux", "VS Code", "Jira", "GoodDay", "PhpStorm", "WebStorm"],
  },
};
