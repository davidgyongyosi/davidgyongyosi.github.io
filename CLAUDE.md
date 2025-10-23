# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern, responsive portfolio website built with Astro, showcasing projects, skills, and professional information about David Gyongyosi. The site features a unique floating navigation system, modern card-based layouts, and a carefully crafted design system with the Geist Mono font and custom corner-border styling throughout.

**Site URL**: https://majin.dev

## Development Commands

- `npm run dev` or `npm start` - Start development server at http://localhost:4321
- `npm run build` - Type-check with Astro check, then build for production
- `npm run preview` - Preview production build locally

## Architecture

### Tech Stack
- **Framework**: Astro 5.2.5 (static site generation with component islands)
- **Styling**: SCSS with 7-1 pattern + Tailwind CSS 3.4.4 utilities
- **Typography**: Geist Mono (from Google Fonts)
- **Type-checking**: TypeScript 5.5.2 with `@astrojs/check` 0.7.0
- **Icons**: FontAwesome 6.5.2
- **Package Manager**: npm
- **Build Tools**: Astro check integration, Sass 1.77.6

### Project Structure

```
src/
├── assets/          # Images and static assets
│   ├── hero.png           # Hero section image (default)
│   ├── hero-ghibli.png    # Alternative hero image (Ghibli style)
│   └── hero-memoji.png    # Alternative hero image (Memoji)
├── components/      # Reusable Astro components
│   ├── Button.astro               # Reusable button component (primary, compact, link, secondary variants)
│   ├── Navigation.astro           # Floating draggable navigation
│   ├── ProjectCard.astro          # Modern project display card
│   ├── SkillCard.astro            # Skill category card with count
│   ├── Quote.astro                # Quote component
│   ├── HackedText.astro           # Animated text effect
│   ├── SectionHeader.astro        # Reusable section headers
│   ├── SkillMatrix.astro          # Terminal-style skill matrix display (currently in use)
│   ├── SkillTerminal.astro        # Alternative terminal-themed skill viewer
│   └── sections/                  # Page section components
│       ├── HeroSection.astro
│       ├── ProjectsSection.astro
│       ├── SkillsSection.astro    # Uses SkillMatrix component
│       └── AboutSection.astro
├── data/            # TypeScript data files
│   ├── projects.ts  # Project data with enhanced metadata
│   └── skills.ts    # Skills organized by category (5 categories, 33 total skills)
├── layouts/         # Page layout templates
│   └── MainLayout.astro  # Main layout with nav and footer
├── pages/           # File-based routing (Astro convention)
│   ├── index.astro     # Home page
│   ├── about.astro     # About page
│   ├── works.astro     # Projects listing by category
│   └── contact.astro   # Contact page
└── styles/          # SCSS architecture (7-1 pattern)
    ├── abstracts/      # Variables, mixins, functions
    │   ├── _variables.scss  # Design tokens
    │   ├── _mixins.scss     # Reusable mixins
    │   └── _index.scss      # Forward exports
    ├── base/           # Reset, typography
    │   ├── _reset.scss
    │   └── _typography.scss
    ├── components/     # Component-specific styles
    │   ├── _navigation.scss
    │   ├── _cards.scss
    │   ├── _buttons.scss    # Centralized button styles (ALL button variants)
    │   └── _hacked-text.scss
    ├── layout/         # Layout styles
    │   ├── _container.scss  # Site structure & footer
    │   └── _pages.scss      # Page-specific layouts
    ├── utils/          # Utilities
    │   ├── _animations.scss
    │   └── _helpers.scss
    ├── global.scss     # Main SCSS entry point using @use syntax
    └── global.js       # Draggable nav & scroll animations
```

### Key Design Patterns

**Component-Based Architecture**:
- Reusable section components in `src/components/sections/`
- All components use TypeScript interfaces for type-safe props
- Component templates are style-free - all styling lives in SCSS files
- Data-driven approach with centralized content in `src/data/`

**Layout System**:
All pages use `MainLayout.astro`, which provides:
- Modern site structure with max-width containers (1400px)
- Floating navigation with boundary constraints
- Professional footer with social links
- FontAwesome and global scripts
- Proper semantic HTML structure

