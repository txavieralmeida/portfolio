import type { CVData } from "@/types/cv";

export const cvDataIt: CVData = {
  personal: {
    name: "Tiago Almeida",
    title: "Frontend Squad Lead",
    mission:
      "Appassionato di costruire software sicuro e affidabile, guidando il team nella realizzazione della migliore esperienza utente",
    email: "talmeida.pro@gmail.com",
    phone: "+351 915 836 356",
    location: "Portogallo",
    bio: "Nonostante ricopra il ruolo di Frontend Squad Lead, continuo a sviluppare software attivamente, sempre concentrato sulle migliori pratiche di sicurezza end-to-end. In Devoteam Cybertrust lavoro esattamente in quella intersezione tra sicurezza e ingegneria. Adoro risolvere problemi complessi, automatizzare processi e costruire strumenti che fanno la differenza. Fuori dal lavoro, alleno il calcio giovanile, piloto droni, creo pezzi con la mia stampante 3D e mantengo un server che esegue alcuni servizi in Docker con l'aiuto di Cloudflare",
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
      role: "Sviluppatore Software",
      startDate: "2021-09",
      endDate: null,
      logo: "/images/logos/devoteam.jpg",
      description:
        "Lavorando all'intersezione tra consulenza in cybersecurity e sviluppo software, costruendo strumenti interni, automatizzando flussi di lavoro di sicurezza e supportando i progetti dei clienti.",
      responsibilities: [
        "Sviluppare e mantenere strumenti e dashboard di sicurezza interni",
        "Automatizzare i flussi di lavoro ripetitivi di valutazione della sicurezza con Python e Bash",
        "Supportare i progetti di penetration testing con script personalizzati e strumenti di reporting",
        "Collaborare con team interfunzionali per fornire soluzioni software sicure",
        "Contribuire alla progettazione di pipeline CI/CD e alle pratiche DevSecOps",
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
      degree: "Formazione",
      field: "Angular",
      startDate: "2024-05",
      endDate: "2024-06",
      logo: "/images/logos/ISEP.png",
      description:
        "Formazione nell'ecosistema Angular, consolidando le conoscenze in RxJS, ciclo di vita dell'applicazione e standard di sviluppo web.",
    },
    {
      type: "education",
      institution: "Universidade da Beira Interior",
      degree: "Laurea Triennale",
      field: "Ingegneria Informatica",
      startDate: "2018-09",
      endDate: "2021-06",
      logo: "/images/logos/UBI.png",
      description:
        "Basi solide in ingegneria del software, programmazione e architettura dei sistemi.\n" +
        "\n" +
        "Conoscenze strutturali in reti informatiche, database e sicurezza.\n" +
        "\n" +
        "Sviluppo di forte capacità analitica e risoluzione di problemi complessi.\n" +
        "\n" +
        "Attenzione al lavoro di squadra e all'applicazione delle metodologie di sviluppo.",
    },
  ],

  projects: [
    {
      id: "aponto",
      title: "APonto",
      description:
        "Software multipiattaforma per la gestione finanziaria e logistica dei centri di studio.",
      longDescription:
        "Applicazione desktop sviluppata in Electron per Windows, Linux e macOS, progettata per centralizzare il controllo delle rette mensili, dell'alimentazione e dei trasporti. Si distingue per l'integrazione nativa con SMSGateway tramite Android, consentendo l'invio automatizzato di avvisi e notifiche senza costi aggiuntivi di servizi esterni.",
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
      title: "Negozio - Grupo Desportivo do Pião",
      description:
        "Negozio online con configuratore di maglie 3D interattivo per il Grupo Desportivo do Pião, con gestione degli ordini e pannello di amministrazione.",
      longDescription:
        "Piattaforma e-commerce full-stack sviluppata per il Grupo Desportivo do Pião, che permette ai tifosi di personalizzare e ordinare maglie ufficiali con anteprima 3D in tempo reale. Il configuratore supporta nome (fino a 15 caratteri), numero, stemma sulla manica, variante di design e taglia. Include un sistema di coda virtuale tramite Socket.IO per gestire i picchi di traffico, tracciamento degli ordini, un pannello di amministrazione completo e un sistema di sponsorizzazione con livelli configurabili.",
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
    //   title: "Toolkit di Automazione Pentest",
    //   description:
    //     "Una raccolta di script Python e wrapper che automatizzano i passaggi ripetitivi dei test di penetrazione delle applicazioni web.",
    //   longDescription:
    //     "Integra strumenti comuni (nmap, nikto, sqlmap) in una CLI unificata con output JSON strutturato, generando automaticamente un report dei risultati in Markdown e HTML.",
    //   image: "/images/projects/pentest.png",
    //   technologies: ["Python", "Click", "Jinja2", "Docker", "Bash"],
    //   repoUrl: "https://gitlab.com/tiago-almeida/pentest-toolkit",
    //   featured: false,
    // },
  ],

  interests: [
    {
      icon: "Drone",
      title: "Droni",
      description:
        "Adoro la sfida di pilotare un drone FPV e catturare riprese aeree.",
    },
    {
      icon: "Trophy",
      title: "Calcio",
      description:
        "Aiuto i ragazzi a sviluppare abilità, lavoro di squadra e amore per il gioco.",
    },
    {
      icon: "Clapperboard",
      title: "Cinema e serie",
      description:
        "Apprezzo il cinema con una preferenza per la fantascienza e la commedia.",
    },
    {
      icon: "Youtube",
      title: "Video Tech",
      description:
        "Sempre aggiornato sulle ultime novità in tech, sviluppo e sicurezza — YouTube è la mia seconda casa.",
    },
    {
      icon: "Heart",
      title: "Famiglia",
      description:
        "Il fondamento di tutto — dove l'amore nasce e i legami diventano eterni.",
    },
    {
      icon: "Server",
      title: "Server Domestico",
      description:
        "Entusiasta del self-hosting: Jellyfin, WireGuard, Bitwarden, Web Hosting, RAID e altro, attivo 24/7.",
    },
    {
      icon: "Cpu",
      title: "Elettronica",
      description:
        "Dove il fascino per la tecnologia incontra la pratica; creando progetti intelligenti e connessi con ESP e Arduinos.",
    },
    {
      icon: "Bot",
      title: "Intelligenza Artificiale",
      description:
        "Appassionato del mondo dell'Intelligenza Artificiale e della creazione di soluzioni che uniscono GenAI all'ottimizzazione delle attivitá quotidiane.",
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
