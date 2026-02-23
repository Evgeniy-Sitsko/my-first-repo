(() => {
  const root = document.documentElement;

  const THEME_KEY = "theme";
  const TELEGRAM = "@EvgeniySitko";

  const themeBtn = document.getElementById("themeBtn");
  const copyBtn = document.getElementById("copyBtn");
  const yearEl = document.getElementById("year");
  const updatedAtEl = document.getElementById("updatedAt");
  const toastEl = document.getElementById("toast");

  function showToast(text) {
    if (!toastEl) return;
    toastEl.textContent = text;
    toastEl.classList.add("show");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => toastEl.classList.remove("show"), 1700);
  }

  function setTheme(theme) {
    // CSS: dark theme is enabled when data-theme="dark"
    if (theme === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme"); // light = default
    localStorage.setItem(THEME_KEY, theme);
  }

  function getTheme() {
    return localStorage.getItem(THEME_KEY) || "light";
  }

  function toggleTheme() {
    const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
    showToast(next === "dark" ? "Тёмная тема" : "Светлая тема");
  }

  // Init
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  if (updatedAtEl) updatedAtEl.textContent = new Date().toLocaleDateString("ru-RU");
  setTheme(getTheme());

  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(TELEGRAM);
        showToast("Скопировано: " + TELEGRAM);
      } catch {
        showToast("Не получилось скопировать — выдели вручную: " + TELEGRAM);
      }
    });
  }

  // Optional: smooth anchor scroll (приятнее)
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduced) {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (!href || href === "#") return;
        const el = document.querySelector(href);
        if (!el) return;

        e.preventDefault();
        const header = document.querySelector(".header");
        const headerH = header ? header.getBoundingClientRect().height : 0;
        const y = el.getBoundingClientRect().top + window.scrollY - headerH - 18;

        history.pushState(null, "", href);
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      });
    });
  }
})();