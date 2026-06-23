/** Renders project rows. @returns {void} */
function renderProjects() {
  const list = document.getElementById("projectList");
  if (!list) return;
  list.innerHTML = projects.map(getProjectRow).join("");
}

/** Returns one project row. @param {Object} project @returns {string} */
function getProjectRow(project) {
  return `<article class="project-row" onclick="openProject(${project.id})" onmouseenter="showProjectPreview('${project.image}')" onmouseleave="hideProjectPreview()"><h3>${project.title} <span class="arrow-row">↗</span></h3><p>${project.tech.join(" | ")}</p></article>`;
}

/** Shows preview image. @param {string} image @returns {void} */
function showProjectPreview(image) {
  const preview = document.getElementById("projectPreview");
  const lines = document.querySelector(".preview-lines");
  if (!preview || !lines) return;
  preview.src = image;
  preview.classList.add("show");
  lines.classList.add("show");
}

/** Hides preview image. @returns {void} */
function hideProjectPreview() {
  document.getElementById("projectPreview")?.classList.remove("show");
  document.querySelector(".preview-lines")?.classList.remove("show");
}

/** Finds project by id. @param {number} id @returns {Object|undefined} */
function getProject(id) {
  return projects.find((project) => project.id === id);
}

/** Opens project modal. @param {number} id @returns {void} */
function openProject(id) {
  const project = getProject(id);
  const overlay = getModal();
  if (!project || !overlay) return;
  overlay.innerHTML = getModalTemplate(project);
  showModal(overlay);
}

/** Gets modal element. @returns {HTMLElement|null} */
function getModal() {
  return document.getElementById("projectModal");
}

/** Returns modal template. @param {Object} project @returns {string} */
function getModalTemplate(project) {
  return `<div class="project-modal" role="dialog" aria-modal="true">${getCloseButton()}<div class="modal-grid">${getModalContent(project)}${getModalImage(project)}</div>${getNextProjectButton(project.id)}</div>`;
}

/** Returns close button. @returns {string} */
function getCloseButton() {
  return `<button class="close-modal" onclick="closeProject()" aria-label="Close">×</button>`;
}

/** Returns modal content. @param {Object} project @returns {string} */
function getModalContent(project) {
  return `<div>${getProjectNumber(project.id)}<h2>${project.title}</h2><h3>${getTranslations().whatProject}</h3><p class="project-description">${project[getLanguage()]}</p>${getTechList(project)}${getProjectButtons(project)}</div>`;
}

/** Returns project number. @param {number} id @returns {string} */
function getProjectNumber(id) {
  return `<div class="project-number">${String(id).padStart(2, "0")}</div>`;
}

/** Returns tech list. @param {Object} project @returns {string} */
function getTechList(project) {
  return `<div class="project-tech">${project.tech.map(getTechItem).join("")}</div>`;
}

/** Returns one tech item. @param {string} tech @returns {string} */
function getTechItem(tech) {
  return `<span>${tech}</span>`;
}

/** Returns project buttons. @param {Object} project @returns {string} */
function getProjectButtons(project) {
  return `<div class="project-buttons">${getProjectLink(project.github, getTranslations().github)}${getProjectLink(project.live, getTranslations().liveTest)}</div>`;
}

/** Returns project link. @param {string} href @param {string} text @returns {string} */
function getProjectLink(href, text) {
  return `<a class="btn" href="${href}" target="_blank"><span>${text} ↗</span></a>`;
}

/** Returns modal image. @param {Object} project @returns {string} */
function getModalImage(project) {
  return `<img class="project-image" src="${project.image}" alt="${project.title}" />`;
}

/** Returns next project button. @param {number} id @returns {string} */
function getNextProjectButton(id) {
  return `<div class="next-project"><button type="button" onclick="openNextProject(${id})">${getTranslations().nextProject} →</button></div>`;
}

/** Shows modal. @param {HTMLElement} overlay @returns {void} */
function showModal(overlay) {
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

/** Opens next project. @param {number} currentId @returns {void} */
function openNextProject(currentId) {
  const index = projects.findIndex((project) => project.id === currentId);
  openProject(projects[(index + 1) % projects.length].id);
}

/** Closes project modal. @returns {void} */
function closeProject() {
  const overlay = getModal();
  if (!overlay) return;
  resetModal(overlay);
}

/** Resets modal. @param {HTMLElement} overlay @returns {void} */
function resetModal(overlay) {
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = "";
  document.body.style.overflow = "";
}
