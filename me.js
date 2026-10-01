renderShell();

const me = document.getElementById("me");
const meFold = fold(el("h2", "Me"));

me.appendChild(meFold);

CONTENT.writeups.forEach((w) => {
    const head = el("span");

    head.appendChild(el("span", "[ " + w.date + " ] ", "muted"));
    head.appendChild(w.url ? link(w.title, w.url) : el("strong", w.title));

    const box = fold(head, "post");

    w.lines.forEach((line) => box.appendChild(el("p", line)));
    meFold.appendChild(box);
});
