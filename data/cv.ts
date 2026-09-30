export const profile = {
  name: "Mahnoor Iftikhar",
  title: "Computer Science Student · Full-Stack Developer & AI Engineer",
  location: "Lahore, Pakistan",
  phone: "+92 302-4717221",
  email: "imahnoor460@gmail.com",
  github: "https://github.com/imahnoor460-hub",
  linkedin: "https://www.linkedin.com/in/mahnoor-iftikhar-8672a6362/",
  summary:
    "Computer Science student at UCP with hands-on experience building full-stack web applications using Django, React, FastAPI, and Next.js, and integrating LLMs into AI-powered, agentic workflows. Also skilled in Unity and Blender, with a background in game development and 3D design.",
};

export type ExperienceEntry = {
  company: string;
  role: string;
  period?: string;
  description: string;
  certificateUrl?: string;
};

export const experiences: ExperienceEntry[] = [
  {
    company: "Arbisoft",
    role: "AI Intern (Remote)",
    period: "June 8, 2026 – August 7, 2026",
    description:
      "Built full-stack web applications using Django and React. Learned about MCP, embeddings, and LLMs, and applied that knowledge to integrate LLMs into applications and build agentic workflows.",
    certificateUrl: "/documents/arbisoft-experience-letter.pdf",
  },
  {
    company: "Arch Technologies",
    role: "ML Intern (Remote)",
    period: "September 1, 2026 – November 4, 2026",
    description:
      "Developed and evaluated machine learning models using Python, NumPy, Pandas, and Scikit-learn. Explored neural networks and deep learning with PyTorch, and worked on NLP tasks including text classification, embeddings, and transformers. Gained exposure to LLM application development, RAG pipelines, and vector databases.",
  },
];

export type EducationEntry = {
  school: string;
  degree: string;
  period: string;
};

export const education: EducationEntry[] = [
  {
    school: "University of Central Punjab (UCP), Lahore",
    degree: "Bachelor's in Computer Science",
    period: "Sep 2023 – Sep 2027",
  },
  {
    school: "GOVT. Degree College for Women, Lahore",
    degree: "Intermediate (ICS / FSc)",
    period: "Oct 2020 – May 2022",
  },
];

export type ProjectStatus = "Completed" | "Completed · Deployed";

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  name: string;
  status: ProjectStatus;
  featured?: boolean;
  homepage?: boolean;
  liveUrl?: string;
  image?: string;
  // CSS aspect-ratio value, e.g. "482/560" for a portrait screenshot.
  // Defaults to 16/9 (aspect-video) when unset.
  imageAspect?: string;
  description: string;
  tags: string[];
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    slug: "savora",
    name: "Savora",
    status: "Completed · Deployed",
    homepage: true,
    liveUrl: "https://mahnoor-savora-one.vercel.app/",
    image: "/projects/savora.jpg",
    description:
      "A restaurant web system built with a Django backend and React frontend, letting users browse menus and make table bookings.",
    tags: ["Django", "React", "Full Stack", "REST APIs"],
    links: [{ label: "GitHub", href: "https://github.com/imahnoor460-hub/Savora" }],
  },
  {
    slug: "olx-clone",
    name: "OLX Clone",
    status: "Completed · Deployed",
    homepage: true,
    liveUrl: "https://olx-frontend-eight.vercel.app/",
    image: "/projects/olx-clone.png",
    description:
      "A full-stack marketplace application with a Django backend and React frontend. Implements authentication, product listings, search, and CRUD operations backed by a relational database.",
    tags: ["Django", "React", "Full Stack", "REST APIs"],
    links: [{ label: "GitHub", href: "https://github.com/imahnoor460-hub/OLX-Clone." }],
  },
  {
    slug: "unity-game-development",
    name: "Unity Game Development",
    status: "Completed",
    description:
      "Developed multiple games in Unity, including a 3D endless runner, an FPS shooter, and a 2D game. Implemented core mechanics such as player movement, shooting, obstacles, scoring, and UI, while working with physics, animations, and collision systems. Focused throughout on smooth gameplay and performance optimization.",
    tags: ["Unity", "C#", "Game Mechanics", "Physics", "Animation"],
    links: [],
  },
  {
    slug: "3d-environment-design",
    name: "3D Environment Design",
    status: "Completed",
    description:
      "Created 3D models and environments for games using Blender, designing both realistic and stylized assets and integrating them into Unity projects.",
    tags: ["Blender", "3D Modeling", "Environment Art"],
    links: [],
  },
  {
    slug: "library-management-system",
    name: "Library Management System",
    status: "Completed",
    description:
      "Built a system for managing book inventory, issuing, and returns, with an optimized database schema designed in MySQL. Implemented features for tracking availability and user records to ensure efficient data retrieval and management.",
    tags: ["MySQL", "Database Design", "SQL"],
    links: [],
  },
  {
    slug: "competitive-intelligence-monitor",
    name: "Competitive Intelligence Monitor",
    status: "Completed · Deployed",
    featured: true,
    homepage: true,
    liveUrl: "https://competitive-intelligence-monitor.vercel.app/",
    image: "/projects/dashboard.png",
    description:
      "A dashboard that tracks competitors' websites, pricing, and updates, surfacing the findings in a live, easy-to-read view.",
    tags: ["Next.js", "Dashboard", "Data Visualization", "Web Scraping"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/imahnoor460-hub/Competitive_Intelligence_Monitor_",
      },
    ],
  },
  {
    slug: "portfolio-ai-assistant",
    name: "Portfolio AI Chat Assistant",
    status: "Completed · Deployed",
    homepage: true,
    image: "/projects/portfolio-ai-assistant.png",
    imageAspect: "482/560",
    description:
      "The chat widget on this site (bottom-right) — a RAG-grounded assistant that answers questions using this portfolio's real content, with voice input/output and a live GitHub tool so it can answer questions a static bio can't, like a repo's star count or what its README says.",
    tags: ["Next.js", "RAG", "Embeddings", "Tool Calling", "Web Speech API"],
    links: [],
  },
];

