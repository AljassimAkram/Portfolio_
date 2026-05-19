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