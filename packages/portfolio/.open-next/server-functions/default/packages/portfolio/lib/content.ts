import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

// Configure marked to return HTML string
marked.setOptions({
  breaks: true,
  gfm: true,
});

// Resolve content directory - handle both local dev and Lambda environments
function getContentDirectory(): string {
  // Try multiple possible paths
  const possiblePaths = [
    path.join(process.cwd(), 'content'),
    path.join(process.cwd(), '.next', 'content'), // After build copy
    path.join(process.cwd(), 'packages', 'portfolio', 'content'),
    path.join(__dirname, '..', 'content'),
    path.join(__dirname, '..', '.next', 'content'),
    '/var/task/content', // Lambda default
    '/var/task/.next/content', // Lambda with copied content
    '/var/task/packages/portfolio/content', // Lambda with monorepo
  ];
  
  for (const dirPath of possiblePaths) {
    try {
      if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
        console.log(`[Content] Using content directory: ${dirPath}`);
        return dirPath;
      }
    } catch (e) {
      // Continue to next path
    }
  }
  
  // Log error for debugging
  console.error(`[Content] Content directory not found. process.cwd(): ${process.cwd()}, __dirname: ${__dirname}`);
  console.error(`[Content] Tried paths:`, possiblePaths);
  
  // Fallback to process.cwd() even if it doesn't exist (will throw a better error)
  return path.join(process.cwd(), 'content');
}

const contentDirectory = getContentDirectory();

export interface Project {
  title: string;
  date: string;
  github?: string;
  external?: string;
  tech: string[];
  showInProjects?: boolean;
  content: string;
  htmlContent: string;
}

export interface Job {
  title: string;
  company: string;
  location: string;
  range: string;
  url: string;
  logo: string;
  tech: string[];
  date: string;
  content: string;
  htmlContent: string;
}

export interface Post {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
  draft?: boolean;
  content: string;
  htmlContent: string;
}

export interface Hobby {
  title: string;
  content: string;
  htmlContent: string;
  images: string[];
}

export async function getProjects(): Promise<Project[]> {
  const projectsDirectory = path.join(contentDirectory, 'projects');
  const fileNames = fs.readdirSync(projectsDirectory);
  
  const projects = await Promise.all(
    fileNames
      .filter((name) => name.endsWith('.md'))
      .map(async (fileName) => {
        const fullPath = path.join(projectsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        const htmlContent = marked(content);

        return {
          ...data,
          content,
          htmlContent,
          date: data.date || '2024-01-01',
          tech: data.tech || [],
        } as Project;
      })
  );

  return projects
    .filter((p) => p.showInProjects !== false)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export async function getJobs(): Promise<Job[]> {
  const jobsDirectory = path.join(contentDirectory, 'jobs');
  const companyDirs = fs.readdirSync(jobsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const jobs = await Promise.all(
    companyDirs.map(async (companyDir) => {
      const companyPath = path.join(jobsDirectory, companyDir);
      const indexPath = path.join(companyPath, 'index.md');
      
      if (!fs.existsSync(indexPath)) {
        return null;
      }

      const fileContents = fs.readFileSync(indexPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      const htmlContent = marked(content);

      // Find logo file
      const files = fs.readdirSync(companyPath);
      const logoFile = files.find((f) => 
        f.match(/\.(png|jpg|jpeg|svg)$/i) && !f.includes('index')
      );

      return {
        ...data,
        logo: logoFile ? `/content/jobs/${companyDir}/${logoFile}` : '',
        content,
        htmlContent,
        date: data.date || '2024-01-01',
      } as Job;
    })
  );

  return jobs
    .filter((job): job is Job => job !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPosts(limit?: number): Promise<Post[]> {
  const postsDirectory = path.join(contentDirectory, 'posts');
  const postDirs = fs.readdirSync(postsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const posts = await Promise.all(
    postDirs.map(async (postDir) => {
      const postPath = path.join(postsDirectory, postDir);
      const indexPath = path.join(postPath, 'index.md');
      
      if (!fs.existsSync(indexPath)) {
        return null;
      }

      const fileContents = fs.readFileSync(indexPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      const htmlContent = marked(content);

      return {
        ...data,
        slug: data.slug || `/articles/${postDir}`,
        content,
        htmlContent,
        date: data.date || new Date().toISOString(),
        tags: data.tags || [],
      } as Post;
    })
  );

  const filtered = posts
    .filter((post): post is Post => post !== null && !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return limit ? filtered.slice(0, limit) : filtered;
}

export async function getHobbies(): Promise<Hobby[]> {
  const hobbiesDirectory = path.join(contentDirectory, 'hobbies');
  const hobbyDirs = fs.readdirSync(hobbiesDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const hobbies = await Promise.all(
    hobbyDirs.map(async (hobbyDir) => {
      const hobbyPath = path.join(hobbiesDirectory, hobbyDir);
      const indexPath = path.join(hobbyPath, 'index.md');
      
      if (!fs.existsSync(indexPath)) {
        return null;
      }

      const fileContents = fs.readFileSync(indexPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      const htmlContent = marked(content);

      // Find image files
      const files = fs.readdirSync(hobbyPath);
      const images = files.filter((f) => 
        f.match(/\.(png|jpg|jpeg)$/i)
      ).map((f) => `/content/hobbies/${hobbyDir}/${f}`);

      return {
        title: data.title || hobbyDir,
        content,
        htmlContent,
        images,
      } as Hobby;
    })
  );

  return hobbies.filter((hobby): hobby is Hobby => hobby !== null);
}

