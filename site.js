function currentTheme() {
    return (
        document.documentElement.getAttribute("data-theme") ||
        (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")
    );
}

function updateThemeButton() {
    const b = document.querySelector(".theme");
    if (!b) return;
    const t = currentTheme();
    b.textContent = t === "light" ? "Light" : "Dark";
    b.setAttribute("aria-label", "Theme: " + t + ". Click to switch.");
}

function toggleTheme() {
    const target = currentTheme() === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", target);
    localStorage.setItem("theme", target);
    updateThemeButton();
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
}

const ACCENTS = ["green", "purple", "white"];

function setAccent(name, save) {
    if (!ACCENTS.includes(name)) return;
    document.documentElement.setAttribute("data-accent", name);
    document.querySelectorAll(".swatch").forEach((b) => {
        b.setAttribute("aria-pressed", String(b.dataset.accent === name));
    });
    if (save) localStorage.setItem("accent", name);
}

setAccent(localStorage.getItem("accent") || CONTENT.accent);

function setContrast(on, save) {
    if (on) document.documentElement.setAttribute("data-contrast", "high");
    else document.documentElement.removeAttribute("data-contrast");
    document.querySelectorAll(".contrast").forEach((b) => b.setAttribute("aria-pressed", String(on)));
    if (save) localStorage.setItem("contrast", on ? "high" : "normal");
}

const savedContrast = localStorage.getItem("contrast");
setContrast(savedContrast ? savedContrast === "high" : matchMedia("(prefers-contrast: more)").matches);

function el(tag, text, cls) {
    const e = document.createElement(tag);
    if (text) e.textContent = text;
    if (cls) e.className = cls;
    return e;
}

function fold(head, cls) {
    const d = el("details", null, "fold" + (cls ? " " + cls : ""));
    const sum = el("summary");

    d.open = true;
    sum.appendChild(head);
    d.appendChild(sum);
    return d;
}

function link(label, href) {
    const a = el("a", label);
    a.href = href;
    if (/^https?:/.test(href)) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
    }
    return a;
}

function bracketed(items) {
    const box = el("span");
    box.appendChild(el("span", "[ ", "muted"));
    items.forEach((it, i) => {
        if (i) box.appendChild(el("span", "|", "sep"));
        box.appendChild(it.node || link(it.label, it.href));
    });
    box.appendChild(el("span", " ]", "muted"));
    return box;
}

function renderControls() {
    const box = el("div", null, "controls");
    const panel = el("div", null, "controls-panel");
    ACCENTS.forEach((name) => {
        const b = el("button", null, "swatch");
        b.dataset.accent = name;
        b.title = name;
        b.setAttribute("aria-label", "Accent " + name);
        b.onclick = () => setAccent(name, true);
        panel.appendChild(b);
    });
    const c = el("button", "Contrast", "btn contrast");
    c.onclick = () => setContrast(!document.documentElement.hasAttribute("data-contrast"), true);
    panel.appendChild(c);

    setContrast(document.documentElement.hasAttribute("data-contrast"));
    const t = el("button", null, "btn theme");
    t.onclick = toggleTheme;
    panel.appendChild(t);

    const toggle = el("button", "Style", "options");
    const setPanel = (open, save) => {
        panel.hidden = !open;
        toggle.setAttribute("aria-expanded", String(open));
        if (save) localStorage.setItem("controls", open ? "open" : "closed");
    };
    toggle.onclick = () => setPanel(panel.hidden, true);
    setPanel(localStorage.getItem("controls") !== "closed");

    box.append(panel, toggle);
    document.body.prepend(box);
    updateThemeButton();
    setAccent(document.documentElement.getAttribute("data-accent"));
}

function renderToTop() {
    const b = el("button", "Top", "btn to-top");
    b.setAttribute("aria-label", "Back to top");
    b.hidden = true;
    b.onclick = () => scrollTo({ top: 0, behavior: "smooth" });
    document.body.appendChild(b);
    const update = () => { b.hidden = scrollY < 300; };
    addEventListener("scroll", update, { passive: true });
    update();
}

function renderShell(title) {
    if (title) document.title = title;
    renderControls();
    renderToTop();
    document.getElementById("name").textContent = CONTENT.name;

    const here = location.pathname.split("/").pop() || "index.html";
    const links = CONTENT.links.map((l) => (l.href === here ? { label: "home", href: "index.html" } : l));
    document.getElementById("nav").appendChild(bracketed(links));
    document.getElementById("footer").textContent = CONTENT.footer.replace("{year}", new Date().getFullYear());
}
