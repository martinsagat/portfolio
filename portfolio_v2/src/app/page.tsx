import { Space_Grotesk } from "next/font/google";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export default function Home() {
  return (
    <>
    <main id="top" className="flex min-h-[calc(100svh-4.25rem)] items-center justify-center px-6 py-16 sm:px-12">
      <div className="text-center">
        <div className="mx-auto mb-8 size-32 overflow-hidden rounded-full">
          <img
            src="/me.jpg?v=2"
            alt="Martin Sagat"
            width={640}
            height={641}
            className="h-[210%] w-full max-w-none -translate-y-[10%] object-cover object-[55%_center]"
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
            I build things for web.
          </span>
        </h1>
        <p className="mx-auto mt-10 max-w-[34rem] text-[1.0625rem] leading-8 text-muted sm:mt-14">
          I&apos;m a <span className="text-accent">Senior Software Engineer</span> specializing in building scalable web
          and mobile applications. With expertise in cloud technologies and modern
          web frameworks, I create efficient, maintainable solutions that drive
          business growth.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="https://www.linkedin.com/in/martinsagat/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md bg-accent px-5 py-3 text-sm font-medium tracking-[-0.01em] text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Connect on LinkedIn
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
