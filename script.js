const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const themeToggle = document.querySelector(".theme-toggle");
const projectSearch = document.querySelector("#project-search");
const projectCards = [...document.querySelectorAll(".project-card")];
const filterButtons = [...document.querySelectorAll(".filter-button")];
const emptyState = document.querySelector("#project-empty");
let activeFilter = "all";

function closeMenu() {
  navMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") {
  document.body.classList.add("light-theme");
}

function updateThemeButton() {
  const isLight = document.body.classList.contains("light-theme");
  themeToggle.innerHTML = `<i class="bi ${isLight ? "bi-moon" : "bi-sun"}" aria-hidden="true"></i>`;
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  localStorage.setItem("portfolio-theme", document.body.classList.contains("light-theme") ? "light" : "dark");
  updateThemeButton();
});
updateThemeButton();

function filterProjects() {
  const query = projectSearch.value.trim().toLowerCase();
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesQuery = !query || card.dataset.search.includes(query) || card.textContent.toLowerCase().includes(query);
    const isVisible = matchesCategory && matchesQuery;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  emptyState.hidden = visibleCount > 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    filterProjects();
  });
});
projectSearch.addEventListener("input", filterProjects);

const contactForm = document.querySelector("#contact-form");
const formFeedback = document.querySelector("#form-feedback");
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formFeedback.classList.remove("error");

  if (!contactForm.reportValidity()) {
    formFeedback.textContent = "Please check that all fields are filled in correctly.";
    formFeedback.classList.add("error");
    return;
  }

  const formData = new FormData(contactForm);
  const subject = String(formData.get("subject")).trim();
  const body = [
    `Name: ${String(formData.get("name")).trim()}`,
    `Email: ${String(formData.get("email")).trim()}`,
    "",
    String(formData.get("message")).trim()
  ].join("\n");
  const mailto = `mailto:bryandobgima2@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  formFeedback.textContent = "Your email app should open with the message ready to send.";
  window.location.href = mailto;
});

document.querySelector("#current-year").textContent = String(new Date().getFullYear());

const backToTop = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 500);
}, { passive: true });
