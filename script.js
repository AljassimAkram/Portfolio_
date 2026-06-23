function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else if (entry.boundingClientRect.top > 0) {
        entry.target.classList.remove("show");
      }
    });
  }, {
    threshold: 0.2
  });

  document
    .querySelectorAll("[data-animation]")
    .forEach((el) => observer.observe(el));
}