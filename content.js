const CONTENT = {
    name: "Loc Dao (LD)",
    accent: "purple", // default: "green" | "purple" | "white"
    links: [
        { label: "email", href: "mailto:locdao.fw@gmail.com" },
        { label: "github", href: "https://github.com/lukedaoo" },
        { label: "linkedin", href: "https://www.linkedin.com/in/dhuuloc/" },
        { label: "me", href: "me.html" },
    ],
    intro: "Hi, I'm Loc. I like to build software. This is where I keep my projects and some yapping.",
    work: [
        {
            company: "Vaccine Genie",
            start: "Mar 2025",
            end: null,
            preview: ["assets/vg1.png", "assets/vg2.png"],
            roles: [
                {
                    title: "Software Engineer",
                    start: "Jul 2025",
                    end: null,
                    lines: [
                        "Built and maintained most of the website's features, from software architecture to implementation.",
                        "Worked closely with C-level executives and customers to ship meaningful features.",
                        "Owned features end to end, keeping quality high and improving the product continuously.",
                    ],
                    tech: ["Google Cloud Platform", "JavaScript/React", "MongoDB"],
                },
                {
                    title: "Software Engineer Intern",
                    start: "Mar 2025",
                    end: "Jun 2025",
                    tech: ["JavaScript/React", "Python/FastAPI", "MongoDB"],
                },
            ],
        },
        {
            company: "AceRocket",
            start: "Dec 2024",
            end: "Mar 2025",
            roles: [
                {
                    title: "Software Engineer (Contract)",
                    lines: [
                        "Worked with the founder and team of AceRocket LLC, a startup offering SAT tests and courses.",
                        "Improved the website frontend and integrated payments with Stripe and Firebase.",
                        "Designed and built the backend, moving the codebase from frontend-only to full stack.",
                    ],
                },
            ],
        },
    ],
    projects: [
        {
            domain: "Game Dev",
            items: [
                {
                    name: "Zod ngine", 
                    lines: ["A minimal, humble game engine written in C."],
                    code: "https://github.com/lukedaoo/zod-ngine",
                    live: "https://lukedaoo.github.io/zod-beatup-webgame/",
                    tech: ["C", "OpenGL", "SDL3"],
                    start: "May 2026",
                    end: "Aug 2026"
                },
            ],
        },
        {
            domain: "Web Dev",
            items: [
                {
                    name: "Zodit",
                    lines: ["An app that I use to track things."],
                    code: "https://github.com/lukedaoo/zodit/",
                    live: "https://zodit.vercel.app/",
                    preview: ["assets/zodit.png"],
                    tech: ["Typescript", "Rect", "Vite"],
                    start: "July 2025",
                    end: "Sept 2025"
                },
                {
                    name: "Zen",
                    lines: ["Zen: calm yourself."],
                    code: "https://github.com/lukedaoo/zen",
                    live: "https://lukedaoo.github.io/zen/",
                    preview: ["assets/zen.png"],
                    tech: ["Javascript"],
                    start: "2025"
                },
            ],
        },
    ],
    footer: "Copyright © {year} LD",
};
