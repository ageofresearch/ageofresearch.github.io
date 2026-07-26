(() => {
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 10);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  toggle?.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    nav?.classList.toggle("is-open", !isOpen);
  });

  nav?.addEventListener("click", (event) => {
    if (!(event.target instanceof HTMLAnchorElement)) return;
    toggle?.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    toggle?.setAttribute("aria-expanded", "false");
    nav?.classList.remove("is-open");
  });

  document.querySelectorAll("[data-copy-target]").forEach((button) => {
    button.addEventListener("click", async () => {
      const targetId = button.getAttribute("data-copy-target");
      const target = targetId ? document.getElementById(targetId) : null;
      const status = document.querySelector("[data-copy-status]");
      if (!target) return;

      try {
        await navigator.clipboard.writeText(target.textContent ?? "");
        button.textContent = "Copied";
        if (status) status.textContent = "Reproduction commands copied to the clipboard.";
        window.setTimeout(() => {
          button.textContent = "Copy";
          if (status) status.textContent = "";
        }, 2400);
      } catch {
        if (status) status.textContent = "Copy was unavailable. Select the commands manually.";
      }
    });
  });
})();
