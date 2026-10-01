renderShell();

const me = document.getElementById("me");
me.appendChild(el("h2", "Me"));
CONTENT.writeups.forEach((w) => {
    const box = el("details", null, "post");
    box.open = true;
    const head = el("summary");
    head.appendChild(el("span", "[ " + w.date + " ] ", "muted"));
    head.appendChild(w.url ? link(w.title, w.url) : el("strong", w.title));
    box.appendChild(head);
    w.lines.forEach((line) => box.appendChild(el("p", line)));
    me.appendChild(box);
});
