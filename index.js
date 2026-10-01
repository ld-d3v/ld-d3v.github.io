const KEY_PREV = "ArrowLeft";
const KEY_NEXT = "ArrowRight";
const DASH = " – ";

renderShell();

const intro = document.getElementById("intro");
const introFold = fold(el("h2", "Hello"));

introFold.appendChild(el("p", CONTENT.intro));
intro.appendChild(introFold);

function openGallery(images, start) {
    const multi = images.length > 1;
    const dlg = el("dialog", null, "gallery");
    const img = el("img");
    const count = el("span", null, "muted");
    let i = start;

    const show = (n) => {
        i = (n + images.length) % images.length;
        img.src = images[i];
        img.alt = "Preview " + (i + 1) + " of " + images.length;
        count.textContent = i + 1 + " / " + images.length;
    };

    const btn = (label, aria, fn) => {
        const b = el("button", label, "btn");

        b.setAttribute("aria-label", aria);
        b.onclick = fn;
        return b;
    };

    const bar = el("div", null, "gallery-bar");

    if (multi) {
        bar.append(
            count,
            btn("<", "Previous", () => show(i - 1)),
            btn(">", "Next", () => show(i + 1)),
        );
    }
    bar.appendChild(btn("Close", "Close gallery", () => dlg.close()));

    const thumbs = el("div", null, "gallery-thumbs");

    if (multi) {
        images.forEach((src, n) => {
            const t = el("img");

            t.src = src;
            t.alt = "";
            t.onclick = () => show(n);
            thumbs.appendChild(t);
        });
    }

    dlg.append(bar, img, thumbs);

    dlg.addEventListener("click", (e) => {
        if (e.target === dlg) {
            dlg.close();
        }
    });
    dlg.addEventListener("keydown", (e) => {
        if (e.key === KEY_PREV) {
            show(i - 1);
        }
        if (e.key === KEY_NEXT) {
            show(i + 1);
        }
    });

    dlg.addEventListener("close", () => dlg.remove());

    document.body.appendChild(dlg);
    show(i);
    dlg.showModal();
}

function previewNode(images) {
    const b = el("button", "preview", "preview");

    b.type = "button";
    b.onclick = () => openGallery(images, 0);
    return b;
}

function meta(box, label, value) {
    const t = el("p", null, "tech");

    t.appendChild(el("span", label + ": ", "tech-label"));
    t.appendChild(document.createTextNode(value));
    box.appendChild(t);
}

function entryHead(name, nameCls, dates) {
    const head = el("div", null, "project-head");
    const title = el("span");

    title.appendChild(el("strong", name, nameCls));
    if (dates) {
        title.appendChild(el("span", " " + dates, "muted date"));
    }
    head.appendChild(title);
    return head;
}

const work = document.getElementById("work");

if (CONTENT.work && CONTENT.work.length) {
    const workFold = fold(el("h2", "Work"));

    work.appendChild(workFold);

    CONTENT.work.forEach((w) => {
        const head = entryHead(w.company, "company", w.start + DASH + (w.end || "Present"));
        const box = fold(head, "project");

        if (w.preview && w.preview.length) {
            head.appendChild(bracketed([{ node: previewNode(w.preview) }]));
        }

        w.roles.forEach((r) => {
            const title = el("p");
            const role = fold(title, "role");

            title.appendChild(el("strong", r.title));

            if (r.start) {
                title.appendChild(el("span", " " + r.start + DASH + (r.end || "Present"), "muted date"));
            }

            if (r.lines && r.lines.length) {
                const ul = el("ul", null, "work-list");

                r.lines.forEach((line) => ul.appendChild(el("li", line)));
                role.appendChild(ul);
            }

            if (r.tech && r.tech.length) {
                meta(role, "Tech", r.tech.join(" · "));
            }

            box.appendChild(role);
        });

        workFold.appendChild(box);
    });
}

const projects = document.getElementById("projects");
const projectsFold = fold(el("h2", "Projects"));

projects.appendChild(projectsFold);

CONTENT.projects.forEach((group) => {
    const groupFold = fold(el("h3", group.domain));

    projectsFold.appendChild(groupFold);

    group.items.forEach((p) => {
        const dates = p.start ? p.start + (p.end ? DASH + p.end : "") : "";
        const head = entryHead(p.name, null, dates);
        const box = fold(head, "project");

        const items = [];

        if (p.code) {
            items.push({ label: "code", href: p.code });
        }
        if (p.live) {
            items.push({ label: "live", href: p.live });
        }
        if (p.preview && p.preview.length) {
            items.push({ node: previewNode(p.preview) });
        }
        if (items.length) {
            head.appendChild(bracketed(items));
        }

        [].concat(p.desc).forEach((line) => box.appendChild(el("p", line)));

        if (p.tech && p.tech.length) {
            meta(box, "Tech", p.tech.join(" · "));
        }

        groupFold.appendChild(box);
    });
});
