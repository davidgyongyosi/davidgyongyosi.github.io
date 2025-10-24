// Skills data
export interface Skill {
  name: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export const skillsData: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "C#" },
      { name: "Go" },
      { name: "Rust" },
      { name: "SQL" },
      { name: "HTML" },
    ]
  },
  {
    category: "Frameworks & Libraries",
    skills: [
      { name: "React" },
      { name: "Vue" },
      { name: "Angular" },
      { name: "Astro" },
      { name: "Next.js" },
      { name: "Svelte" },
      { name: "Electron" },
      { name: "Tauri" },
      { name: ".NET" }
    ]
  },
  {
    category: "Database & Data",
    skills: [
      { name: "MSSQL" },
      { name: "MySQL" },
      { name: "SQLite" },
      { name: "PostgreSQL" },
    ]
  },
  {
    category: "DevOps & Infrastructure",
    skills: [
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "Node.js" },
    ]
  },
  {
    category: "Tools & Styling",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Figma" },
      { name: "VS Code" },
      { name: "Neovim" },
      { name: "CSS" },
      { name: "SCSS" },
      { name: "Tailwind" },
    ]
  }
];
