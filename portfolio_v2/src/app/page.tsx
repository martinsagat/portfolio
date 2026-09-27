import { Space_Grotesk } from "next/font/google";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { GithubTiles } from "@/components/GithubTiles";
import { Projects } from "@/components/Projects";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export default function Home() {
  return (
    <>
    <main id="top" className="relative flex min-h-[calc(100svh-6.5rem)] flex-col justify-center px-6 py-12 sm:px-12">
      <GithubTiles />
      <div className="relative text-center">
        <div className="mx-auto mb-8 size-32 overflow-hidden rounded-full">
          <img
            src="/me.jpg?v=8"
            alt="Martin Sagat"
            width={1018}
            height={1024}
            className="size-full origin-[50%_46%] scale-[1.45] object-cover"
          />
        </div>
        <h1>
          <span className="block text-lg leading-none text-muted">
            Hi, my name is
          </span>
          <span
            className={`${display.className} mt-3 block text-[clamp(2.75rem,6vw,4.25rem)] leading-[1.05] font-medium tracking-[-0.04em]`}
          >
            Martin Sagat
          </span>
          <span
            className={`${display.className} mt-3 block text-[clamp(1.35rem,2.2vw,1.65rem)] leading-snug font-normal tracking-[-0.02em] text-ink`}
          >
            I build things for web
          </span>
        </h1>
        <p className="mt-6 flex items-center justify-center gap-1.5 text-sm text-muted">
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"
            />
            <circle cx="12" cy="10" r="2.25" />
          </svg>
          Perth, WA
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="https://www.linkedin.com/in/martinsagat/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Let's connect on LinkedIn"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium tracking-[-0.01em] text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Let&apos;s connect
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
              <path d="M4.7 3.3A2.2 2.2 0 1 1 2.5 5.5a2.2 2.2 0 0 1 2.2-2.2ZM3 8.7h3.4V21H3V8.7Zm5.6 0H12v1.7h.1c.5-.9 1.7-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.6V21H16.6v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H8.6V8.7Z" />
            </svg>
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md border border-accent px-5 py-3 text-sm font-medium tracking-[-0.01em] text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            View Resume
          </a>
        </div>
      </div>
    </main>
    <About />
    <Experience />
    <Projects />
    <Contact />
    </>
  );
}
