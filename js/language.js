/** Gets saved language. @returns {string} */
function getLanguage() {
  return localStorage.getItem("language") || "en";
}

/** Gets current translation object. @returns {Object} */
function getTranslations() {
  return getLanguage() === "de" ? de : en;
}

/** Changes page language. @param {string} lang @returns {void} */
function changeLanguage(lang) {
  saveLanguage(lang);
  translateTexts(lang);
  translatePlaceholders(lang);
  setActiveLanguage(lang);
}

/** Saves language key. @param {string} lang @returns {void} */
function saveLanguage(lang) {
  localStorage.setItem("language", lang);
  document.documentElement.lang = lang;
}

/** Translates text elements. @param {string} lang @returns {void} */
function translateTexts(lang) {
  const translations = lang === "de" ? de : en;
  document.querySelectorAll("[data-lang]").forEach((el) => translateElement(el, translations));
}

/** Translates one element. @param {HTMLElement} el @param {Object} text @returns {void} */
function translateElement(el, text) {
  const key = el.dataset.lang;
  if (text[key]) el.textContent = text[key];
}

/** Translates placeholders. @param {string} lang @returns {void} */
function translatePlaceholders(lang) {
  const translations = lang === "de" ? de : en;
  document.querySelectorAll("[data-placeholder]").forEach((el) => translatePlaceholder(el, translations));
}

/** Translates one placeholder. @param {HTMLElement} el @param {Object} text @returns {void} */
function translatePlaceholder(el, text) {
  const key = el.dataset.placeholder;
  if (text[key]) el.placeholder = text[key];
}

/** Sets active language button. @param {string} lang @returns {void} */
function setActiveLanguage(lang) {
  document.getElementById("en")?.classList.toggle("active", lang === "en");
  document.getElementById("de")?.classList.toggle("active", lang === "de");
}
