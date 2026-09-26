import { projects } from "@/content/projects";

export function Projects() {
  return (
    <section id="projects" className="px-6 pt-8 pb-16 text-center sm:px-12">
      <h2 className="text-3xl font-medium tracking-[-0.03em]">
        Noteworthy Projects
      </h2>
      <ul className="mx-auto mt-10 flex w-full max-w-3xl flex-col gap-6">
        {projects.map((project) => (
          <li
            key={project.title}
            className="group relative w-full overflow-hidden rounded-2xl border border-muted/25 bg-surface text-left"
          >
            <div className="flex flex-col sm:min-h-80 sm:flex-row">
              <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-8 lg:p-10">
                <div className="flex items-center gap-3">
                  <img
                    src={project.icon}
                    alt=""
                    width={48}
                    height={48}
                    className="size-11 shrink-0 rounded-lg object-contain sm:size-12"
                  />
                  <h3 className="text-xl font-medium tracking-[-0.03em] sm:text-2xl">
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
                <p className="mt-4 max-w-[40rem] text-[1.0625rem] leading-7 text-muted sm:mt-5 sm:leading-8">
                  {project.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2 sm:mt-6">
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
              <div className="flex items-center justify-center bg-tile p-8 sm:w-56 sm:shrink-0 md:w-64">
                <img
                  src={project.image}
                  alt={`${project.title} on a phone`}
                  width={796}
                  height={1400}
                  className="hidden h-auto w-36 max-w-full light:block sm:w-40"
                />
                <img
                  src={project.imageDark}
                  alt={`${project.title} on a phone`}
                  width={808}
                  height={1400}
                  className="h-auto w-36 max-w-full light:hidden sm:w-40"
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
