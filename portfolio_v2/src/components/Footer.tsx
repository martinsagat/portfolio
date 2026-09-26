function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
      <path d={d} />
    </svg>
  );
}

const socials = [
  {
    href: "https://github.com/martinsagat",
    label: "GitHub",
    icon: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    href: "https://www.instagram.com/martin_sagat",
    label: "Instagram",
    icon: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm10 1.8H7A2.2 2.2 0 0 0 4.8 7v10A2.2 2.2 0 0 0 7 19.2h10a2.2 2.2 0 0 0 2.2-2.2V7A2.2 2.2 0 0 0 17 4.8ZM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8Zm4.35-2.55a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9Z",
  },
  {
    href: "https://twitter.com/martinsagat",
    label: "Twitter",
    icon: "M14.7 10.3 22.4 2h-1.8l-6.7 7.2L8.4 2H2l8.1 10.9L2 22h1.8l7.1-7.6L15.6 22H22l-7.3-11.7Zm-2.5 2.7-.8-1.1L4.7 3.3h2.8l5.2 6.9.8 1.1 6.8 9.1h-2.8l-5.3-7.4Z",
  },
  {
    href: "https://www.linkedin.com/in/martinsagat/",
    label: "LinkedIn",
    icon: "M4.7 3.3A2.2 2.2 0 1 1 2.5 5.5a2.2 2.2 0 0 1 2.2-2.2ZM3 8.7h3.4V21H3V8.7Zm5.6 0H12v1.7h.1c.5-.9 1.7-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.6V21H16.6v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H8.6V8.7Z",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-muted/20">
      <div className="flex flex-col items-center gap-4 px-6 py-8 text-center sm:flex-row sm:justify-between sm:px-12">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Martin Sagat
        </p>
        <ul className="flex gap-4 text-muted">
          {socials.map((social) => (
            <li key={social.href}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="block transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <Icon d={social.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
