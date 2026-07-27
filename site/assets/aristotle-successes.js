import {
  ARISTOTLE_SUCCESS_INDEX_URL,
  validateSuccessIndex,
} from "./aristotle-core.mjs?build=20260726-public-archive";

(() => {
  "use strict";

  const list = document.querySelector("[data-success-list]");
  const status = document.querySelector("[data-success-status]");
  const empty = document.querySelector("[data-success-empty]");
  const count = document.querySelector("[data-success-count]");
  const refresh = document.querySelector("[data-success-refresh]");

  if (
    !(list instanceof HTMLOListElement) ||
    !(refresh instanceof HTMLButtonElement)
  ) {
    return;
  }

  const formatDate = (value) => {
    if (!value) return "Completion time unavailable";
    const date = new Date(value);
    if (Number.isNaN(date.valueOf())) return "Completion time unavailable";
    return new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const createLink = (label, href, className) => {
    const link = document.createElement("a");
    link.className = className;
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = label;
    return link;
  };

  const render = (items) => {
    list.replaceChildren();
    for (const item of items) {
      const row = document.createElement("li");
      row.className = "success-run";

      const copy = document.createElement("div");
      copy.className = "success-run-copy";
      const meta = document.createElement("p");
      meta.className = "success-run-meta";
      meta.textContent =
        `${formatDate(item.completedAt ?? item.archivedAt)} · ${item.sourceKind}`;
      const title = document.createElement("h2");
      title.textContent = item.title;
      const summary = document.createElement("p");
      summary.className = "success-run-summary";
      summary.textContent =
        item.outputSummary ||
        "Aristotle completed the project and returned a result archive.";
      const id = document.createElement("code");
      id.textContent = item.projectId;
      copy.append(meta, title, summary, id);

      const actions = document.createElement("div");
      actions.className = "success-run-actions";
      actions.append(
        createLink("Evidence", item.repositoryUrl, "button button-secondary"),
      );
      if (item.resultUrl) {
        actions.append(
          createLink("Result ↓", item.resultUrl, "button button-primary"),
        );
      }
      row.append(copy, actions);
      list.append(row);
    }

    const hasItems = items.length > 0;
    list.hidden = !hasItems;
    if (empty instanceof HTMLElement) empty.hidden = hasItems;
    if (status instanceof HTMLElement) status.hidden = true;
    if (count instanceof HTMLElement) {
      count.textContent =
        `${items.length.toLocaleString("en-US")} successful ${
          items.length === 1 ? "run" : "runs"
        }`;
    }
  };

  const load = async () => {
    refresh.disabled = true;
    refresh.setAttribute("aria-busy", "true");
    if (status instanceof HTMLElement) {
      status.hidden = false;
      status.textContent = "Loading the public GitHub index…";
    }
    try {
      const response = await fetch(
        `${ARISTOTLE_SUCCESS_INDEX_URL}?t=${Date.now()}`,
        {
          headers: { Accept: "application/json" },
          cache: "no-store",
          credentials: "omit",
          referrerPolicy: "no-referrer",
        },
      );
      if (!response.ok) {
        throw new Error("The successful-run index is temporarily unavailable.");
      }
      render(validateSuccessIndex(await response.json()));
    } catch (error) {
      list.hidden = true;
      if (empty instanceof HTMLElement) empty.hidden = true;
      if (count instanceof HTMLElement) count.textContent = "Index unavailable";
      if (status instanceof HTMLElement) {
        status.hidden = false;
        status.textContent =
          error instanceof Error
            ? error.message
            : "The successful-run index could not be loaded.";
      }
    } finally {
      refresh.disabled = false;
      refresh.removeAttribute("aria-busy");
    }
  };

  refresh.addEventListener("click", load);
  void load();
})();
