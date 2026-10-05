const IS_BLOG_POST = document.querySelector(".blog-post") !== null;

if (!IS_BLOG_POST) {
    App({
        header: HEADER_CONTENT,
        footer: FOOTER_CONTENT,
        seo: {
            description:
                "Loc Dao (LD) – software engineer. Projects in game dev and web dev, plus some writing.",
            url: "https://ld-d3v.github.io/",
            siteName: "Loc Dao (LD)",
            author: "Loc Dao",
            themeColor: "#000000",
            image: "https://ld-d3v.github.io/assets/og-image.png",
            imageAlt: "Loc Dao (LD)",
            locale: "en_US",
        },
        routes: [
            { path: "/", render: () => Resume(RESUME_CONTENT) },
            {
                path: "/updates",
                title: "Updates",
                render: () => Updates(UPDATES_CONTENT),
            },
            {
                path: "/blogs",
                title: "Blogs",
                render: () => Blogs(BLOGS_INDEX),
            },
            {
                path: "/decks",
                title: "Decks",
                render: () => Decks(),
            },
        ],
    });
}
