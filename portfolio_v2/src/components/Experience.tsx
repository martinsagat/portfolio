"use client";

import { useState } from "react";
import { experience, type Role } from "@/content/experience";

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

  return (
    <li className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-4 sm:grid-cols-[11rem_1.25rem_minmax(0,1fr)] sm:gap-x-6">
      <div aria-hidden="true" className="relative row-span-2 justify-self-center sm:col-start-2">
        <span
          className={`absolute left-1/2 w-px -translate-x-1/2 bg-muted/30 ${isFirst ? "top-3.5" : "top-0"} ${isLast ? "h-3.5" : "bottom-0"}`}
        />
        <span className="absolute top-3 left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-accent ring-4 ring-background" />
      </div>
      <p className="pb-2 text-sm text-muted sm:col-start-1 sm:row-start-1 sm:pb-0 sm:pt-2 sm:text-right">
        {role.range}
      </p>
      <div className={`sm:col-start-3 sm:row-start-1 ${isLast ? "pb-2" : "pb-12"}`}>
        <div className="flex items-start gap-4">
          <img
            src={`${role.logo}?v=8`}
            alt=""
            width={64}
            height={64}
            className="size-16 shrink-0 rounded-lg border border-logo-border object-cover"
          />
          <div>
            <h3 className="text-xl font-medium tracking-[-0.02em]">
              {role.title}
            </h3>
            <a
              href={role.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {role.company}
            </a>
            <p className="mt-1 text-sm text-muted">{role.location}</p>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((value) => !value)}
              className="mt-3 text-sm text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {open ? "Hide details" : "Show details"}
            </button>
          </div>
        </div>
        <div
          id={panelId}
          inert={!open}
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="pt-5 sm:pl-16">
              <p className="max-w-[40rem] text-[1.0625rem] leading-8 text-muted">
                <RichText text={role.summary} />
              </p>
              {role.points.length > 0 ? (
                <ul className="mt-4 max-w-[40rem] list-disc space-y-2 pl-5 text-[1.0625rem] leading-7 text-muted marker:text-accent">
                  {role.points.map((point) => (
                    <li key={point}>
                      <RichText text={point} />
                    </li>
                  ))}
                </ul>
              ) : null}
              {role.tech.length > 0 ? (
                <ul className="mt-5 flex max-w-[40rem] flex-wrap gap-x-4 gap-y-2 text-sm text-accent">
                  {role.tech.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
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
    </section>
  );
}
