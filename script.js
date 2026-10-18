console.log("CVFLOW NEW SCRIPT LOADED");

const fields = [
"fullName",
"jobTitle",
"email",
"phone",
"location",
"linkedin",
"github",
"summary"
];

let education = [];
let experience = [];
let projects = [];

// Default skills can remain
let skills = [
"HTML",
"CSS",
"JavaScript",
"React",
"Node.js",
"Python",
"SQL",
"Git"
];

let referees = [];



fields.forEach(id => {
const input = document.getElementById(id);


if (input) {
    input.addEventListener("input", updatePreview);
}


});

function updatePreview() {


const fullName = document.getElementById("fullName");
const jobTitle = document.getElementById("jobTitle");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const location = document.getElementById("location");
const linkedin = document.getElementById("linkedin");
const github = document.getElementById("github");
const summary = document.getElementById("summary");

document.getElementById("previewName").textContent =
    fullName?.value || "Your Name";

document.getElementById("previewJobTitle").textContent =
    jobTitle?.value || "Software Developer";

document.getElementById("previewEmail").textContent =
    email?.value || "email@example.com";

document.getElementById("previewPhone").textContent =
    phone?.value || "+254 700 000 000";

document.getElementById("previewLocation").textContent =
    location?.value || "Nairobi, Kenya";



const linkedinPreview =
    document.getElementById("previewLinkedin");

if (linkedinPreview) {

    const linkedinValue =
        linkedin?.value.trim() || "";

    if (linkedinValue) {

        linkedinPreview.textContent = "LinkedIn";

        linkedinPreview.href =
            linkedinValue.startsWith("http")
                ? linkedinValue
                : `https://${linkedinValue}`;

        linkedinPreview.style.display = "inline";

    } else {

        linkedinPreview.style.display = "none";
    }
}



const githubPreview =
    document.getElementById("previewGithub");

if (githubPreview) {

    const githubValue =
        github?.value.trim() || "";

    if (githubValue) {

        githubPreview.textContent = "GitHub";

        githubPreview.href =
            githubValue.startsWith("http")
                ? githubValue
                : `https://${githubValue}`;

        githubPreview.style.display = "inline";

    } else {

        githubPreview.style.display = "none";
    }
}




document.getElementById("previewSummary").textContent =
    summary?.value ||
    "Your professional summary will appear here.";


/* Render all CV sections */

renderEducationPreview();
renderExperiencePreview();
renderProjectsPreview();
renderSkillsPreview();
renderRefereesPreview();


}



const addEducationButton =
document.getElementById("addEducation");

if (addEducationButton) {
addEducationButton.addEventListener(
"click",
addEducation
);
}

function addEducation(data = {}) {


const item = {

    id: Date.now() + Math.random(),

    school: data.school || "",
    degree: data.degree || "",
    start: data.start || "",
    end: data.end || "",
    description: data.description || ""
};

education.push(item);

renderEducationForm();
updatePreview();


}

