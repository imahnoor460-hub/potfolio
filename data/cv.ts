export const profile = {
  name: "Mahnoor Iftikhar",
  title: "Computer Science Student · Full-Stack Developer & AI Engineer",
  location: "Lahore, Pakistan",
  phone: "+92 302-4717221",
  email: "imahnoor460@gmail.com",
  github: "https://github.com/imahnoor460-hub",
  linkedin: "https://www.linkedin.com/in/mahnoor-iftikhar-649366381/",
  summary:
    "Computer Science student at UCP with hands-on experience building full-stack web applications using Django, React, FastAPI, and Next.js, and integrating LLMs into AI-powered, agentic workflows. Also skilled in Unity and Blender, with a background in game development and 3D design.",
};

export const experience = {
  company: "Arbisoft",
  role: "AI Intern (Remote)",
  period: "June 8, 2026 – August 7, 2026",
  description:
    "Built full-stack web applications using Django and React. Learned about MCP, embeddings, and LLMs, and applied that knowledge to integrate LLMs into applications and build agentic workflows.",
};

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
  liveUrl?: string;
  image?: string;
  description: string;
  tags: string[];
  links: ProjectLink[];
};

export const projects: Project[] = [
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
    slug: "olx-clone",
    name: "OLX Clone",
    status: "Completed",
    description:
      "A full-stack marketplace application with a Django backend and React frontend. Implements authentication, product listings, search, and CRUD operations backed by a relational database.",
    tags: ["Django", "React", "Full Stack", "REST APIs"],
    links: [],
  },
  {
    slug: "savora",
    name: "Savora",
    status: "Completed",
    featured: true,
    image: "/projects/savora.png",
    description:
      "A restaurant web system built with a Django backend and React frontend, letting users browse menus and make table bookings.",
    tags: ["Django", "React", "Full Stack", "REST APIs"],
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
