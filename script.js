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

  function toggleTheme() {
    const isLight = root.getAttribute("data-theme") === "light";
    setTheme(isLight ? "dark" : "light");
    showToast(isLight ? "Тёмная тема" : "Светлая тема");
  }

  // Init
  yearEl.textContent = String(new Date().getFullYear());
  updatedAtEl.textContent = new Date().toLocaleDateString("ru-RU");
  setTheme(localStorage.getItem(THEME_KEY) || "dark");

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
})();