**Data Management**:
- **Centralized data**: Projects and skills stored in TypeScript files (`src/data/`)
- **Type-safe interfaces**: Full TypeScript definitions for all data structures
- **Helper functions**: `getFeaturedProjects()`, `getProjectsByCategory()` for data access
- **Enhanced metadata**: Projects include year, status, role, and highlights
- **Skills data**: 31 skills across 5 categories (Languages, Frameworks & Libraries, Database & Data, DevOps & Infrastructure, Tools & Styling)

**Styling Architecture** (7-1 Pattern):
- **Modern @use/@forward syntax**: Uses `@use 'abstracts/variables' as *;` throughout, no deprecated `@import`
- **Design tokens** in `abstracts/_variables.scss`:
  - Primary color: `#56b6c2` (cyan)
  - Typography: `'Geist Mono', monospace`
  - Spacing scale, transitions, breakpoints, z-index layers
- **Reusable mixins** in `abstracts/_mixins.scss`:
  - `corner-border()` - Signature 8-gradient pattern used throughout
  - `respond-to()` - Responsive breakpoint helper
  - Button and card style mixins
- **Component styles** centralized in `components/_cards.scss`, `components/_buttons.scss`, `components/_navigation.scss`, `components/_hacked-text.scss`
- **No inline styles**: All styling in global SCSS for maintainability
- **Grid background**: Custom gradient effect in `base/_reset.scss`
- **Global entry point**: `global.scss` imports all SCSS modules using modern syntax

**Navigation System**:
- **Floating & draggable**: Can be repositioned anywhere on screen
- **Boundary constraints**: Prevents navigation from going off-screen
- **Double-click reset**: Reset to initial position
- **Touch support**: Works on mobile devices
- **Auto-adjustment**: Repositions on window resize
- **Active state highlighting**: Current page visually indicated

**Card Design System**:
- **Project Cards**: Modern, information-rich layout with:
  - Header (title, year badge, status/role badges)
  - Description and highlights list
  - Footer with tags and external link
  - Flexible sizing (300-420px)
  - Status badges (completed/in-progress/ongoing) with color coding
- **Skill Cards**: Organized display with:
  - Header with skill count badge
  - Grid layout for skills
  - Individual hover effects
  - "& more..." indicator
  - Flexible sizing (280-360px)

**Button System** (Centralized & Reusable):
- **Component**: `Button.astro` - Single reusable button component for all button needs
- **Variants**:
  - `primary` - Standard button with corner-border and primary color background (default)
  - `compact` - Smaller button variant for inline actions (e.g., hero CTA)
  - `link` - Link-styled button for cards and navigation (e.g., project cards)
  - `secondary` - Alternative color scheme button
- **Usage**: Import and use `<Button href="..." variant="compact">Text</Button>` instead of creating custom button styles
- **Styling**: ALL button styles centralized in `src/styles/components/_buttons.scss`
- **Props**:
  - `href` - URL for link buttons (renders as `<a>` tag)
  - `variant` - Style variant (primary/compact/link/secondary)
  - `target` - Link target (e.g., `_blank`)
  - `rel` - Link rel attribute (e.g., `noreferrer noopener`)
  - `icon` - Optional FontAwesome icon class
  - `disabled` - Disabled state
- **Key Features**:
  - Corner-border pattern consistent across all variants
  - Smooth hover animations (translateY, background expansion)
  - Hardware-accelerated transitions
  - Accessibility support (aria-label, disabled states)
  - Icon support with proper spacing
- **Migration**: All buttons (HeroSection, AboutSection, ProjectCard) now use this component

**Skills Showcase System**:
- **Current Implementation**: SkillsSection uses `SkillMatrix.astro` component
- **SkillMatrix**: Terminal-style interface with:
  - Terminal window header with controls
  - Left sidebar showing categories with color indicators
  - Main grid displaying all skills as interactive tiles
  - Skill tiles show name, category, and tech-themed descriptions
  - Icon integration using DevIcon and Simple Icons CDN
  - Matrix-style background effects (rain, grid, scanlines)
  - Statistics footer showing modules, packages, and averages
  - Fully responsive design with mobile-first approach
