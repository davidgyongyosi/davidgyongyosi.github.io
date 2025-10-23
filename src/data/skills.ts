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
      { name: "Typescript" },
      { name: "JavaScript" },
      { name: "C#" },
      { name: "SQL" },
      { name: "HTML" },
      { name: "CSS" },
    ]
  },
  {
    category: "Database",
    skills: [
      { name: "MSSQL" },
      { name: "MySQL" },
      { name: "SQLite" },
      { name: "MongoDB" },
    ]
  },
  {
    category: "Frameworks",
    skills: [
      { name: "React" },
      { name: "Vue" },
      { name: "Angular" },
      { name: "Astro" },
      { name: "Next.js" },
      { name: ".NET" }
    ]
  },
  {
    category: "Tools",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Figma" },
      { name: "VS Code" },
      { name: "VSCodium" },
      { name: "Neovim" }
    ]
  },
  {
    category: "Others",
    skills: [
      { name: "Node.js" },
      { name: "Tailwind" },
      { name: "Docker" },
      { name: "Linux" },
      { name: "SCSS" },
    ]
  }
];