function renderEducationForm() {


const container =
    document.getElementById("educationContainer");

if (!container) return;

container.innerHTML = "";

education.forEach(item => {

    const div =
        document.createElement("div");

    div.className = "dynamic-item";

    div.innerHTML = `

        <button
            type="button"
            class="remove-btn"
            onclick="removeEducation(${item.id})"
        >
            Remove
        </button>

        <div class="dynamic-grid">

            <div class="form-group">

                <label>Institution</label>

                <input
                    type="text"
                    value="${escapeHtml(item.school)}"
                    data-id="${item.id}"
                    data-field="school"
                    class="education-input"
                    placeholder="University / College"
                >

            </div>


            <div class="form-group">

                <label>Degree / Qualification</label>

                <input
                    type="text"
                    value="${escapeHtml(item.degree)}"
                    data-id="${item.id}"
                    data-field="degree"
                    class="education-input"
                    placeholder="Bachelor of Science in IT"
                >

            </div>


            <div class="form-group">

                <label>Start Year</label>

                <input
                    type="text"
                    value="${escapeHtml(item.start)}"
                    data-id="${item.id}"
                    data-field="start"
                    class="education-input"
                    placeholder="2022"
                >

            </div>


            <div class="form-group">

                <label>End Year</label>

                <input
                    type="text"
                    value="${escapeHtml(item.end)}"
                    data-id="${item.id}"
                    data-field="end"
                    class="education-input"
                    placeholder="2026"
                >

            </div>


            <div class="form-group full">

                <label>Description</label>

                <textarea
                    data-id="${item.id}"
                    data-field="description"
                    class="education-input"
                    placeholder="Relevant achievements or coursework..."
                >${escapeHtml(item.description)}</textarea>

            </div>

        </div>
    `;

    container.appendChild(div);
});


document
    .querySelectorAll(".education-input")
    .forEach(input => {

        input.addEventListener("input", e => {

            const id =
                Number(e.target.dataset.id);

            const field =
                e.target.dataset.field;

            const item =
                education.find(x => x.id === id);

            if (item) {
                item[field] = e.target.value;
            }

            updatePreview();
        });
    });


}

function removeEducation(id) {


education =
    education.filter(item => item.id !== id);

renderEducationForm();
updatePreview();


}


const addExperienceButton =
document.getElementById("addExperience");

if (addExperienceButton) {


addExperienceButton.addEventListener(
    "click",
    addExperience
);


}

function addExperience(data = {}) {


const item = {

    id: Date.now() + Math.random(),

    company: data.company || "",
    position: data.position || "",
    start: data.start || "",
    end: data.end || "",
    description: data.description || ""
};

experience.push(item);

renderExperienceForm();
updatePreview();


}

function renderExperienceForm() {


const container =
    document.getElementById("experienceContainer");

if (!container) return;

container.innerHTML = "";

experience.forEach(item => {

    const div =
        document.createElement("div");

    div.className = "dynamic-item";

    div.innerHTML = `

        <button
            type="button"
            class="remove-btn"
            onclick="removeExperience(${item.id})"
        >
            Remove
        </button>

        <div class="dynamic-grid">

            <div class="form-group">

                <label>Company</label>

                <input
                    type="text"
                    value="${escapeHtml(item.company)}"
                    data-id="${item.id}"
                    data-field="company"
                    class="experience-input"
                    placeholder="Company name"
                >

            </div>


            <div class="form-group">

                <label>Position</label>

                <input
                    type="text"
                    value="${escapeHtml(item.position)}"
                    data-id="${item.id}"
                    data-field="position"
                    class="experience-input"
                    placeholder="Software Developer"
                >

            </div>


            <div class="form-group">

                <label>Start Date</label>

                <input
                    type="text"
                    value="${escapeHtml(item.start)}"
                    data-id="${item.id}"
                    data-field="start"
                    class="experience-input"
                    placeholder="Jan 2025"
                >

            </div>


            <div class="form-group">

                <label>End Date</label>

                <input
                    type="text"
                    value="${escapeHtml(item.end)}"
                    data-id="${item.id}"
                    data-field="end"
                    class="experience-input"
                    placeholder="Present"
                >

            </div>


            <div class="form-group full">

                <label>Description</label>

                <textarea
                    data-id="${item.id}"
                    data-field="description"
                    class="experience-input"
                    placeholder="Describe your responsibilities and achievements..."
                >${escapeHtml(item.description)}</textarea>

            </div>

        </div>
    `;

    container.appendChild(div);
});


document
    .querySelectorAll(".experience-input")
    .forEach(input => {

        input.addEventListener("input", e => {

            const id =
                Number(e.target.dataset.id);

            const field =
                e.target.dataset.field;

            const item =
                experience.find(x => x.id === id);

            if (item) {
                item[field] = e.target.value;
            }

            updatePreview();
        });
    });


}

function removeExperience(id) {

experience =
    experience.filter(item => item.id !== id);

renderExperienceForm();
updatePreview();


}



const addProjectButton =
document.getElementById("addProject");

