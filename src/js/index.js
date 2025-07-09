let classMethods = ["remove", "add"],
    stringArray = ["Add more contrast", "Remove additional contrast", "Light mode", "Dark mode"];

function addEvent(id, textArr, className) {
    const htmlEl = document.documentElement;
    const btn = document.getElementById(id);
    let toggled = false;

    btn.addEventListener('click', () => {
        toggled = !toggled;
        btn.textContent = textArr[Number(toggled)];
        htmlEl.classList[toggled ? 'add' : 'remove'](className);
    });
}

function addContrastControl() {
    addEvent(
        "contrast",
        [stringArray[0], stringArray[1]],
        "contrast"
    );
}

function addInvertedControl() {
    addEvent("invmode", [stringArray[2], stringArray[3]], "inverted");
}

(function() {
    const btn = document.getElementById('goTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 250) {
            btn.classList.add('btn-top--visible');
        } else {
            btn.classList.remove('btn-top--visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

addContrastControl();
addInvertedControl();
