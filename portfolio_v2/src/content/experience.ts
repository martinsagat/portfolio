export const education = {
  school: "RMIT University",
  credential: "Bachelor of Computer Science",
  location: "Melbourne",
  year: "2020",
  url: "https://www.rmit.edu.au/",
  logo: "/logos/rmit.png",
};

export type Role = {
  title: string;
  company: string;
  location: string;
  range: string;
  url: string;
  logo: string;
  summary: string;
  points: string[];
  tech: string[];
};

export const experience: Role[] = [
  {
    title: "Frontend Engineer",
    company: "HBF Health",
    location: "Perth, WA (Hybrid)",
    range: "Jun 2026 – Present",
    url: "https://www.hbf.com.au/",
    logo: "/logos/hbf.png",
    summary:
      "Shipped [Updoc](https://www.updoc.com.au/) telehealth in the HBF app and the [myHBF](https://my.hbf.com.au/) member portal.",
    points: [
      "Integrated [Dynatrace](https://www.dynatrace.com/) tracking to monitor how members use the app and portal.",
      "Published [Sitecore](https://www.sitecore.com/) content updates across the HBF site.",
    ],
    tech: ["React", "Next.js", "Expo", "Sitecore", "Dynatrace", "Updoc"],
  },
  {
    title: "Senior Software Engineer",
    company: "PS Rewards",
    location: "Perth, WA (Hybrid)",
    range: "Jan 2026 – May 2026",
    url: "https://psrewards.com.au/",
    logo: "/logos/psrewards.png",
    summary:
      "Sole in-house engineer. Took the rewards platform from launch to 1,500 active users.",
    points: [
      "Architected a serverless AWS stack with Hono on Lambda, DynamoDB, and Cognito, deployed across dev, e2e, uat, and production.",
      "Built three Next.js portals (consumer storefront, merchant dashboard, and admin console) on a Turborepo monorepo.",
      "Shipped an Expo app with Face ID sign-in, push notifications, and over-the-air releases.",
      "Delivered gifting end to end: email and push delivery, recipient redemption, and a dispose-on-claim model that blocks double-spend.",
      "Integrated Stripe, Blackhawk Network gift cards, Rakuten offers, Twilio, and SendGrid.",
      "Patched IDOR vulnerabilities on consumer endpoints and required mobile verification on orders.",
    ],
    tech: [
      "TypeScript",
      "Hono",
      "AWS Lambda",
      "DynamoDB",
      "Cognito",
      "SST",
      "Next.js",
      "React",
      "MUI",
      "TanStack Query",
      "Turborepo",
      "Expo / React Native",
      "Stripe",
      "Playwright",
    ],
  },
  {
    title: "Senior Software Engineer",
    company: "PCCW Global",
    location: "Perth, WA (Remote)",
    range: "Jun 2024 – Dec 2025",
    url: "https://www.pccwglobal.com/",
    logo: "/logos/pccw.jpg",
    summary:
      "Built enterprise apps on Node.js and React, including Camunda workflows and Kubernetes delivery.",
    points: [
      "Designed and implemented a microservices architecture using Node.js and React.",
      "Developed and maintained business process automation workflows using Camunda.",
      "Implemented CI/CD pipelines and containerization with Docker and Kubernetes.",
      "Mentored junior developers and kept code quality consistent across the team.",
    ],
    tech: [
      "JavaScript",
      "TypeScript",
      "Camunda",
      "Node.js",
      "React.js",
      "AWS",
      "Docker",
      "Kubernetes",
      "GraphQL",
      "Jest",
      "CI/CD",
    ],
  },
  {
    title: "Software Engineer",
    company: "Valorem",
    location: "Perth, WA (Remote)",
    range: "Jan 2024 – Jun 2024",
    url: "https://www.valorem.com.au/",
    logo: "/logos/valorem.jpg",
    summary:
      "Led a serverless payments platform on AWS, with FrankieOne fraud checks and Monoova payments.",
    points: [
      "Led development of a serverless payment platform using AWS and the SST framework.",
      "Integrated FrankieOne for fraud detection and Monoova for payment processing.",
      "Implemented back-end-for-frontend APIs to speed up data fetching and page loads.",
      "Built CI/CD pipelines with GitHub Actions for automated testing and deployment.",
    ],
    tech: [
      "SST",
      "AWS",
      "Serverless",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "AWS CloudFormation",
      "DynamoDB",
      "React",
      "GraphQL",
      "Jest",
      "GitHub Actions",
    ],
  },
  {
    title: "Software Engineering Consultant",
    company: "Autom8",
    location: "Sydney, NSW (Remote)",
    range: "Aug 2023 – Jan 2024",
    url: "https://icl.autom8au.com.au/",
    logo: "/logos/autom8.png",
    summary:
      "Split a monolith into client and backend services, and set the order of that work with the team.",
    points: [
      "Led a transformation from a monolithic architecture to client and backend services.",
      "Mapped business processes and prioritised what to implement first.",
      "Mentored the team on the new technologies.",
    ],
    tech: ["NodeJS", "Vue.js", "JavaScript", "TypeScript", "MySQL", "Docker"],
  },
  {
    title: "Software Engineer",
    company: "BPM",
    location: "Sydney, NSW",
    range: "Jan 2023 – Jul 2023",
    url: "https://landing.bigpicturemedical.com/",
    logo: "/logos/bpm.png",
    summary:
      "Mapped authentication with designers and engineers, and contributed to NHS single sign-on.",
    points: [
      "Mapped user authentication end-to-end with product designers and engineers using BPMN.",
      "Contributed to SSO login through the [National Health Service (NHS)](https://www.nhs.uk/).",
      "Built organisation-level activation for Medical Pathways so practitioners could configure pathways for their specialisations.",
      "Expanded MedKit UI, the Vue component library shared across BPM products.",
    ],
    tech: [
      "JavaScript",
      "Vue.js",
      "TypeScript",
      "GraphQL",
      "Laravel",
      "PHP",
      "PostgreSQL",
      "Linux",
      "Docker",
    ],
  },
  {
    title: "Software Engineer",
    company: "OneAffiniti",
    location: "Sydney, NSW (Remote)",
    range: "Aug 2021 – Jan 2023",
    url: "https://oneaffiniti.com/",
    logo: "/logos/oneaffiniti.png",
    summary:
      "Built a generator that turns campaign content into static sites, for clients including [Microsoft](https://www.microsoft.com/) and [Dell](https://www.dell.com/).",
    points: [
      "Built an application that generates static websites from content designed by campaign managers, cutting compute cost and making content load faster.",
      "Introduced automated code quality checks with Git hooks and linters.",
      "Brought TypeScript into JavaScript applications to keep the code consistent and catch type errors.",
      "Ran training sessions to share knowledge across teams.",
    ],
    tech: [
      "Vue.js",
      "Angular",
      "Laravel",
      "Node.js",
      "PHP",
      "AWS",
      "Terraform",
      "Linux",
      "Docker",
    ],
  },
  {
    title: "Software Developer",
    company: "Toll Group",
    location: "Sydney, NSW",
    range: "Feb 2019 – Aug 2021",
    url: "https://www.tollgroup.com/",
    logo: "/logos/toll.png",
    summary:
      "Supported a high-volume tracking system, and helped restore servers after a 2020 ransomware attack.",
    points: [
      "Supported a large-volume production tracking system, moving data from source devices into databases.",
      "After a [2020 ransomware attack](https://www.itnews.com.au/news/toll-groups-corporate-data-stolen-by-attackers-548033) that stole commercial agreements and employee data, helped bring servers back for business continuity and added security measures to prevent further leaks.",
    ],
    tech: [".NET", "SQL", "C#", "Azure", "Windows Server", "Laravel", "Vue.js"],
  },
];
