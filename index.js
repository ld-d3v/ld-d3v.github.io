renderShell();

const intro = section(document.getElementById("intro"), "Hello");

intro.appendChild(el("p", CONTENT.intro));

if (CONTENT.work && CONTENT.work.length) {
    const work = section(document.getElementById("work"), "Work");

    CONTENT.work.forEach((w) => {
        const box = entry({
            name: w.company,
            nameCls: "entry-name",
            dates: range(w.start, w.end, true),
            code: w.code,
            live: w.live,
            preview: w.preview,
        });

        w.roles.forEach((r) => {
            box.appendChild(entry({
                level: "sub",
                name: r.title,
                dates: range(r.start, r.end, true),
                lines: r.lines,
                tech: r.tech,
            }));
        });

        work.appendChild(box);
    });
}

const projects = section(document.getElementById("projects"), "Projects");

CONTENT.projects.forEach((group) => {
    const groupBox = entry({ name: group.domain, nameCls: "entry-name" });

    projects.appendChild(groupBox);

    group.items.forEach((p) => {
        groupBox.appendChild(entry({
            level: "sub",
            name: p.name,
            dates: range(p.start, p.end, false),
            code: p.code,
            live: p.live,
            preview: p.preview,
            lines: p.lines,
            tech: p.tech,
        }));
    });
});