- **Alternative Component**: `SkillTerminal.astro` available as alternative terminal-themed skill viewer

**Animation System**:
- **Section reveals**: Intersection Observer triggers fade-in animations on scroll
- **Hover effects**: Subtle transforms and color transitions on interactive elements
- **Hacked Text effect**: Matrix-style text scrambling animation on hover (HackedText.astro)
- **Accessibility**: Respects `prefers-reduced-motion` setting
- **Performance**: Hardware-accelerated CSS transforms for smooth 60fps animations

### Color Scheme & Design Language

**Primary Palette**:
- Primary accent: `#56b6c2` (cyan) - used for headings, links, borders, corner accents
- Background: `#282c34` (dark) with subtle grid overlay
- Text: White (`#ffffff`) with gray (`#9ca3af`) for secondary content
- Success: `#4ade80` (green) for completed status
- Warning: `#fbbf24` (yellow) for in-progress status

**Signature Design Element**:
- **Corner borders**: 8-gradient pattern creating decorative corners on cards and navigation
- Used consistently across all interactive elements (navigation, project cards, skill cards)
- Defined in `abstracts/_mixins.scss` as `corner-border()` mixin with customizable size parameter
- Default size 17px, responsive sizing based on component type (5px-17px range)
- Creates visual hierarchy and modern aesthetic throughout the site

### Responsive Design

**Breakpoints** (mobile-first):
- `sm`: 640px - Tablets and up
- `md`: 768px - Small desktops
- `lg`: 1024px - Large desktops
- `xl`: 1280px - Extra large screens

**Responsive Patterns**:
- Navigation wraps on small screens, drag handle accessible
- Cards: Flexible sizing with `min-width`/`max-width`, full-width on mobile
- Layout: Column stacking on mobile → multi-column on desktop
- Container: Max-width 1400px, centered with responsive padding
- Footer: Vertical stack on mobile → horizontal layout on desktop

### Type Safety & Data

**TypeScript Integration**:
- All components have type-safe props via interfaces
- Data files (`src/data/`) fully typed with exported interfaces
- Build-time type checking with `astro check`
- No `any` types - full type coverage

**Project Data Structure**:
```typescript
interface Project {
  title: string;
  description: string;
  link: string;
  linkText: string;
  tags: string[];
  year?: string;
  status?: 'completed' | 'in-progress' | 'ongoing';
  role?: string;
  highlights?: string[];
  featured?: boolean;
  category?: 'large' | 'small' | 'in-progress';
}
```

**Skills Data Structure**:
```typescript
interface Skill {
  name: string;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

// Current skillsData includes 5 categories with 31 total skills:
// - Languages (7 skills): TypeScript, JavaScript, C#, Go, Rust, SQL, HTML
// - Frameworks & Libraries (9 skills): React, Vue, Angular, Astro, Next.js, Svelte, Electron, Tauri, .NET
// - Database & Data (4 skills): MSSQL, MySQL, SQLite, PostgreSQL
// - DevOps & Infrastructure (3 skills): Docker, Kubernetes, Node.js
// - Tools & Styling (8 skills): Git, GitHub, Figma, VS Code, Neovim, CSS, SCSS, Tailwind
```

### Configuration Files

**package.json**:
- **Project name**: "portfolio" (version 0.0.1)
- **Scripts**: Standard Astro commands (dev, build, preview, astro)
- **Dependencies**: Astro 5.2.5, Tailwind integration, FontAwesome, TypeScript
- **Dev dependencies**: Sass 1.77.6 for SCSS compilation

**astro.config.mjs**:
- **Site URL**: https://majin.dev
- **Integrations**: Tailwind CSS via `@astrojs/tailwind`
- **Configuration**: Minimal setup with Tailwind content paths configured

**TypeScript Configuration**:
- **Base config**: Uses `astro/tsconfigs/strict` for maximum type safety
- **Type definitions**: `env.d.ts` for ambient module declarations
- **Strict mode**: Enforced throughout the codebase

