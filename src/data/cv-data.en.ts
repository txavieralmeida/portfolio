import type { CVData } from "@/types/cv";

export const cvDataEn: CVData = {
  personal: {
    name: "Tiago Almeida",
    title: "Frontend Squad Lead",
    mission:
      "Passionate about building secure and reliable software, leading the team in delivering the best user experience",
    email: "talmeida.pro@gmail.com",
    phone: "+351 915 836 356",
    location: "Portugal",
    bio: "Despite acting as Frontend Squad Lead, I continue to actively develop software, always focused on end to end security best practices. At Devoteam Cybertrust, I work exactly at that intersection between security and engineering. I love solving complex problems, automating processes and building tools that make a difference. Outside of work, I coach youth football, fly drones, create pieces on my 3D printer and maintain a server running some services in Docker with help from Cloudflare",
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
      role: "Software Developer",
      startDate: "2021-09",
      endDate: null,
      logo: "/images/logos/devoteam.jpg",
      description:
        "Working at the intersection of cybersecurity consulting and software development, building internal tools, automating security workflows and supporting client projects.",
      responsibilities: [
        "Develop and maintain internal security tools and dashboards",
        "Automate repetitive security assessment workflows with Python and Bash",
        "Support penetration testing projects with custom scripts and reporting tools",
        "Collaborate with cross-functional teams to deliver secure software solutions",
        "Contribute to CI/CD pipeline design and DevSecOps practices",
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
      degree: "Training",
      field: "Angular",
      startDate: "2024-05",
      endDate: "2024-06",
      logo: "/images/logos/ISEP.png",
      description:
        "Training in the Angular ecosystem, consolidating knowledge in RxJS, application lifecycle and web development standards.",
    },
    {
      type: "education",
      institution: "Universidade da Beira Interior",
      degree: "Bachelor's Degree",
      field: "Informatics Engineering",
      startDate: "2018-09",
      endDate: "2021-06",
      logo: "/images/logos/UBI.png",
      description:
        "Solid foundations in software engineering, programming and systems architecture.\n" +
        "\n" +
        "Structural knowledge in computer networks, databases and security.\n" +
        "\n" +
        "Development of strong analytical capacity and resolution of complex problems.\n" +
        "\n" +
        "Focus on teamwork and application of development methodologies.",
    },
  ],

  projects: [
    {
      id: "aponto",
      title: "APonto",
      description:
        "Cross-platform software for financial and logistical management of study centres.",
      longDescription:
        "Desktop application developed in Electron for Windows, Linux and macOS, designed to centralise the control of monthly fees, food and transport. It stands out for its native integration with SMSGateway via Android, enabling automated sending of alerts and notifications without additional costs from external services.",
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
      title: "Store - Grupo Desportivo do Pião",
      description:
        "Online store with an interactive 3D jersey configurator for Grupo Desportivo do Pião, with order management and admin panel.",
      longDescription:
        "Full-stack e-commerce platform developed for Grupo Desportivo do Pião, allowing fans to customise and order official jerseys with real-time 3D preview. The configurator supports name (up to 15 characters), number, sleeve badge, design variant and size. Includes a virtual queue system via Socket.IO to manage traffic peaks, order tracking, a full admin panel and a sponsorship system with configurable tiers.",
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
    //   title: "Pentest Automation Toolkit",
    //   description:
    //     "A collection of Python scripts and wrappers that automate repetitive penetration testing steps on web applications.",
    //   longDescription:
    //     "Wraps common tools (nmap, nikto, sqlmap) in a unified CLI with structured JSON output, automatically generating a findings report in Markdown and HTML.",
    //   image: "/images/projects/pentest.png",
    //   technologies: ["Python", "Click", "Jinja2", "Docker", "Bash"],
    //   repoUrl: "https://gitlab.com/tiago-almeida/pentest-toolkit",
    //   featured: false,
    // },
  ],

  interests: [
    {
      icon: "Drone",
      title: "Drones",
      description:
        "I love the challenge of flying a FPV drone and capturing aerial footage.",
    },
    {
      icon: "Trophy",
      title: "Football",
      description:
        "I help kids develop skills, teamwork and love for the game.",
    },
    {
      icon: "Clapperboard",
      title: "Cinema & Series",
      description:
        "I enjoy cinema with a preference for science fiction and comedy.",
    },
    {
      icon: "Youtube",
      title: "Tech Videos",
      description:
        "Always watching what's new in technology, development and security — YouTube is my second home.",
    },
    {
      icon: "Heart",
      title: "Family",
      description:
        "The foundation of everything — where love is born and bonds become eternal.",
    },
    {
      icon: "Server",
      title: "Home Server",
      description:
        "Enthusiastic about self-hosting: Jellyfin, WireGuard, Bitwarden, Web Hosting, RAID and more, running 24/7.",
    },
    {
      icon: "Cpu",
      title: "Electronics",
      description:
        "Where fascination with technology meets practice; creating smart and connected projects with ESP and Arduinos.",
    },
    {
      icon: "Bot",
      title: "Artificial Intelligence",
      description:
        "Passionate about the world of Artificial Intelligence and building solutions that combine GenAI with day-to-day tasks optimisation.",
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
