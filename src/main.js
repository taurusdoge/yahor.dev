const themeBtns = document.querySelectorAll("#themeToggleDesktop, #themeToggleMobile");
if (themeBtns) {
  const stored = localStorage.getItem("theme");
  if (stored) {
    applyTheme(stored);
  } else {
    applyTheme("follow-os");
  }

  themeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = localStorage.getItem("theme") || "follow-os";
      const themes = ["follow-os", "light", "dark"];
      const currentIndex = themes.indexOf(current);
      const newTheme = themes[(currentIndex + 1) % themes.length];
      
      if (newTheme === "follow-os") {
        localStorage.removeItem("theme");
        document.documentElement.removeAttribute("data-theme");
        updateThemeButton("follow-os");
        updateLogoTheme(getEffectiveTheme());
      } else {
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
      }
    });
  });
}

function applyTheme(theme) {
  if (theme === "follow-os") {
    document.documentElement.removeAttribute("data-theme");
    updateThemeButton("follow-os");
    updateLogoTheme(getEffectiveTheme());
  } else {
    document.documentElement.setAttribute("data-theme", theme);
    updateThemeButton(theme);
    updateLogoTheme(theme);
  }
}

function getEffectiveTheme() {
  const dataTheme = document.documentElement.getAttribute("data-theme");
  if (dataTheme) return dataTheme;
  
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function updateThemeButton(theme) {
  const buttons = document.querySelectorAll("#themeToggleDesktop, #themeToggleMobile");
  const themeConfig = {
    "follow-os": { icon: "🌓", label: "Auto" },
    "light": { icon: "☀️", label: "Light" },
    "dark": { icon: "🌙", label: "Dark" }
  };
  
  const config = themeConfig[theme];
  buttons.forEach(btn => {
    const icon = btn.querySelector(".theme-icon");
    const label = btn.querySelector(".theme-label");
    if (icon) icon.textContent = config.icon;
    if (label) label.textContent = config.label;
    btn.setAttribute("aria-label", `Current theme: ${config.label}. Click to cycle.`);
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
