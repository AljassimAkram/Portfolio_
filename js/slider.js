/** Initializes testimonial slider. @returns {void} */
function initSlider() {
  if (!getSliderElements()) return;
  bindSliderButtons();
  updateSlider();
}

/** Gets slider elements. @returns {Object|null} */
function getSliderElements() {
  const slider = document.getElementById("slider");
  const dots = document.getElementById("dots");
  const next = document.getElementById("next");
  const prev = document.getElementById("prev");
  return slider && dots && next && prev ? { slider, dots, next, prev } : null;
}

/** Binds slider buttons. @returns {void} */
function bindSliderButtons() {
  const { next, prev } = getSliderElements();
  next.onclick = nextSlide;
  prev.onclick = prevSlide;
  window.goToSlide = goToSlide;
}

/** Updates slider content. @returns {void} */
function updateSlider() {
  const elements = getSliderElements();
  if (!elements) return;
  elements.slider.innerHTML = getSliderHTML();
  elements.dots.innerHTML = getDotsHTML();
}

/** Returns slider HTML. @returns {string} */
function getSliderHTML() {
  return `${getSideCard(-1)}${getCard(reviews[currentSlide], "active")}${getSideCard(1)}`;
}

/** Returns side card. @param {number} offset @returns {string} */
function getSideCard(offset) {
  const index = currentSlide + offset;
  return reviews[index] ? getCard(reviews[index], "side") : "<div class='empty'></div>";
}

/** Returns one review card. @param {string[]} review @param {string} type @returns {string} */
function getCard(review, type) {
  return `<div class="card ${type}"><p>${review[0]}</p><div class="line"></div><div class="author">${review[1]}</div></div>`;
}

/** Returns dots HTML. @returns {string} */
function getDotsHTML() {
  return reviews.map(getDot).join("");
}

/** Returns one dot. @param {string[]} _ @param {number} index @returns {string} */
function getDot(_, index) {
  const active = index === currentSlide ? "active" : "";
  return `<button class="dot ${active}" onclick="goToSlide(${index})"></button>`;
}

/** Goes to selected slide. @param {number} index @returns {void} */
function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

/** Goes to next slide. @returns {void} */
function nextSlide() {
  if (currentSlide < reviews.length - 1) currentSlide++;
  updateSlider();
}

/** Goes to previous slide. @returns {void} */
function prevSlide() {
  if (currentSlide > 0) currentSlide--;
  updateSlider();
}
