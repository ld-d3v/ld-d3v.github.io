renderShell();

const intro = document.getElementById("intro");
intro.appendChild(el("h2", "Hello"));
intro.appendChild(el("p", CONTENT.intro));

function previewNode(images) {
    const wrap = el("span", "preview", "preview");
    wrap.tabIndex = 0;
    const tip = el("span", null, "tip");
    images.forEach((src) => {
        const img = el("img");
        img.src = src;
        img.alt = "";
        img.loading = "lazy";
        tip.appendChild(img);
    });
    wrap.appendChild(tip);
    const place = () => {
        tip.style.top = tip.style.bottom = tip.style.maxHeight = "";
        if (!matchMedia("(max-width: 720px)").matches) return;
        const r = wrap.getBoundingClientRect();
        const gap = 8;
        if (r.top > innerHeight - r.bottom) {
            tip.style.bottom = innerHeight - r.top + gap + "px";
            tip.style.maxHeight = r.top - gap * 2 + "px";
        } else {
            tip.style.top = r.bottom + gap + "px";
            tip.style.maxHeight = innerHeight - r.bottom - gap * 2 + "px";
        }
    };
    wrap.addEventListener("mouseenter", place);
    wrap.addEventListener("focus", place);
    return wrap;
}

function meta(box, label, value) {
    const t = el("p", null, "tech");
    t.appendChild(el("span", label + ": ", "tech-label"));
    t.appendChild(document.createTextNode(value));
    box.appendChild(t);
}

const projects = document.getElementById("projects");
projects.appendChild(el("h2", "Projects"));
CONTENT.projects.forEach((group) => {
    projects.appendChild(el("h3", group.domain));
    group.items.forEach((p) => {
        const box = el("div", null, "project");
        const head = el("div", null, "project-head");
        const title = el("span");
        title.appendChild(el("strong", p.name));
        if (p.start) title.appendChild(el("span", " " + p.start + (p.end ? " – " + p.end : ""), "muted date"));
        head.appendChild(title);
        const items = [];
        if (p.code) items.push({label: "code", href: p.code});
        if (p.live) items.push({label: "live", href: p.live});
        if (p.preview && p.preview.length) items.push({node: previewNode(p.preview)});
        if (items.length) head.appendChild(bracketed(items));
        box.appendChild(head);
        [].concat(p.desc).forEach((line) => box.appendChild(el("p", line)));
        if (p.tech && p.tech.length) meta(box, "Tech", p.tech.join(" · "));
        projects.appendChild(box);
    });
});
