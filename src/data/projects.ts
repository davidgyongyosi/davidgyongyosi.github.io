// Project data
export interface Project {
  title: string;
  description: string;
  link: string;
  linkText: string;
  tags: string[];
  featured?: boolean;
  category?: 'large' | 'small' | 'in-progress';
  year?: string;
  status?: 'completed' | 'in-progress' | 'ongoing';
  role?: string;
  highlights?: string[];
}

export const projects: Project[] = [
  // Large projects
  {
    title: "Thesis work",
    description: "Full-stack web app for school navigation using 3D assets and Augmented Reality",
    link: "https://github.com/davidgyongyosi/davidgyongyosi_thesis",
    linkText: "github",
    tags: ["Asp.net", "Angular", "Ionic"],
    featured: true,
    category: 'large',
    year: "2023",
    status: "completed",
    role: "Full-stack Developer",
    highlights: ["3D navigation", "AR integration", "Real-time pathfinding"]
  },
  {
    title: "School Group Project (ProgGame)",
    description: "Full-stack web app about learning to code with gamification",
    link: "https://github.com/bprof-spec-codes/proggame",
    linkText: "github",
    tags: ["Asp.net", "Angular", "SCRUM"],
    category: 'large'
  },
  {
    title: "School Group Project (SpecChat)",
    description: "Full-stack web app clone of slack",
    link: "https://github.com/bprof-spec-codes/specchat",
    linkText: "github",
    tags: ["Asp.net", "Angular", "SCRUM", "Frontend"],
    category: 'large'
  },

  // Small projects
  {
    title: "My portfolio",
    description: "You are currently browsing my portfolio website",
    link: "https://github.com/davidgyongyosi/davidgyongyosi.github.io",
    linkText: "github",
    tags: ["Astro", "SCSS", "JS", "Tailwind"],
    featured: true,
    category: 'small'
  },
  {
    title: "ADT School Project",
    description: "Application for learning data structures and algorithms (advanced development techniques)",
    link: "https://github.com/davidgyongyosi/davidgyongyosi_ADT_2022231",
    linkText: "github",
    tags: ["Asp.net Core", "EF Core", "xUnit"],
    featured: true,
    category: 'small'
  },
  {
    title: "ASP School Project",
    description: "A game database application with ASP.NET Core MVC",
    link: "https://github.com/davidgyongyosi/davidgyongyosi_ASP_2022231",
    linkText: "github",
    tags: ["Asp.net Core", "EF Core", "Razor Pages"],
    featured: true,
    category: 'small'
  },
  {
    title: "Investment App",
    description: "A crypto investment app with Asp.net & Angular",
    link: "https://github.com/davidgyongyosi/Investment-app",
    linkText: "github",
    tags: ["Asp.net", "Angular", "Tailwind"],
    featured: true,
    category: 'small'
  },

  // In progress
  {
    title: "Rpg Game Project",
    description: "My rpg inspired by Spiral Knights is currently in development..",
    link: "https://www.spiralknights.com",
    linkText: "in_progress",
    tags: ["Godot", "GdScript", "3D Engine", "RPG"],
    category: 'in-progress'
  },
  {
    title: "Component Library",
    description: "An Angular component library is currently under design...",
    link: "https://github.com/davidgyongyosi/Unnamed-UI",
    linkText: "in_progress",
    tags: ["Typscript", "CSS", "JavaScript"],
    category: 'in-progress'
  }
];

// Helper functions
export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getProjectsByCategory = (category: Project['category']) =>
  projects.filter(p => p.category === category);
