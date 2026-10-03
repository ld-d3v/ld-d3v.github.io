const HEADER_CONTENT = {
    name: "Loc Dao (LD)",

    links: [
        { label: "home", href: "#/" },
        { label: "email", href: "mailto:locdao.fw@gmail.com" },
        { label: "github", href: "https://github.com/lukedaoo" },
        { label: "linkedin", href: "https://www.linkedin.com/" },
        { label: "updates", href: "#/updates" },
        { label: "blogs", href: "#/blogs" },
    ],
};

const RESUME_CONTENT = {
    hello: {
        title: "Hello",
        greeting:
            "Hi, I'm Loc. I like to build software. This is where I keep my projects and some yapping.",
    },
    work: {
        title: "Work",
        companies: [
            {
                name: "Vaccine Genie",
                date: { start: "Mar 2025", end: "Present" },
                links: {
                    preview: ["assets/vg1.png", "assets/vg2.png"],
                },
                roles: [
                    {
                        title: "Software Engineer",
                        date: { start: "Jul 2025", end: "Present" },
                        lines: [
                            "Built and maintained most of the website's features, from software architecture to implementation.",
                            "Worked closely with C-level executives and customers to ship meaningful features.",
                            "Owned features end to end, keeping quality high and improving the product continuously.",
                        ],
                        techs: [
                            "Google Cloud Platform",
                            "JavaScript/React",
                            "MongoDB",
                        ],
                    },
                    {
                        title: "Software Engineer Intern",
                        date: { start: "Mar 2025", end: "Jun 2025" },
                        lines: [],
                        techs: [
                            "JavaScript/React",
                            "Python/FastAPI",
                            "MongoDB",
                        ],
                    },
                ],
            },
            {
                name: "AceRocket",
                date: { start: "Dec 2024", end: "Mar 2025" },
                roles: [
                    {
                        title: "Software Engineer (Contract)",
                        date: { start: "Dec 2024", end: "Mar 2025" },
                        lines: [
                            "Worked with the founder and team of AceRocket LLC, a startup offering SAT tests and courses.",
                            "Improved the website frontend and integrated payments with Stripe and Firebase.",
                            "Designed and built the backend, moving the codebase from frontend-only to full stack.",
                        ],
                        techs: [],
                    },
                ],
            },
        ],
    },
    projects: {
        title: "Projects",
        domains: [
            {
                title: "Game Dev",
                projects: [
                    {
                        name: "Zod ngine",
                        date: { start: "May 2026", end: "Aug 2026" },
                        lines: ["A minimal, humble game engine written in C."],
                        links: {
                            code: "https://github.com/lukedaoo/zod-ngine",
                            live: "https://lukedaoo.github.io/zod-beatup-webgame/",
                        },
                        techs: ["C", "OpenGL", "SDL3"],
                    },
                ],
            },
            {
                title: "Web Dev",
                projects: [
                    {
                        name: "zpw",
                        date: { start: "Oct 2026", end: "Oct 2026" },
                        lines: [
                            "The personal website template to build this website",
                        ],
                        links: {
                            code: "https://github.com/lukedaoo/zpw/",
                        },
                        techs: ["Javascript", "Markdown"],
                    },
                    {
                        name: "Zodit",
                        date: { start: "July 2025", end: "Sept 2025" },
                        lines: ["An app that I use to track things."],
                        links: {
                            code: "https://github.com/lukedaoo/zodit/",
                            live: "https://zodit.vercel.app/",
                            preview: ["assets/zodit.png"],
                        },
                        techs: ["Typescript", "React", "Vite"],
                    },
                    {
                        name: "Zen",
                        date: { start: "2025", end: "" },
                        lines: ["Zen: calm yourself."],
                        links: {
                            code: "https://github.com/lukedaoo/zen",
                            live: "https://lukedaoo.github.io/zen/",
                            preview: ["assets/zen.png"],
                        },
                        techs: ["Javascript"],
                    },
                ],
            },
        ],
    },
};

const FOOTER_CONTENT = {
    text: `Copyright by LD © ${new Date().getFullYear()}`,
};