## Important Implementation Details

**Navigation**:
- Drag handle ID: `mydivheader` - used for drag functionality
- Double-click the drag handle to reset position
- Boundary constraints implemented via `constrainToBounds()` function (10px minimum visible)
- Position stored in inline styles (not localStorage currently)
- Touch events supported for mobile dragging with `touchstart`, `touchmove`, `touchend`
- Active state highlighting with `aria-current="page"` for current page
- Auto-repositioning on window resize to maintain boundaries

**Build Process**:
- Type-checking runs before build (`astro check`)
- Zero errors, warnings, or hints required for clean build
- SCSS compiles to CSS with no deprecation warnings
- All external URLs validated during build

**Performance Considerations**:
- Intersection Observer for efficient scroll animations with threshold-based triggering
- CSS transforms for hardware acceleration (GPU-accelerated)
- Minimal JavaScript - only for navigation drag, scroll animations, and text effects
- Static site generation - no client-side routing or complex JavaScript frameworks
- Optimized asset loading through Astro's built-in asset optimization
- Efficient SCSS compilation with modern @use syntax reducing redundant imports

**Accessibility**:
- Semantic HTML throughout (`<nav>`, `<article>`, `<section>`, `<main>`, `<footer>`)
- ARIA labels on interactive elements (navigation, external links)
- Focus visible states on keyboard navigation with proper `:focus-visible` styling
- Respects `prefers-reduced-motion` for animations
- Proper heading hierarchy (h1 → h2 → h3 structure)
- Touch-friendly drag handle for mobile navigation
- Screen reader compatible navigation with proper link descriptions

## Recent Major Updates

1. **Font Migration**: Switched from Inconsolata/Monaco/Space Mono → Geist Mono
2. **SCSS Refactor**: Complete migration to 7-1 pattern with modern @use/@forward syntax
3. **Layout Modernization**: Added max-width containers (1400px), professional footer, centered content
4. **Navigation Enhancement**: Advanced draggable navigation with boundary constraints, double-click reset, touch support
5. **Card Redesign**: Modern layouts with rich metadata, status badges, highlights, and responsive sizing
6. **Data Centralization**: Moved content to TypeScript data files with helper functions and type safety
7. **Component Extraction**: Created reusable section components (HeroSection, ProjectsSection, SkillsSection, AboutSection)
8. **Animation System**: Added Intersection Observer scroll animations and HackedText matrix effect
9. **Configuration Modernization**: Updated to Astro 5.2.5 with TypeScript strict mode and Tailwind integration
10. **Enhanced Components**: Added SectionHeader and Quote components for better content organization
11. **Responsive Design**: Mobile-first approach with comprehensive breakpoint system
12. **Accessibility Improvements**: Enhanced semantic HTML, ARIA labels, and keyboard navigation
13. **Skills Showcase System**: Implemented SkillMatrix component with terminal-style interface, replacing traditional skill cards
14. **Alternative Skill Component**: Created SkillTerminal as alternative terminal-themed skill viewer
15. **Enhanced Skills Data**: Expanded to 31 skills across 5 categories with icon integration and tech-themed descriptions
16. **Hero Image Additions**: Added multiple hero image variants (hero.png, hero-ghibli.png, hero-memoji.png) for visual variety
17. **Button System Refactor**: Created centralized Button component with multiple variants (primary, compact, link, secondary), eliminating style duplication across components. All button styles now in `_buttons.scss`, all button usage through `Button.astro` component

## Development Guidelines

### When Adding New Components

1. **File Structure**: Place components in `src/components/` for reusable elements or `src/components/sections/` for page sections
2. **Props Interface**: Always define TypeScript interfaces for component props
3. **Styling**: Add component-specific styles to appropriate `src/styles/components/_*.scss` file
4. **Imports**: Use modern `@use` syntax in SCSS, never `@import` (except for external fonts)
5. **Data Management**: For content that changes frequently, consider using the data files pattern in `src/data/`

### When Working With Skill Components

