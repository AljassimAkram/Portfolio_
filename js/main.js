/** Starts page functions after DOM is ready. @returns {void} */
document.addEventListener("DOMContentLoaded", () => {
  initTicker();
  initMobileMenu();
  loadPartials();
});

/** Loads all HTML partials. @returns {void} */
function loadPartials() {
  Promise.all(getPartials().map(loadPartial)).then(afterPartialsLoaded);
}

/** Returns all partial files. @returns {string[][]} */
function getPartials() {
  return [["about-me.html", "about"], ["skills.html", "skills"], ["projects.html", "projects"], ["contact-me.html", "contact"], ["oppinion-about-me.html", "oppinion"]];
}

/** Loads one partial. @param {string[]} partial @returns {Promise<void>} */
function loadPartial(partial) {
  return loadHTML(partial[0], partial[1]);
}

/** Runs functions after partials are loaded. @returns {void} */
function afterPartialsLoaded() {
  renderProjects();
  initSlider();
  changeLanguage(getLanguage());
  initScrollAnimations();
}

/** Loads external HTML. @param {string} file @param {string} id @returns {Promise<void>} */
function loadHTML(file, id) {
  return fetch(file).then((res) => res.text()).then((html) => insertHTML(id, html));
}

/** Inserts HTML into target. @param {string} id @param {string} html @returns {void} */
function insertHTML(id, html) {
  const target = document.getElementById(id);
  if (target) target.innerHTML = html;
}

/** Initializes infinite ticker. @returns {void} */
function initTicker() {
  const track = document.getElementById("tickerTrack");
  if (!track || track.dataset.ready === "true") return;
  duplicateTicker(track);
  track.dataset.ready = "true";
}

/** Duplicates ticker once. @param {HTMLElement} track @returns {void} */
function duplicateTicker(track) {
  const items = Array.from(track.children);
  items.forEach((item) => track.appendChild(item.cloneNode(true)));
  fillTicker(track, items);
}

/** Fills ticker width. @param {HTMLElement} track @param {HTMLElement[]} items @returns {void} */
function fillTicker(track, items) {
  const width = track.parentElement.offsetWidth;
  while (track.scrollWidth < width * 2) items.forEach((item) => track.appendChild(item.cloneNode(true)));
}

/** Initializes mobile menu. @returns {void} */
function initMobileMenu() {
  const navbar = document.querySelector(".navbar");
  const button = document.getElementById("burgerBtn");
  if (!navbar || !button) return;
  button.addEventListener("click", () => toggleMenu(navbar, button));
  document.addEventListener("click", (event) => outsideClick(event, navbar));
}

/** Toggles mobile menu. @param {HTMLElement} nav @param {HTMLElement} btn @returns {void} */
function toggleMenu(nav, btn) {
  const isOpen = nav.classList.toggle("menu-open");
  btn.setAttribute("aria-expanded", String(isOpen));
}

/** Closes menu by outside click. @param {Event} event @param {HTMLElement} nav @returns {void} */
function outsideClick(event, nav) {
  if (!nav.contains(event.target)) closeMobileMenu();
}

/** Closes mobile menu. @returns {void} */
function closeMobileMenu() {
  document.querySelector(".navbar")?.classList.remove("menu-open");
  document.getElementById("burgerBtn")?.setAttribute("aria-expanded", "false");
}
