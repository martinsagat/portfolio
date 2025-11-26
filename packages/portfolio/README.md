# Portfolio Website

A modern, responsive portfolio website built with Next.js 16, React 19, and Material-UI (MUI).

## Features

- 🚀 Next.js 16 with App Router
- 🎨 Material-UI (MUI) for modern, accessible components
- 📱 Fully responsive design
- 🌙 Dark theme optimized
- 📝 Markdown-based content management
- ⚡ Server-side rendering and static generation
- 🎯 TypeScript for type safety

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

```
packages/portfolio/
├── app/                 # Next.js App Router pages
│   ├── api/            # API routes
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── sections/      # Page sections
│   ├── Nav.tsx        # Navigation component
│   └── Footer.tsx     # Footer component
├── content/            # Markdown content files
│   ├── jobs/          # Job experience
│   ├── projects/      # Project descriptions
│   ├── posts/         # Blog posts
│   └── hobbies/       # Hobbies/interests
├── lib/                # Utility functions
│   ├── config.ts      # Site configuration
│   └── content.ts     # Content loading utilities
├── public/             # Static assets
└── theme/              # MUI theme configuration
```

## Content Management

Content is managed through Markdown files in the `content/` directory:

- **Jobs**: `content/jobs/[company]/index.md`
- **Projects**: `content/projects/*.md`
- **Posts**: `content/posts/[slug]/index.md`
- **Hobbies**: `content/hobbies/[name]/index.md`

## Technologies

- Next.js 16
- React 19
- Material-UI (MUI)
- TypeScript
- Gray Matter (Markdown parsing)
- Remark (Markdown to HTML)

## License

MIT
