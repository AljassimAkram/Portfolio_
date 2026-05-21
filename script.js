document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("tickerTrack");

  if (!track) return;
  if (track.classList.contains("duplicated")) return;

  track.classList.add("duplicated");

  const items = Array.from(track.children);
  const containerWidth = track.parentElement.offsetWidth;

  while (track.scrollWidth < containerWidth * 2) {
    items.forEach((item) => {
      track.appendChild(item.cloneNode(true));
    });
  }
});

loadHTML("about-me.html", "about");
loadHTML("skills.html", "skills");
loadHTML("projects.html", "projects");
loadHTML("oppinion-about-me.html", "oppinion");
loadHTML("contact-me.html", "contact");

function loadHTML(file, elementId) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
    });
}

function toggleLanguage(lang) {
  let en = document.getElementById("en");
  let de = document.getElementById("de");

  en.classList.remove("active");
  de.classList.remove("active");

  document.getElementById(lang).classList.add("active");
}