import { projects } from "@/content/projects";

export function Projects() {
  return (
    <section id="projects" className="px-6 pt-8 pb-8 sm:px-12">
      <h2 className="text-3xl font-medium tracking-[-0.03em]">
        Noteworthy Projects
      </h2>
      <ul className="mt-8">
        {projects.map((project) => (
          <li
            key={project.title}
            className="group relative overflow-hidden rounded-2xl border border-muted/25 bg-surface transition-colors hover:border-accent/60"
          >
            <div className="grid lg:grid-cols-[minmax(0,1fr)_18rem]">
              <div className="flex flex-col justify-center p-6 sm:p-10">
                <div className="flex items-center gap-4">
                  <img
                    src={project.icon}
                    alt=""
                    width={48}
                    height={48}
                    className="size-12 shrink-0 object-contain"
                  />
                  <h3 className="text-2xl font-medium tracking-[-0.03em]">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors after:absolute after:inset-0 group-hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      {project.title}
                    </a>
                  </h3>
                </div>
                <p className="mt-5 max-w-[36rem] text-[1.0625rem] leading-8 text-muted">
                  {project.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-muted/30 px-3 py-1 text-sm text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-end justify-center bg-background/50 px-6 pt-8">
                <img
                  src={project.image}
                  alt={`${project.title} on a phone`}
                  width={808}
                  height={1400}
                  className="h-auto max-h-[24rem] w-auto"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-muted">
        Due to rights and confidentiality agreements, certain commercial
        projects are not featured.
      </p>
    </section>
  );
}
