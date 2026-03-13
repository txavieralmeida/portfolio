import type { CVData } from "@/types/cv";

export const cvDataFr: CVData = {
  personal: {
    name: "Tiago Almeida",
    title: "Frontend Squad Lead",
    mission:
      "Passionné par la création de logiciels sécurisés et fiables, en guidant l'équipe vers la meilleure expérience utilisateur",
    email: "talmeida.pro@gmail.com",
    phone: "+351 915 836 356",
    location: "Portugal",
    bio: "Bien qu'occupant le poste de Frontend Squad Lead, je continue à développer activement des logiciels, toujours en mettant l'accent sur les meilleures pratiques de sécurité de bout en bout. Chez Devoteam Cybertrust, je travaille exactement à cette intersection entre la sécurité et l'ingénierie. J'adore résoudre des problèmes complexes, automatiser des processus et construire des outils qui font la différence. En dehors du travail, j'entraine le football jeune, je pilote des drones, je crée des pièces sur mon imprimante 3D et je maintiens un serveur faisant tourner quelques services dans Docker avec l'aide de Cloudflare",
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
      role: "Développeur Logiciel",
      startDate: "2021-09",
      endDate: null,
      logo: "/images/logos/devoteam.jpg",
      description:
        "Travaillant à l'intersection du conseil en cybersécurité et du développement logiciel, en construisant des outils internes, en automatisant les flux de travail de sécurité et en soutenant les projets client.",
      responsibilities: [
        "Développer et maintenir des outils et tableaux de bord de sécurité internes",
        "Automatiser les flux de travail répétitifs d'évaluation de la sécurité avec Python et Bash",
        "Soutenir les projets de tests de pénétration avec des scripts personnalisés et des outils de reporting",
        "Collaborer avec des équipes pluridisciplinaires pour livrer des solutions logicielles sécurisées",
        "Contribuer à la conception de pipelines CI/CD et aux pratiques DevSecOps",
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
      degree: "Formation",
      field: "Angular",
      startDate: "2024-05",
      endDate: "2024-06",
      logo: "/images/logos/ISEP.png",
      description:
        "Formation dans l'écosystème Angular, consolidant les connaissances en RxJS, cycle de vie de l'application et standards du développement web.",
    },
    {
      type: "education",
      institution: "Universidade da Beira Interior",
      degree: "Licence",
      field: "Ingénierie Informatique",
      startDate: "2018-09",
      endDate: "2021-06",
      logo: "/images/logos/UBI.png",
      description:
        "Bases solides en génie logiciel, programmation et architecture des systèmes.\n" +
        "\n" +
        "Connaissances structurelles en réseaux informatiques, bases de données et sécurité.\n" +
        "\n" +
        "Développement d'une forte capacité analytique et résolution de problèmes complexes.\n" +
        "\n" +
        "Accent sur le travail en équipe et l'application des méthodologies de développement.",
    },
  ],

  projects: [
    {
      id: "aponto",
      title: "APonto",
      description:
        "Logiciel multiplateforme pour la gestion financière et logistique des centres d'études.",
      longDescription:
        "Application de bureau développée avec Electron pour Windows, Linux et macOS, conçue pour centraliser le contrôle des mensualités, de l'alimentation et des transports. Elle se distingue par son intégration native avec SMSGateway via Android, permettant l'envoi automatisé d'alertes et de notifications sans coûts supplémentaires liés à des services externes.",
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
      title: "Boutique - Grupo Desportivo do Pião",
      description:
        "Boutique en ligne avec un configurateur de maillots 3D interactif pour le Grupo Desportivo do Pião, avec gestion des commandes et panneau d'administration.",
      longDescription:
        "Plateforme e-commerce full-stack développée pour le Grupo Desportivo do Pião, permettant aux fans de personnaliser et commander des maillots officiels avec prévisualisation 3D en temps réel. Le configurateur supporte le nom (jusqu'à 15 caractères), le numéro, l'écusson sur la manche, la variante de design et la taille. Comprend un système de file d'attente virtuelle via Socket.IO pour gérer les pics de trafic, le suivi des commandes, un panneau d'administration complet et un système de parrainage avec des niveaux configurables.",
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
    //   title: "Boîte à outils d'automatisation Pentest",
    //   description:
    //     "Une collection de scripts Python et de wrappers qui automatisent les étapes répétitives des tests de pénétration d'applications web.",
    //   longDescription:
    //     "Encapsule des outils courants (nmap, nikto, sqlmap) dans une CLI unifiée avec sortie JSON structurée, générant automatiquement un rapport de résultats en Markdown et HTML.",
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
        "J'adore le défi de piloter un drone FPV et de capturer des images aériennes.",
    },
    {
      icon: "Trophy",
      title: "Football",
      description:
        "J'aide les enfants à développer leurs compétences, le travail d'équipe et l'amour du jeu.",
    },
    {
      icon: "Clapperboard",
      title: "Cinéma et séries",
      description:
        "J'apprécie le cinéma avec une préférence pour la science-fiction et la comédie.",
    },
    {
      icon: "Youtube",
      title: "Vidéos Tech",
      description:
        "Toujours à regarder les dernières nouveautés en tech, développement et sécurité — YouTube est ma deuxième maison.",
    },
    {
      icon: "Heart",
      title: "Famille",
      description:
        "Le fondement de tout — là où l'amour nait et les liens deviennent éternels.",
    },
    {
      icon: "Server",
      title: "Serveur Domestique",
      description:
        "Passionné d'auto-hébergement : Jellyfin, WireGuard, Bitwarden, Web Hosting, RAID et plus, tournant 24h/24.",
    },
    {
      icon: "Cpu",
      title: "Électronique",
      description:
        "Là où la fascination pour la technologie rencontre la pratique ; créant des projets intelligents et connectés avec ESP et Arduinos.",
    },
    {
      icon: "Bot",
      title: "Intelligence Artificielle",
      description:
        "Passionné par le monde de l'Intelligence Artificielle et la création de solutions qui allient GenAI à l'optimisation des tâches quotidiennes.",
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
