(function () {
  const root = document.documentElement;

  const themeBtn = document.getElementById("themeBtn");
  const copyBtn = document.getElementById("copyBtn");
  const yearEl = document.getElementById("year");
  const updatedAtEl = document.getElementById("updatedAt");
  const toastEl = document.getElementById("toast");

  const TELEGRAM = "@EvgeniySitko";
  const THEME_KEY = "theme";

  function showToast(text) {
    toastEl.textContent = text;
    toastEl.classList.add("show");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => toastEl.classList.remove("show"), 1700);
  }

  function setTheme(theme) {
    if (theme === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
    localStorage.setItem(THEME_KEY, theme);
  }

  function setTheme(theme) {
  if (theme === "dark") root.setAttribute("data-theme", "dark");
  else root.removeAttribute("data-theme");
  localStorage.setItem(THEME_KEY, theme);
  }

  // Init
  yearEl.textContent = String(new Date().getFullYear());
  updatedAtEl.textContent = new Date().toLocaleDateString("ru-RU");
  setTheme(localStorage.getItem(THEME_KEY) || "light");

  themeBtn?.addEventListener("click", toggleTheme);

  copyBtn?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(TELEGRAM);
      showToast("Скопировано: " + TELEGRAM);
    } catch {
      showToast("Не получилось скопировать — выдели вручную: " + TELEGRAM);
    }
  });

  // Buttons with data-toast
  document.querySelectorAll("[data-toast]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const msg = el.getAttribute("data-toast");
      if (msg) showToast(msg);
    });
  });
    // Super-smooth anchor scrolling (with easing)
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function smoothScrollTo(targetY, duration = 550) {
    const startY = window.scrollY || window.pageYOffset;
    const diff = targetY - startY;
    const start = performance.now();

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeInOutCubic(t);
      window.scrollTo(0, startY + diff * eased);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

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
        smoothScrollTo(Math.max(0, y), 650);
      });
    });
  }
})();