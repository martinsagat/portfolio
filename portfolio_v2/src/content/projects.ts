export type Project = {
  title: string;
  description: string;
  url: string;
  icon: string;
  image: string;
  imageDark: string;
  tech: string[];
};

export const projects: Project[] = [
  {
    title: "Stepflow",
    description:
      "Guided workouts, yoga, and training plans matched to a person's goals.",
    url: "https://stepflow.com.au/",
    icon: "/projects/stepflow.png",
    image: "/projects/stepflow-main.png",
    imageDark: "/projects/stepflow-main-dark.png",
    tech: ["TypeScript", "AWS"],
  },
];