if (addProjectButton) {


addProjectButton.addEventListener(
    "click",
    addProject
);


}

function addProject(data = {}) {


const item = {

    id: Date.now() + Math.random(),

    name: data.name || "",
    link: data.link || "",
    description: data.description || ""
};

projects.push(item);

renderProjectsForm();
updatePreview();


}

function renderProjectsForm() {

const container =
    document.getElementById("projectsContainer");

if (!container) return;

container.innerHTML = "";

projects.forEach(item => {

    const div =
        document.createElement("div");

    div.className = "dynamic-item";

    div.innerHTML = `

        <button
            type="button"
            class="remove-btn"
            onclick="removeProject(${item.id})"
        >
            Remove
        </button>

        <div class="dynamic-grid">

            <div class="form-group">

                <label>Project Name</label>

                <input
                    type="text"
                    value="${escapeHtml(item.name)}"
                    data-id="${item.id}"
                    data-field="name"
                    class="project-input"
                    placeholder="My Portfolio Website"
                >

            </div>


            <div class="form-group">

                <label>Project Link</label>

                <input
                    type="text"
                    value="${escapeHtml(item.link)}"
                    data-id="${item.id}"
                    data-field="link"
                    class="project-input"
                    placeholder="https://github.com/..."
                >

            </div>


            <div class="form-group full">

                <label>Description</label>

                <textarea
                    data-id="${item.id}"
                    data-field="description"
                    class="project-input"
                    placeholder="Describe what you built..."
                >${escapeHtml(item.description)}</textarea>

            </div>

        </div>
    `;

    container.appendChild(div);
});


document
    .querySelectorAll(".project-input")
    .forEach(input => {

        input.addEventListener("input", e => {

            const id =
                Number(e.target.dataset.id);

            const field =
                e.target.dataset.field;

            const item =
                projects.find(x => x.id === id);

            if (item) {
                item[field] = e.target.value;
            }

            updatePreview();
        });
    });


}

function removeProject(id) {


projects =
    projects.filter(item => item.id !== id);

renderProjectsForm();
updatePreview();


}



const addSkillButton =
document.getElementById("addSkill");

if (addSkillButton) {


addSkillButton.addEventListener(
    "click",
    addSkill
);


}

const skillInput =
document.getElementById("skillInput");

if (skillInput) {


skillInput.addEventListener("keydown", e => {

    if (e.key === "Enter") {

        e.preventDefault();
        addSkill();
    }

});


}

function addSkill() {


const input =
    document.getElementById("skillInput");

if (!input) return;

const skill =
    input.value.trim();

if (!skill) return;


if (!skills.includes(skill)) {
    skills.push(skill);
}


input.value = "";

renderSkillsForm();
updatePreview();


}

function renderSkillsForm() {


const container =
    document.getElementById("skillsContainer");

if (!container) return;

container.innerHTML = "";

skills.forEach((skill, index) => {

    const tag =
        document.createElement("div");

    tag.className = "skill-tag";

    tag.innerHTML = `

        <span>${escapeHtml(skill)}</span>

        <button
            type="button"
            onclick="removeSkill(${index})"
            title="Remove skill"
            aria-label="Remove ${escapeHtml(skill)}"
        >
            ×
        </button>
    `;

    container.appendChild(tag);
});


}

function removeSkill(index) {


skills.splice(index, 1);

renderSkillsForm();
updatePreview();


}

/* =========================================================
REFEREES FORM
========================================================= */

const addRefereeButton =
document.getElementById("addReferee");

if (addRefereeButton) {


addRefereeButton.addEventListener(
    "click",
    addReferee
);


}

function addReferee(data = {}) {


const item = {

    id: Date.now() + Math.random(),

    name: data.name || "",
    position: data.position || "",
    organization: data.organization || "",
    phone: data.phone || "",
    email: data.email || ""
};

referees.push(item);

renderRefereesForm();
updatePreview();


}

