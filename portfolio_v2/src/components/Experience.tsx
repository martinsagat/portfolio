"use client";

import { useState } from "react";
import { education, experience, type Role } from "@/content/experience";

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return <span key={index}>{part}</span>;
    return (
      <a
        key={index}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {match[1]}
      </a>
    );
  });
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className={`size-3.5 shrink-0 transition-transform duration-200 ease-out motion-reduce:transition-none ${open ? "rotate-90" : ""}`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 4.5 12.5 10l-5 5.5" />
    </svg>
  );
}

function ExperienceItem({
  role,
  isFirst,
  isLast,
}: {
  role: Role;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(false);
  const panelId = `${role.company}-${role.range}`.replace(/\s+/g, "-");
  const hasDetails = role.points.length > 0 || role.tech.length > 0;

  return (
    <li className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-4 sm:grid-cols-[9.5rem_1.25rem_minmax(0,1fr)] sm:gap-x-4">
      <div aria-hidden="true" className="relative row-span-2 justify-self-center sm:col-start-2">
        <span
          className={`absolute left-1/2 w-px -translate-x-1/2 bg-muted/30 ${isFirst ? "top-3.5" : "top-0"} ${isLast ? "h-3.5" : "bottom-0"}`}
        />
        <span
          className={`absolute top-3.5 left-1/2 size-2.5 -translate-x-1/2 rounded-full ring-4 ring-background ${isFirst ? "bg-accent" : "border-[1.5px] border-accent bg-background"}`}
        />
      </div>
      <p className="pb-3 text-sm whitespace-nowrap text-muted sm:col-start-1 sm:row-start-1 sm:pt-1.5 sm:pb-0">
        {role.range}
      </p>
      <div className={`min-w-0 sm:col-start-3 sm:row-start-1 ${isLast ? "pb-2" : "pb-8"}`}>
        <div className="flex items-start gap-4">
          <img
            src={`${role.logo}?v=8`}
            alt=""
            width={64}
            height={64}
            className="size-16 shrink-0 rounded-lg border border-logo-border object-cover"
          />
          <div className="min-w-0 pt-1">
            <h3 className="text-xl font-medium tracking-[-0.02em]">
              <a
                href={role.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {role.company}
              </a>
            </h3>
            <p className="mt-1 text-sm text-muted">
              {role.title}
              <span className="hidden px-1.5 sm:inline">·</span>
              <span className="block sm:inline">{role.location}</span>
            </p>
          </div>
        </div>
        <div className="mt-4 sm:pl-20">
          <p className="max-w-[40rem] text-[1.0625rem] leading-8 text-muted">
            <RichText text={role.summary} />
          </p>
          {hasDetails ? (
            <>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                aria-label={`What I did at ${role.company}`}
                onClick={() => setOpen((value) => !value)}
                className="mt-3 inline-flex items-center gap-1.5 rounded-sm text-sm text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <Chevron open={open} />
                What I did
              </button>
              <div
                id={panelId}
                inert={!open}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="pt-4">
                    {role.points.length > 0 ? (
                      <ul className="max-w-[40rem] list-disc space-y-2 pl-5 text-[1.0625rem] leading-7 text-muted marker:text-accent">
                        {role.points.map((point) => (
                          <li key={point}>
                            <RichText text={point} />
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {role.tech.length > 0 ? (
                      <ul className="mt-5 flex max-w-[40rem] flex-wrap gap-2">
                        {role.tech.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-muted/30 px-3 py-1 text-sm text-muted"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </li>
  );
}

export function Experience() {
  return (
    <section id="experience" className="px-6 pt-8 pb-24 text-center sm:px-12">
      <h2 className="text-3xl font-medium tracking-[-0.03em]">Experience</h2>
      <ol className="mx-auto mt-10 max-w-4xl text-left">
        {experience.map((role, index) => (
          <ExperienceItem
            key={`${role.company}-${role.range}`}
            role={role}
            isFirst={index === 0}
            isLast={index === experience.length - 1}
          />
        ))}
      </ol>
      <div className="mx-auto mt-4 grid max-w-4xl grid-cols-[1.25rem_minmax(0,1fr)] gap-x-4 text-left sm:grid-cols-[9.5rem_1.25rem_minmax(0,1fr)] sm:gap-x-4">
        <p className="col-start-2 hidden text-sm whitespace-nowrap text-muted sm:col-start-1 sm:row-start-1 sm:block sm:pt-[4.625rem]">
          {education.year}
        </p>
        <div className="col-start-2 border-t border-muted/25 pt-8 sm:col-start-3 sm:row-start-1">
          <p className="pb-3 text-sm text-muted sm:hidden">{education.year}</p>
          <p className="text-sm text-muted">Education</p>
          <div className="mt-4 flex items-start gap-4">
            <img
              src={`${education.logo}?v=1`}
              alt=""
              width={512}
              height={512}
              className="size-16 shrink-0 rounded-lg border border-logo-border bg-white object-cover"
            />
            <div className="min-w-0 pt-1">
              <h3 className="text-xl font-medium tracking-[-0.02em]">
                <a
                  href={education.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {education.school}
                </a>
              </h3>
              <p className="mt-1 text-sm text-muted">
                {education.credential}
                <span className="hidden px-1.5 sm:inline">·</span>
                <span className="block sm:inline">{education.location}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