1. **Current Implementation**: The SkillsSection uses `SkillMatrix.astro` as the active skill display component
2. **Alternative Option**: `SkillTerminal.astro` is available as an alternative terminal-themed viewer. To switch, modify the import in `src/components/sections/SkillsSection.astro`
3. **Data Source**: All skill components use the `skillsData` from `src/data/skills.ts` with type-safe `SkillCategory[]` prop
4. **Icon Integration**: Use DevIcon and Simple Icons CDN URLs for consistent, high-quality skill icons
5. **Color Scheme**: Follow the established category color mapping:
   - Languages: `#56b6c2` (cyan)
   - Frameworks & Libraries: `#fbbf24` (yellow)
   - Database & Data: `#4ade80` (green)
   - DevOps & Infrastructure: `#e06c75` (red)
   - Tools & Styling: `#a78bfa` (purple)
6. **Responsive Design**: All skill components must be mobile-first with breakpoints at 640px, 768px, and 1024px
7. **Interactive Elements**: Include hover states, transitions, and accessibility features (ARIA labels, keyboard navigation)
8. **Animation**: Respect `prefers-reduced-motion` and use hardware-accelerated CSS transforms

### When Modifying Styles

1. **Design Tokens**: Use variables from `abstracts/_variables.scss` for colors, spacing, typography
2. **Mixins**: Leverage existing mixins like `corner-border()` and `respond-to()` for consistency
3. **Responsive**: Always test across breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
4. **Performance**: Prefer CSS transforms over properties that trigger layout recalculations

### Avoiding Style Duplication (IMPORTANT)

**Problem**: Component-level styles can lead to duplication when similar elements (buttons, cards, etc.) are styled separately across multiple components.

**Solution**: Follow this hierarchy to prevent duplication:

1. **Use Existing Components First**:
   - ALWAYS check if a reusable component exists before creating custom styles
   - Example: Use `<Button variant="link">` instead of creating `.custom-link` styles
   - Available reusable components:
     - `Button.astro` - All button/link actions
     - `SectionHeader.astro` - Section titles
     - `HackedText.astro` - Animated text effects
     - `Quote.astro` - Quotations

2. **Check Global Styles Second**:
   - Before adding component-specific styles, check if styles exist in:
     - `src/styles/components/_buttons.scss` - Button variants
     - `src/styles/components/_cards.scss` - Card layouts
     - `src/styles/utils/_helpers.scss` - Utility classes
   - Use existing classes like `.btn`, `.btn-compact`, `.btn-link`, `.btn-secondary`

3. **Add to Global Styles, Not Component Styles**:
   - If you need a new button variant or common element, add it to the appropriate global SCSS file
   - DO NOT add `<style>` blocks in components for common elements
   - Component `<style>` blocks should ONLY contain layout-specific styles unique to that component

4. **Extract Common Patterns**:
   - If you find yourself copying styles between components, create a reusable component or global class
   - Example: Corner-border pattern → Use `corner-border()` mixin, don't duplicate the gradient code

5. **Styling Checklist**:
   - [ ] Does a reusable component exist for this element?
   - [ ] Can I use an existing global class?
   - [ ] Is this style truly unique to this component, or will it be reused?
   - [ ] Have I checked `_buttons.scss`, `_cards.scss`, and `_helpers.scss`?
   - [ ] Am I using mixins for common patterns (corner-border, respond-to)?

**Example - Wrong Approach**:
```astro
<!-- HeroSection.astro -->
<style>
  .my-button {
    background: linear-gradient(...); /* Duplicating corner-border pattern */
    padding: 0.5rem;
  }
</style>
```

**Example - Correct Approach**:
```astro
<!-- HeroSection.astro -->
<Button variant="compact" href="...">Click me</Button>
<!-- No custom styles needed! -->
```

### When Adding New Pages

1. **Layout**: Use `MainLayout.astro` for consistency across all pages
2. **Routing**: Follow Astro's file-based routing convention
3. **SEO**: Ensure proper meta tags and semantic HTML structure
4. **Navigation**: Update the navigation component if adding new main sections