function renderRefereesForm() {


const container =
    document.getElementById("refereesContainer");

if (!container) return;

container.innerHTML = "";

referees.forEach(item => {

    const div =
        document.createElement("div");

    div.className = "dynamic-item";

    div.innerHTML = `

        <button
            type="button"
            class="remove-btn"
            onclick="removeReferee(${item.id})"
        >
            Remove
        </button>

        <div class="dynamic-grid">

            <div class="form-group">

                <label>Full Name</label>

                <input
                    type="text"
                    value="${escapeHtml(item.name)}"
                    data-id="${item.id}"
                    data-field="name"
                    class="referee-input"
                    placeholder="John Doe"
                >

            </div>


            <div class="form-group">

                <label>Position</label>

                <input
                    type="text"
                    value="${escapeHtml(item.position)}"
                    data-id="${item.id}"
                    data-field="position"
                    class="referee-input"
                    placeholder="Senior Software Developer"
                >

            </div>


            <div class="form-group">

                <label>Organization</label>

                <input
                    type="text"
                    value="${escapeHtml(item.organization)}"
                    data-id="${item.id}"
                    data-field="organization"
                    class="referee-input"
                    placeholder="ABC Technologies"
                >

            </div>


            <div class="form-group">

                <label>Phone</label>

                <input
                    type="text"
                    value="${escapeHtml(item.phone)}"
                    data-id="${item.id}"
                    data-field="phone"
                    class="referee-input"
                    placeholder="+254 700 000 000"
                >

            </div>


            <div class="form-group">

                <label>Email</label>

                <input
                    type="email"
                    value="${escapeHtml(item.email)}"
                    data-id="${item.id}"
                    data-field="email"
                    class="referee-input"
                    placeholder="john@example.com"
                >

            </div>

        </div>
    `;

    container.appendChild(div);
});


document
    .querySelectorAll(".referee-input")
    .forEach(input => {

        input.addEventListener("input", e => {

            const id =
                Number(e.target.dataset.id);

            const field =
                e.target.dataset.field;

            const item =
                referees.find(x => x.id === id);

            if (item) {
                item[field] = e.target.value;
            }

            updatePreview();
        });

    });


}

function removeReferee(id) {


referees =
    referees.filter(item => item.id !== id);

renderRefereesForm();
updatePreview();


}


function renderEducationPreview() {


const container =
    document.getElementById("previewEducation");

const section =
    document.getElementById("educationSection");

if (!container || !section) return;


if (education.length === 0) {

    section.style.display = "none";
    container.innerHTML = "";

    return;
}


section.style.display = "block";
container.innerHTML = "";


education.forEach(item => {

    const div =
        document.createElement("div");

    div.className = "cv-entry";


    const header =
        document.createElement("div");

    header.className = "cv-entry-header";


    const left =
        document.createElement("div");


    const degree =
        document.createElement("h3");

    degree.textContent =
        item.degree || "Degree";


    const institution =
        document.createElement("div");

    institution.className =
        "institution";

    institution.textContent =
        item.school || "Institution";


    left.appendChild(degree);
    left.appendChild(institution);


    const date =
        document.createElement("div");

    date.className = "date";

    date.textContent =
        [item.start, item.end]
            .filter(Boolean)
            .join(" — ");


    header.appendChild(left);
    header.appendChild(date);

    div.appendChild(header);


    if (item.description) {

        const description =
            document.createElement("div");

        description.className =
            "cv-entry-description";

        description.textContent =
            item.description;

        div.appendChild(description);
    }


    container.appendChild(div);
});


}



