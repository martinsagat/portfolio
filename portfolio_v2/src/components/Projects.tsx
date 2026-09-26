import { Syne } from "next/font/google";
import { projects } from "@/content/projects";

const syne = Syne({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

const stepflowGlow =
  "radial-gradient(72% 58% at 76% 46%, rgba(120, 101, 200, 0.42), transparent 64%), radial-gradient(48% 42% at 8% 82%, rgba(11, 154, 210, 0.2), transparent 62%)";

const stepflowGlowLight =
  "radial-gradient(72% 58% at 76% 46%, rgba(120, 101, 200, 0.28), transparent 64%), radial-gradient(48% 42% at 8% 82%, rgba(11, 154, 210, 0.18), transparent 62%)";

export function Projects() {
  return (
    <section id="projects" className="px-6 pt-8 pb-16 text-center sm:px-12">
      <h2 className="text-3xl font-medium tracking-[-0.03em]">Projects</h2>
      <ul className="mx-auto mt-10 flex w-full max-w-3xl flex-col gap-6">
        {projects.map((project) => {
          const branded = project.surface === "stepflow";

          return (
          <li
            key={project.title}
            className={
              branded
                ? "group relative w-full overflow-hidden rounded-2xl border border-white/12 bg-[#100e22] text-left text-[#f5f3fb] light:border-[#100e22]/12 light:bg-[#f5f3fb] light:text-[#100e22]"
                : "group relative w-full overflow-hidden rounded-2xl border border-muted/25 bg-surface text-left"
            }
          >
            {branded && (
              <>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 light:hidden"
                  style={{ background: stepflowGlow }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 hidden light:block"
                  style={{ background: stepflowGlowLight }}
                />
              </>
            )}
            <div className="relative flex flex-col sm:min-h-80 sm:flex-row">
              <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-8 lg:p-10">
                <div className="flex items-center gap-3">
                  <img
                    src={project.icon}
                    alt=""
                    width={48}
                    height={48}
                    className={
                      branded
                        ? "size-11 shrink-0 object-contain sm:size-12"
                        : "size-11 shrink-0 rounded-lg object-contain sm:size-12"
                    }
                  />
                  <h3
                    className={`text-xl leading-none tracking-[-0.03em] sm:text-2xl ${
                      project.titleFont === "syne"
                        ? `${syne.className} font-bold`
                        : "font-medium"
                    }`}
                  >
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        branded
                          ? "transition-colors after:absolute after:inset-0 group-hover:text-[#f26a30] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f26a30] light:group-hover:text-[#c44712] light:focus-visible:outline-[#c44712]"
                          : "transition-colors after:absolute after:inset-0 group-hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                      }
                    >
                      {project.title}
                    </a>
                  </h3>
                </div>
                <p
                  className={
                    branded
                      ? "mt-4 max-w-[40rem] text-[1.0625rem] leading-7 text-[#c3bdd4] sm:mt-5 sm:leading-8 light:text-[#5a5470]"
                      : "mt-4 max-w-[40rem] text-[1.0625rem] leading-7 text-muted sm:mt-5 sm:leading-8"
                  }
                >
                  {project.description}
                </p>
                <p className={branded ? "mt-5 text-sm text-[#f26a30] sm:mt-6 light:text-[#c44712]" : "mt-5 text-sm text-accent sm:mt-6"}>
                  stepflow.com.au
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <li
                      key={item}
                      className={
                        branded
                          ? "rounded-full border border-white/12 bg-[#1e1a38] px-3 py-1 text-sm text-[#c3bdd4] light:border-[#100e22]/12 light:bg-[#efeaf8] light:text-[#4a4462]"
                          : "rounded-full border border-muted/30 px-3 py-1 text-sm text-muted"
                      }
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={
                  branded
                    ? "flex items-center justify-center p-8 sm:w-56 sm:shrink-0 md:w-64"
                    : "flex items-center justify-center bg-tile p-8 sm:w-56 sm:shrink-0 md:w-64"
                }
              >
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
          );
        })}
      </ul>
    </section>
  );
}
