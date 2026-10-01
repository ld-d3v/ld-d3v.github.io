renderShell();

const me = section(document.getElementById("me"), "Me");

WRITEUPS.forEach((w) => {
    me.appendChild(entry({
        name: w.title,
        nameCls: "entry-name",
        href: w.url,
        dates: w.date,
        lines: w.lines,
    }));
});