function renderExperiencePreview() {


const container =
    document.getElementById("previewExperience");

const section =
    document.getElementById("experienceSection");

if (!container || !section) return;


if (experience.length === 0) {

    section.style.display = "none";
    container.innerHTML = "";

    return;
}


section.style.display = "block";
container.innerHTML = "";


experience.forEach(item => {

    const div =
        document.createElement("div");

    div.className = "cv-entry";


    const header =
        document.createElement("div");

    header.className = "cv-entry-header";


    const left =
        document.createElement("div");


    const position =
        document.createElement("h3");

    position.textContent =
        item.position || "Position";


    const company =
        document.createElement("div");

    company.className = "institution";

    company.textContent =
        item.company || "Company";


    left.appendChild(position);
    left.appendChild(company);


    const date =
        document.createElement("div");

    date.className = "date";

    date.textContent =
        [item.start, item.end]
            .filter(Boolean)
            .join(" — ");


    header.appendChild(left);
    header.appendChild(date);

    div.appendChild(header);


    if (item.description) {

        const description =
            document.createElement("div");

        description.className =
            "cv-entry-description";

        description.textContent =
            item.description;

        div.appendChild(description);
    }


    container.appendChild(div);
});


}



function renderProjectsPreview() {


const container =
    document.getElementById("previewProjects");

const section =
    document.getElementById("projectsSection");

if (!container || !section) return;


if (projects.length === 0) {

    section.style.display = "none";
    container.innerHTML = "";

    return;
}


section.style.display = "block";
container.innerHTML = "";


projects.forEach(item => {

    const div =
        document.createElement("div");

    div.className = "cv-entry";


    const header =
        document.createElement("div");

    header.className = "cv-entry-header";


    const left =
        document.createElement("div");


    const name =
        document.createElement("h3");

    name.textContent =
        item.name || "Project";


    left.appendChild(name);


    if (item.link) {

        const linkContainer =
            document.createElement("div");

        linkContainer.className =
            "institution";


        const link =
            document.createElement("a");

        link.className =
            "project-link";

        link.textContent =
            item.link;

        link.href =
            item.link.startsWith("http")
                ? item.link
                : `https://${item.link}`;

        link.target = "_blank";
        link.rel = "noopener";


        linkContainer.appendChild(link);
        left.appendChild(linkContainer);
    }


    header.appendChild(left);
    div.appendChild(header);


    if (item.description) {

        const description =
            document.createElement("div");

        description.className =
            "cv-entry-description";

        description.textContent =
            item.description;

        div.appendChild(description);
    }


    container.appendChild(div);
});


}



function renderSkillsPreview() {


const container =
    document.getElementById("previewSkills");

const section =
    document.getElementById("skillsSection");

if (!container || !section) return;


if (skills.length === 0) {

    section.style.display = "none";
    container.innerHTML = "";

    return;
}


section.style.display = "block";
container.innerHTML = "";


skills.forEach(skill => {

    const span =
        document.createElement("span");

    span.className =
        "preview-skill";

    span.textContent =
        skill;

    container.appendChild(span);
});


}



function renderRefereesPreview() {


const container =
    document.getElementById("previewReferees");

const section =
    document.getElementById("previewRefereesSection");

if (!container || !section) return;


const validReferees =
    referees.filter(referee =>
        referee.name ||
        referee.position ||
        referee.organization ||
        referee.phone ||
        referee.email
    );


if (validReferees.length === 0) {

    section.style.display = "none";
    container.innerHTML = "";

    return;
}


section.style.display = "block";
container.innerHTML = "";


validReferees.forEach(referee => {

    const div =
        document.createElement("div");

    div.className = "referee-preview";


    if (referee.name) {

        const name =
            document.createElement("div");

        name.className = "referee-name";

        name.textContent =
            referee.name;

        div.appendChild(name);
    }


    if (
        referee.position ||
        referee.organization
    ) {

        const position =
            document.createElement("div");

        position.className =
            "referee-position";

        position.textContent =
            [referee.position, referee.organization]
                .filter(Boolean)
                .join(" — ");

        div.appendChild(position);
    }


    if (referee.phone) {

        const phone =
            document.createElement("div");

        phone.className =
            "referee-contact";

        phone.textContent =
            `Phone: ${referee.phone}`;

        div.appendChild(phone);
    }


    if (referee.email) {

        const email =
            document.createElement("div");

        email.className =
            "referee-contact";

        email.textContent =
            `Email: ${referee.email}`;

        div.appendChild(email);
    }


    container.appendChild(div);
});


}



