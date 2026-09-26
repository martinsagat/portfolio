"use client";

import { useEffect, useRef, useState } from "react";
import { Monogram } from "@/components/EngineeringArt";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const menuLinks = [
  ...links,
  {
    href: "https://www.linkedin.com/in/martinsagat/",
    label: "LinkedIn",
    external: true,
  },
  { href: "/resume.pdf", label: "Resume", external: true },
];

function ThemeSwitch() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("themeMode", next);
    setTheme(next);
  };

  const toLight = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={toLight ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-muted/40 text-muted transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {toLight ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.75">
          <circle cx="12" cy="12" r="4" />
          <path strokeLinecap="round" d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path strokeLinejoin="round" d="M20 14.5A7.5 7.5 0 1 1 9.5 4 6 6 0 0 0 20 14.5z" />
        </svg>
      )}
    </button>
  );
}

export function AppBar() {
  const [raised, setRaised] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setRaised(window.scrollY > 12));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);
    if (sections.length === 0) return;

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        const current = [...ratios.entries()].sort((a, b) => b[1] - a[1])[0];
        setActive(current && current[1] > 0 ? current[0] : "");
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const root = drawerRef.current;
    const items = () =>
      [...(root?.querySelectorAll<HTMLElement>("a") ?? [])];
    items()[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = items();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a
        href="#top"
        className="fixed top-3 left-3 z-50 -translate-y-24 rounded-md bg-accent px-4 py-2 text-sm font-medium text-background focus:translate-y-0 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-accent"
      >
        Skip to content
      </a>
      <header
        className={`sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-300 ease-out motion-reduce:transition-none ${
          raised
            ? "border-muted/30 bg-surface shadow-[0_8px_24px_rgba(0,0,0,0.22)] light:shadow-[0_1px_2px_rgba(15,23,42,0.06)]"
            : "border-muted/20 bg-background"
        }`}
      >
        <nav
          aria-label="Page"
          className="flex items-center justify-between gap-6 px-6 py-3 sm:px-12"
        >
          <a
            href="#top"
            aria-label="Martin Sagat"
            className="inline-flex h-11 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <Monogram
              viewBox="40 60 240 256"
              strokeWidth={11}
              className={`w-auto transition-[height] duration-300 ease-out motion-reduce:transition-none ${raised ? "h-7" : "h-11"}`}
            />
          </a>
          <div className="flex items-center gap-1 sm:gap-2">
            <ul className="hidden items-center text-sm md:flex">
              {links.map((link) => {
                const isActive = active === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={`inline-flex min-h-11 items-center px-3 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                        isActive ? "text-ink" : "text-muted"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <ThemeSwitch />
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex size-11 items-center justify-center text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
              aria-expanded={menuOpen}
              aria-controls="page-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>
      <div
        ref={drawerRef}
        inert={!menuOpen}
        className={`fixed inset-0 z-30 md:hidden ${menuOpen ? "" : "pointer-events-none"}`}
      >
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={-1}
          className={`absolute inset-0 bg-background/70 transition-opacity duration-300 motion-reduce:transition-none ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={closeMenu}
        />
        <nav
          id="page-menu"
          aria-label="Sections"
          className={`absolute top-0 right-0 flex h-full w-64 flex-col gap-2 border-l border-muted/20 bg-surface px-6 pt-24 transition-translate duration-300 ease-out motion-reduce:transition-none ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {menuLinks.map((link) => {
            const isActive = !("external" in link) && active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                {...("external" in link
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                onClick={closeMenu}
                className={`inline-flex min-h-11 items-center text-lg transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                  isActive ? "text-accent" : "text-ink"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
}
