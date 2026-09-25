const socials = [
  { href: "https://github.com/martinsagat", label: "GitHub" },
  { href: "https://www.instagram.com/martin_sagat", label: "Instagram" },
  { href: "https://twitter.com/martinsagat", label: "Twitter" },
  { href: "https://www.linkedin.com/in/martinsagat/", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="border-t border-muted/20 bg-background/95">
      <div className="flex flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-12">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Martin Sagat
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          {socials.map((social) => (
            <li key={social.href}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