const saveButton =
document.getElementById("saveBtn");

if (saveButton) {


saveButton.addEventListener(
    "click",
    saveCV
);


}

function saveCV() {


const data = {

    fields: {},

    education,
    experience,
    projects,
    skills,
    referees
};


fields.forEach(id => {

    const input =
        document.getElementById(id);

    if (input) {

        data.fields[id] =
            input.value;
    }

});


localStorage.setItem(
    "cvflowData",
    JSON.stringify(data)
);


showToast(
    "CV saved successfully!"
);


}



function loadCV() {


const saved =
    localStorage.getItem("cvflowData");


/* =========================================
   NO SAVED CV

   IMPORTANT:
   New users start with a completely blank CV.
   Your personal information is NOT included.
   Default skills are kept.
========================================= */

if (!saved) {

    // Personal information is blank
    fields.forEach(id => {

        const input =
            document.getElementById(id);

        if (input) {
            input.value = "";
        }

    });


    // No sample education
    education = [];


    // No sample experience
    experience = [];


    // No sample projects
    projects = [];


    // No sample referees
    referees = [];


    // Default skills remain
    skills = [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node.js",
        "Python",
        "SQL",
        "Git"
    ];


    renderEducationForm();
    renderExperienceForm();
    renderProjectsForm();
    renderSkillsForm();
    renderRefereesForm();

    updatePreview();

    return;
}




let data;


try {

    data =
        JSON.parse(saved);

} catch (error) {

    console.error(
        "Could not load saved CV:",
        error
    );

    localStorage.removeItem(
        "cvflowData"
    );

    loadCV();

    return;
}


/* Basic fields */

if (data.fields) {

    fields.forEach(id => {

        const input =
            document.getElementById(id);

        if (
            input &&
            data.fields[id] !== undefined
        ) {

            input.value =
                data.fields[id];
        }

    });
}


/* Dynamic sections */

education =
    Array.isArray(data.education)
        ? data.education
        : [];


experience =
    Array.isArray(data.experience)
        ? data.experience
        : [];


projects =
    Array.isArray(data.projects)
        ? data.projects
        : [];


skills =
    Array.isArray(data.skills)
        ? data.skills
        : [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Node.js",
            "Python",
            "SQL",
            "Git"
        ];


referees =
    Array.isArray(data.referees)
        ? data.referees
        : [];


/* Render forms */

renderEducationForm();
renderExperienceForm();
renderProjectsForm();
renderSkillsForm();
renderRefereesForm();


/* Update CV */

updatePreview();


}



const clearButton =
document.getElementById("clearBtn");

if (clearButton) {


clearButton.addEventListener(
    "click",
    clearCV
);


}

function clearCV() {

const confirmed =
    confirm(
        "Are you sure you want to clear your CV?"
    );


if (!confirmed) return;


fields.forEach(id => {

    const input =
        document.getElementById(id);

    if (input) {
        input.value = "";
    }

});


education = [];
experience = [];
projects = [];
referees = [];


// Keep default skills
skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "SQL",
    "Git"
];


localStorage.removeItem(
    "cvflowData"
);


renderEducationForm();
renderExperienceForm();
renderProjectsForm();
renderSkillsForm();
renderRefereesForm();


updatePreview();


showToast("CV cleared.");


}



const printButton =
document.getElementById("printBtn");

if (printButton) {


printButton.addEventListener(
    "click",
    printCV
);


}

const printButtonBottom =
document.getElementById("printBtnBottom");

if (printButtonBottom) {


printButtonBottom.addEventListener(
    "click",
    printCV
);


}

function printCV() {
window.print();
}



function showToast(message) {


const toast =
    document.getElementById("toast");

if (!toast) return;


toast.textContent =
    message;

toast.classList.add("show");


setTimeout(() => {

    toast.classList.remove("show");

}, 2500);


}



function escapeHtml(value) {


if (!value) return "";

return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}



loadCV();
