"use client";

import { useEffect, useState } from "react";
import { Monogram } from "@/components/EngineeringArt";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
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
      className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-muted/40 text-muted transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
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
  const [hidden, setHidden] = useState(false);
  const [raised, setRaised] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - last;
        setRaised(y > 12);
        if (menuOpen || y < 12) {
          setHidden(false);
        } else if (delta > 6) {
          setHidden(true);
        } else if (delta < -6) {
          setHidden(false);
        }
        last = y;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
    <header
      className={`sticky top-0 z-40 border-b transition-[translate,background-color,box-shadow,border-color] duration-300 ease-out motion-reduce:transition-none ${
        hidden && !menuOpen ? "-translate-y-full border-transparent" : "translate-y-0"
      } ${
        raised && !hidden
          ? "border-muted/30 bg-surface shadow-[0_10px_30px_rgba(0,0,0,0.28)]"
          : "border-muted/20 bg-background"
      }`}
    >
      <nav
        aria-label="Page"
        className="flex items-center justify-between gap-6 px-6 py-4 sm:px-12"
      >
        <a
          href="#top"
          aria-label="Martin Sagat"
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <Monogram
            viewBox="40 60 240 256"
            strokeWidth={11}
            className={`w-auto transition-[height] duration-300 ease-out motion-reduce:transition-none ${raised ? "h-7" : "h-11"}`}
          />
        </a>
        <div className="flex items-center gap-3 sm:gap-5">
          <ul className="hidden items-center gap-5 text-sm text-muted md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeSwitch />
          <button
            type="button"
            className="inline-flex size-8 items-center justify-center text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:hidden"
            aria-expanded={menuOpen}
            aria-controls="page-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() =>
              setMenuOpen((open) => {
                if (!open) setHidden(false);
                return !open;
              })
            }
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
      <div className={`fixed inset-0 z-30 md:hidden ${menuOpen ? "" : "pointer-events-none"}`}>
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
          className={`absolute inset-0 bg-background/70 transition-opacity duration-300 motion-reduce:transition-none ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
        />
        <nav
          id="page-menu"
          aria-label="Sections"
          inert={!menuOpen}
          className={`absolute top-0 right-0 flex h-full w-64 flex-col gap-6 border-l border-muted/20 bg-surface px-8 pt-24 transition-translate duration-300 ease-out motion-reduce:transition-none ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-lg text-ink transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