export type SkillGroup = {
  category: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  { category: "Programming Languages", skills: ["Python", "C++", "C#", "Java", "SQL"] },
  { category: "Game Development", skills: ["Unity", "Game Mechanics", "Scene Design"] },
  { category: "3D Design & Tools", skills: ["Blender", "3D Modeling", "Environment Creation"] },
  { category: "Full-Stack Web", skills: ["Django", "React", "FastAPI", "Next.js"] },
  { category: "AI & LLMs", skills: ["LLM Integration", "Embeddings", "MCP", "Agentic Workflows"] },
  {
    category: "Machine Learning & NLP",
    skills: [
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "PyTorch",
      "Neural Networks",
      "NLP",
      "Transformers",
      "RAG",
      "Vector Databases",
    ],
  },
  {
    category: "Cloud (AWS)",
    skills: ["EC2", "EKS", "CloudFront", "DynamoDB", "API Gateway", "S3", "CloudWatch"],
  },
  {
    category: "Other Technologies",
    skills: ["Firebase (Basic)", "UI/UX Fundamentals"],
  },
];

export type Certification = {
  name: string;
  issuer?: string;
  fileUrl?: string;
  verifyUrl?: string;
};

export const certifications: Certification[] = [
  {
    name: "ChatGPT Prompt Engineering for Developers",
    issuer: "DeepLearning.AI",
    verifyUrl:
      "https://learn.deeplearning.ai/courses/chatgpt-prompt-eng/lesson/dfbds/introduction",
  },
  {
    name: "Agent Skills with Anthropic",
    issuer: "DeepLearning.AI",
    verifyUrl:
      "https://learn.deeplearning.ai/courses/agent-skills-with-anthropic/lesson/ldn5c3/introduction",
  },
  {
    name: "Google Cloud Skills Boost — Public Profile",
    issuer: "Google",
    verifyUrl: "https://www.skills.google/public_profiles/0f1026d4-856c-4b37-949f-b7deea965478",
  },
];

export type ArticleEntry = {
  title: string;
  summary: string;
  date?: string;
  url?: string;
  image?: string;
};

export const articles: ArticleEntry[] = [
  {
    title: "AI Agents Are Getting Employee IDs. What Does an Agent Need on Day One?",
    summary:
      "What AI agents actually need to operate safely and accountably — identity, scoped permissions, a dedicated workspace, spending limits, human approval gates, and a real offboarding process — treating agent infrastructure like employee onboarding, not just prompt engineering.",
    image: "/articles/agent-employee-id.jpg",
  },
  {
    title:
      "Beyond the Chatbot: Why the Model Context Protocol (MCP) is the USB-C Moment for AI Agents",
    summary: "A write-up on building agentic workflows with LLMs.",
    image: "/articles/agentic-workflows.jpg",
    url: "https://medium.com/@imahnoor460/beyond-the-chatbot-why-the-model-context-protocol-mcp-is-the-usb-c-moment-for-ai-agents-a419ec6cd658",
  },
  {
    title:
      "I Stopped SSH-ing Into My Server to Deploy: How to Build a Bulletproof Node.js CI/CD Pipeline with GitHub Actions",
    summary:
      "A practical guide to automating deployments with GitHub Actions so you never SSH into a server again.",
    image: "/articles/fullstack-deploy.jpg",
    url: "https://medium.com/@imahnoor460/i-stopped-ssh-ing-into-my-server-to-deploy-building-a-node-js-ci-cd-pipeline-with-github-actions-1043a188169a",
  },
  {
    title: "Beyond the Context Window: Engineering Memory for Production AI Agents",
    summary:
      "A look at how to give AI agents durable, structured memory beyond a single context window.",
    image: "/articles/agent-memory.jpg",
    url: "https://medium.com/@imahnoor460/beyond-the-context-window-engineering-memory-for-production-ai-agents-8199da181321",
  },
];
