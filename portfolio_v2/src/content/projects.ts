export type Project = {
  title: string;
  description: string;
  url: string;
  icon: string;
  image: string;
  tech: string[];
};

export const projects: Project[] = [
  {
    title: "Stepflow",
    description:
      "Stepflow helps people transform their fitness journey with personalized exercise guidance, yoga routines, and workout plans tailored to their goals.",
    url: "https://stepflow.com.au/",
    icon: "/projects/stepflow.png",
    image: "/projects/stepflow-main-dark.png",
    tech: ["TypeScript", "AWS", "SaaS"],
  },
];
