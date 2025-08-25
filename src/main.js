const themeBtns = document.querySelectorAll(".ghost");
if (themeBtns) {
  const stored = localStorage.getItem("theme");
  if (stored) {
    document.documentElement.setAttribute("data-theme", stored);
    updateLogoTheme(stored);
  }

  themeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const newTheme = current === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateLogoTheme(newTheme);
    });
  });
}

function updateLogoTheme(theme) {
  const logoElements = document.querySelectorAll(
    '.logo-text:not([fill*="Orange"])'
  );
  const gradientId = theme === "light" ? "#logoBlueDark" : "#logoBlueLight";

  logoElements.forEach((element) => {
    if (!element.getAttribute("fill").includes("Orange")) {
      element.setAttribute("fill", `url(${gradientId})`);
    }
  });
}

const navToggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("menu");
if (navToggle && menu) {
  navToggle.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    menu.classList.toggle("show");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("show");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.getElementById("year").textContent = new Date().getFullYear();

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document
    .querySelectorAll(".marquee span")
    .forEach((s) => (s.style.animation = "none"));
  document
    .querySelectorAll(".blob")
    .forEach((b) => (b.style.animation = "none"));
}
