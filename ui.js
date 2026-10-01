const KEY_PREV = "ArrowLeft";
const KEY_NEXT = "ArrowRight";
const DASH = " – ";

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

function range(start, end, openEnded) {
    if (!start) {
        return "";
    }
    if (end) {
        return start + DASH + end;
    }
    return openEnded ? start + DASH + "Present" : start;
}

function fill(node, lines, tech) {
    if (lines && lines.length) {
        const ul = el("ul", null, "bullets");

        lines.forEach((line) => ul.appendChild(el("li", line)));
        node.appendChild(ul);
    }

    if (tech && tech.length) {
        meta(node, "Tech", tech.join(" · "));
    }
}

function section(parent, title, tag) {
    const f = fold(el(tag || "h2", title));

    parent.appendChild(f);
    return f;
}

// o: { name, href, nameCls, dates, code, live, preview, lines, tech, level }
function entry(o) {
    const level = o.level || "entry";
    const head = el("div", null, "entry-head");
    const title = el("p");
    const box = fold(head, level);
    const items = [];
    const name = el("strong", null, o.nameCls);

    name.appendChild(o.href ? link(o.name, o.href) : document.createTextNode(o.name));
    title.appendChild(name);
    if (o.dates) {
        title.appendChild(el("span", " " + o.dates, "muted date"));
    }
    head.appendChild(title);

    if (o.code) {
        items.push({ label: "code", href: o.code });
    }
    if (o.live) {
        items.push({ label: "live", href: o.live });
    }
    if (o.preview && o.preview.length) {
        items.push({ node: previewNode(o.preview) });
    }
    if (items.length) {
        head.appendChild(bracketed(items));
    }

    if (level === "sub") {
        fill(box, o.lines, o.tech);
        return box;
    }

    if ((o.lines && o.lines.length) || (o.tech && o.tech.length)) {
        const body = el("div", null, "sub");

        fill(body, o.lines, o.tech);
        box.appendChild(body);
    }

    return box;
}
