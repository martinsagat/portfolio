import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function resolveContentDirectory(): string {
  const candidates = [
    path.join(process.cwd(), 'content'),
    path.join(process.cwd(), '.next', 'content'),
    path.join(process.cwd(), 'packages', 'portfolio', 'content'),
    path.join(__dirname, '..', 'content'),
    path.join(__dirname, '..', '.next', 'content'),
    '/var/task/content',
    '/var/task/.next/content',
    '/var/task/packages/portfolio/content',
  ];

  for (const candidate of candidates) {
    try {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
        return candidate;
      }
    } catch {
      // continue
    }
  }
  throw new Error('Content directory not found');
}

type Entry = {
  date: string;
  body: string;
  data: Record<string, unknown>;
};

function readMarkdown(filePath: string): Entry | null {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return {
    date: (data.date as string) || '2024-01-01',
    body: content.trim(),
    data: data as Record<string, unknown>,
  };
}

function loadJobs(root: string): string {
  const jobsDir = path.join(root, 'jobs');
  if (!fs.existsSync(jobsDir)) return '';
  const dirs = fs.readdirSync(jobsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory());
  const entries = dirs
    .map((d) => readMarkdown(path.join(jobsDir, d.name, 'index.md')))
    .filter((e): e is Entry => e !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return entries
    .map((e) => {
      const title = e.data.title || '';
      const company = e.data.company || '';
      const range = e.data.range || '';
      const tech = Array.isArray(e.data.tech) ? `Tech: ${e.data.tech.join(', ')}` : '';
      return `## ${title} — ${company} (${range})\n${tech}\n${e.body}`;
    })
    .join('\n\n---\n\n');
}

function loadProjects(root: string): string {
  const projectsDir = path.join(root, 'projects');
  if (!fs.existsSync(projectsDir)) return '';
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith('.md'));
  const entries = files
    .map((f) => readMarkdown(path.join(projectsDir, f)))
    .filter((e): e is Entry => e !== null)
    .filter((e) => e.data.showInProjects !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return entries
    .map((e) => {
      const title = e.data.title || '';
      const tech = Array.isArray(e.data.tech) ? `Tech: ${e.data.tech.join(', ')}` : '';
      return `## ${title}\n${tech}\n${e.body}`;
    })
    .join('\n\n---\n\n');
}

function loadPosts(root: string): string {
  const postsDir = path.join(root, 'posts');
  if (!fs.existsSync(postsDir)) return '';
  const dirs = fs.readdirSync(postsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory());
  const entries = dirs
    .map((d) => readMarkdown(path.join(postsDir, d.name, 'index.md')))
    .filter((e): e is Entry => e !== null)
    .filter((e) => !e.data.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return entries
    .map((e) => `## ${e.data.title || ''}\n${e.body}`)
    .join('\n\n---\n\n');
}

let cachedSystemPrompt: string | null = null;

export async function buildSystemPrompt(): Promise<string> {
  if (cachedSystemPrompt) return cachedSystemPrompt;

  const root = resolveContentDirectory();
  const jobsBlock = loadJobs(root);
  const projectsBlock = loadProjects(root);
  const postsBlock = loadPosts(root);

  cachedSystemPrompt = `You are an AI assistant embedded on Martin Sagat's portfolio website (martinsagat.com). You answer visitor questions about Martin's background, work, projects, and skills. Speak in third person about Martin — you are not Martin, you are his portfolio assistant.

# About Martin

Martin Sagat is a Senior Software Engineer based in Perth, Western Australia. He specializes in scalable web and mobile applications, AWS serverless architectures, TypeScript ecosystems, and cross-platform mobile (React Native). He has 7+ years of professional experience and currently runs PS Rewards as the sole engineer. He is fluent in AI-augmented engineering workflows (Claude Code, Cursor, MCP) and integrates AI capabilities into the products he builds.

Contact: martin.sagat@outlook.com.au · LinkedIn: linkedin.com/in/martinsagat · GitHub: github.com/martinsagat

# Professional Experience

${jobsBlock}

# Notable Projects

${projectsBlock}

# Writing

${postsBlock}

# How to respond

- Keep answers concise — 1 to 3 short paragraphs unless the question genuinely needs more depth.
- Ground every claim in the content above. If asked something you don't know, say so plainly and suggest the visitor email Martin directly at martin.sagat@outlook.com.au.
- Don't fabricate metrics, dates, employers, or tech. If a detail isn't in your context, say it isn't.
- Recruiters often ask about availability, location, salary, or visa — politely redirect those to email.
- Match the visitor's register: technical for engineers, plainer for non-technical questions.
- No emojis. No marketing fluff. No "I'd be happy to" preamble — just answer.
- When relevant, point visitors to specific sections (the hero, the experience timeline, the projects carousel) so they can read more.
- Refuse politely if asked to do anything outside the scope of discussing Martin's professional background (e.g. writing code, doing homework, off-topic chat).`;

  return cachedSystemPrompt;
}
