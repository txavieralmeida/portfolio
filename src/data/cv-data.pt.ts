import type { CVData } from "@/types/cv";

export const cvDataPt: CVData = {
  personal: {
    name: "Tiago Almeida",
    title: "Fronted Squad Lead",
    mission:
      "Apaixonado por construir software seguro e fiável, liderando a equipa na entrega da melhor experiência de utilização",
    email: "talmeida.pro@gmail.com",
    phone: "+351 915 836 356",
    location: "Portugal",
    bio: "Apesar de atuar como Frontend Squad Lead, continuo a desenvolver software ativamente, sempre com foco nas melhores práticas de segurança de ponta a ponta. Na Devoteam Cybertrust, trabalho exatamente nessa interseção entre a segurança e a engenharia. Adoro resolver problemas complexos, automatizar processos e construir ferramentas que fazem a diferença. Fora do trabalho, treino futebol juvenil, piloto drones, crio peças na minha impressora 3D e mantenho um servidor com alguns serviços em Docker com ajuda da Cloudflare",
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
      role: "Desenvolvedor de Software",
      startDate: "2021-09",
      endDate: null,
      logo: "/images/logos/devoteam.jpg",
      description:
        "A trabalhar na interseção entre consultoria em cibersegurança e desenvolvimento de software, construindo ferramentas internas, automatizando fluxos de trabalho de segurança e apoiando projetos de clientes.",
      responsibilities: [
        "Desenvolver e manter ferramentas e dashboards internos de segurança",
        "Automatizar fluxos de trabalho repetitivos de avaliação de segurança com Python e Bash",
        "Apoiar projetos de testes de penetração com scripts personalizados e ferramentas de relatório",
        "Colaborar com equipas multifuncionais para entregar soluções de software seguras",
        "Contribuir para o design de pipelines CI/CD e práticas DevSecOps",
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
        "MySQL"
      ],
    },
  ],

  education: [
    {
      type: "education",
      institution: "Instituto Superior de Engenharia do Porto",
      degree: "Formação",
      field: "Angular",
      startDate: "2024-05",
      endDate: "2024-06",
      logo: "/images/logos/ISEP.png",
      description:
        "Formação no ecossistema Angular, consolidando conhecimentos em RxJS, ciclo de vida da aplicação e standards de desenvolvimento web.",
    },
    {
      type: "education",
      institution: "Universidade da Beira Interior",
      degree: "Licenciatura",
      field: "Engenharia Informática",
      startDate: "2018-09",
      endDate: "2021-06",
      logo: "/images/logos/UBI.png",
      description:
        "Bases sólidas em engenharia de software, programação e arquitetura de sistemas.\n" +
          "\n" +
          "Conhecimentos estruturais em redes informáticas, bases de dados e segurança.\n" +
          "\n" +
          "Desenvolvimento de forte capacidade analítica e resolução de problemas complexos.\n" +
          "\n" +
          "Foco no trabalho em equipa e na aplicação de metodologias de desenvolvimento."
    },
  ],

  projects: [
    {
      id: "aponto",
      title: "APonto",
      description:
        "Software multiplataforma para gestão financeira e logística de centros de estudos.",
      longDescription:
        "Aplicação desktop desenvolvida em Electron para Windows, Linux e macOS, desenhada para centralizar o controlo de mensalidades, alimentação e transportes. Destaca-se pela integração nativa com o SMSGateway via Android, permitindo o envio automatizado de alertas e notificações sem custos adicionais de serviços externos.",
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
      title: "Loja - Grupo Desportivo do Pião",
      description:
        "Loja online com configurador de camisolas 3D interativo para o Grupo Desportivo do Pião, com gestão de encomendas e painel de administração.",
      longDescription:
        " Plataforma de e-commerce full-stack desenvolvida para o Grupo Desportivo do Pião, permitindo que os adeptos personalizem e encomendem camisolas oficiais com pré-visualização 3D em tempo real. O configurador suporta nome (até\n" +
          "  15 caracteres), número, emblema na manga, variante de design e tamanho. Inclui sistema de fila de espera virtual via Socket.IO para gerir picos de tráfego, rastreamento de encomendas, painel de administração completo e um\n" +
          "  sistema de patrocínios com tiers configuráveis." ,
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
    //   title: "Toolkit de Automação Pentest",
    //   description:
    //     "Uma coleção de scripts Python e wrappers que automatizam etapas repetitivas de testes de penetração em aplicações web.",
    //   longDescription:
    //     "Envolve ferramentas comuns (nmap, nikto, sqlmap) numa CLI unificada com saída JSON estruturada, gerando automaticamente um relatório de descobertas em Markdown e HTML.",
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
        "Adoro o desafio de pilotar um drone FPV e capturar imagens aéreas.",
    },
    {
      icon: "Trophy",
      title: "Futebol",
      description:
        "Ajudo as crianças a desenvolver habilidades, trabalho em equipa e amor pelo jogo.",
    },
    {
      icon: "Clapperboard",
      title: "Cinema e séries",
      description:
          "Aprecio cinema com preferência por ficção científica e comédia.",
    },
    {
      icon: "Youtube",
      title: "Vídeos de Tecnologia",
      description:
        "Sempre a ver o que há de novo em tecnologia, desenvolvimento e segurança - o YouTube é o meu segundo lar.",
    },
    {
      icon: "Heart",
      title: "Família",
      description:
        "O alicerce de tudo - onde o amor nasce e os laços se tornam eternos.",
    },
    {
      icon: "Server",
      title: "Servidor Doméstico",
      description: "Entusiasmo-me em auto-hospedagem: Jellyfin, WireGuard, Bitwarden, Web Hosting, RAID e mais, a correr 24/7.",
    },
    {
      icon: "Cpu",
      title: "Eletrónica",
      description:
          "Onde o fascínio pela tecnologia se encontra com a prática; criando projetos inteligentes e conectados com ESP e Arduinos.",
    },
    {
      icon: "Bot",
    title: "Inteligência Artificial",
      description:
          "Apaixonado pelo mundo da Inteligência Artificial e pela criação de soluções que unem GenAI à otimização de tarefas do dia a dia.",
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
      "Audit logs"
    ],
    Tools: ["Git", "Linux", "VS Code", "Jira", "GoodDay", "PhpStorm", "WebStorm"],
  },
};
