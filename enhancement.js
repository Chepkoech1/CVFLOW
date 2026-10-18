/* =========================================================
   CVFLOW ENHANCEMENTS
   Load AFTER script.js
   ========================================================= */

(function () {

    const paper = document.getElementById("cvPreview");
    if (!paper) return;

    /* -----------------------------------------------------
       1. AUTO-SAVE
    ----------------------------------------------------- */

    const status = document.getElementById("saveStatus");
    let timer = null;
    let silent = false;

    // Stop the "CV saved" toast from popping up on every auto-save
    const originalToast = window.showToast;
    window.showToast = function (message) {
        if (!silent) originalToast(message);
    };

    function setStatus(text) {
        if (status) status.textContent = text;
    }

    function autosave() {
        try {
            silent = true;
            saveCV();
            const time = new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            });
            setStatus("Saved " + time);
        } catch (error) {
            setStatus("Could not save");
        } finally {
            silent = false;
        }
    }

    function scheduleSave() {
        setStatus("Saving…");
        clearTimeout(timer);
        timer = setTimeout(autosave, 600);
    }

    if (localStorage.getItem("cvflowData")) {
        setStatus("Saved on this device");
    } else {
        setStatus("Auto-save on");
    }


    /* -----------------------------------------------------
       2. HIDE EMPTY PLACEHOLDERS WHEN PRINTING
       ("Your Name", "email@example.com" etc. stay on screen
       as hints, but never end up in the PDF)
    ----------------------------------------------------- */

    const placeholderMap = {
        fullName: "previewName",
        jobTitle: "previewJobTitle",
        email: "previewEmail",
        phone: "previewPhone",
        location: "previewLocation",
        summary: "summarySection"
    };

    function markPlaceholders() {
        Object.keys(placeholderMap).forEach(inputId => {
            const input = document.getElementById(inputId);
            const target = document.getElementById(placeholderMap[inputId]);
            if (input && target) {
                target.classList.toggle("is-empty", !input.value.trim());
            }
        });
    }

    // Runs after script.js's own handlers (event bubbling)
    document.addEventListener("input", () => {
        markPlaceholders();
        scheduleSave();
    });

    // Add / remove buttons for education, skills, referees, etc.
    document.addEventListener("click", e => {
        if (e.target.closest("button")) {
            markPlaceholders();
            scheduleSave();
        }
    });

    markPlaceholders();


    /* -----------------------------------------------------
       3. TEMPLATES + ACCENT COLOR
    ----------------------------------------------------- */

    const TEMPLATES = [
        ["classic", "Classic"],
        ["modern", "Modern"],
        ["minimal", "Minimal"],
        ["sidebar", "Sidebar"],
        ["compact", "Compact"]
    ];

    /* Group sections into a main column and a side column.
       Both wrappers use display:contents in every template except
       Sidebar, so the other layouts look exactly as before. */
    (function buildColumns() {
        const first = document.getElementById("summarySection");
        if (!first) return;

        const body = document.createElement("div");
        body.className = "cv-body";

        const main = document.createElement("div");
        main.className = "cv-main";

        const side = document.createElement("div");
        side.className = "cv-side";

        first.before(body);

        ["summarySection", "educationSection", "experienceSection", "projectsSection"]
            .forEach(id => main.appendChild(document.getElementById(id)));

        ["skillsSection", "previewRefereesSection"]
            .forEach(id => side.appendChild(document.getElementById(id)));

        body.append(main, side);
    })();

    const COLORS = ["#1e293b", "#2563eb", "#0f766e", "#9f1239", "#6d28d9"];
    const DESIGN_KEY = "cvflowDesign";

    let design = { template: "classic", accent: COLORS[0] };

    try {
        const saved = JSON.parse(localStorage.getItem(DESIGN_KEY) || "{}");

        if (TEMPLATES.some(t => t[0] === saved.template)) {
            design.template = saved.template;
        }

        if (/^#[0-9a-f]{6}$/i.test(saved.accent || "")) {
            design.accent = saved.accent;
        }
    } catch (error) { /* use defaults */ }

    // Build the "Design" card and put it above Personal Information
    const firstCard = document.querySelector(".editor .card");

    if (firstCard) {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <div class="section-title">
                <div>
                    <h2>Design</h2>
                    <p>Pick a layout and an accent color</p>
                </div>
            </div>

            <div class="design-row">
                <span>Layout</span>
                ${TEMPLATES.map(([id, label]) => `
                    <button type="button" class="tpl-btn"
                        data-template="${id}">${label}</button>
                `).join("")}
            </div>

            <div class="design-row">
                <span>Color</span>
                ${COLORS.map(color => `
                    <button type="button" class="swatch"
                        data-accent="${color}"
                        style="background:${color}"
                        aria-label="Accent color ${color}"></button>
                `).join("")}
                <input type="color" id="accentCustom"
                    aria-label="Custom accent color"
                    value="${design.accent}">
            </div>
        `;

        firstCard.before(card);

        card.addEventListener("click", e => {
            const tpl = e.target.closest("[data-template]");
            const swatch = e.target.closest("[data-accent]");

            if (tpl) design.template = tpl.dataset.template;
            if (swatch) design.accent = swatch.dataset.accent;

            if (tpl || swatch) applyDesign();
        });

        card.querySelector("#accentCustom").addEventListener("input", e => {
            design.accent = e.target.value;
            applyDesign();
        });
    }

    function applyDesign() {
        TEMPLATES.forEach(t => paper.classList.remove("tpl-" + t[0]));
        paper.classList.add("tpl-" + design.template);
        paper.style.setProperty("--accent", design.accent);

        document.querySelectorAll("[data-template]").forEach(b => {
            b.setAttribute("aria-pressed", b.dataset.template === design.template);
        });

        document.querySelectorAll("[data-accent]").forEach(b => {
            b.setAttribute("aria-pressed", b.dataset.accent === design.accent);
        });

        const custom = document.getElementById("accentCustom");
        if (custom) custom.value = design.accent;

        try {
            localStorage.setItem(DESIGN_KEY, JSON.stringify(design));
        } catch (error) { /* storage full or blocked */ }
    }

    applyDesign();


    /* -----------------------------------------------------
       4. MOBILE / TABLET  EDIT | PREVIEW TABS
    ----------------------------------------------------- */

    const tabs = document.createElement("nav");
    tabs.className = "mobile-tabs";
    tabs.setAttribute("aria-label", "Switch view");

    tabs.innerHTML = `
        <button type="button" data-view="edit" aria-pressed="true">Edit</button>
        <button type="button" data-view="preview" aria-pressed="false">Preview</button>
    `;

    document.querySelector(".app-container").before(tabs);

    tabs.addEventListener("click", e => {
        const btn = e.target.closest("[data-view]");
        if (!btn) return;

        const showPreview = btn.dataset.view === "preview";
        document.body.classList.toggle("show-preview", showPreview);

        tabs.querySelectorAll("button").forEach(b => {
            b.setAttribute("aria-pressed", b === btn);
        });

        window.scrollTo({ top: 0 });
    });

})();