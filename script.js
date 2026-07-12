const projectList = document.querySelector("#project-list");
const projectCount = document.querySelector("#project-count");
const currentYear = document.querySelector("#current-year");
const statsStage = document.querySelector("#stats-stage");
const statsLabel = document.querySelector("#stats-label");
const statsValue = document.querySelector("#stats-value");
const statsDetail = document.querySelector("#stats-detail");
const statsProgress = document.querySelector("#stats-progress");
let statsTimer;
const fallbackProjects = [
  {
    name: "earworm-website",
    title: "Earworm Website",
    url: "https://haydenw-uk.github.io/earworm-website/",
    language: "CSS",
    stars: 0,
    forks: 0,
    updatedAt: "2026-07-08T00:54:02Z",
  },
  {
    name: "Money-Mission",
    title: "Money Mission",
    url: "https://haydenw-uk.github.io/Money-Mission/",
    language: "GitHub Pages",
  },
];

currentYear.textContent = new Date().getFullYear();

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function titleFromSlug(name) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function safeUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

function formatDate(value) {
  if (!value) {
    return "SYNCING";
  }

  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
  }).format(new Date(value)).toUpperCase();
}

function renderStats(projects) {
  const languages = [...new Set(
    projects
      .map((project) => project.language)
      .filter((language) => language && language !== "GitHub Pages"),
  )];
  const publicStars = projects.reduce((total, project) => total + (Number(project.stars) || 0), 0);
  const forks = projects.reduce((total, project) => total + (Number(project.forks) || 0), 0);
  const updates = projects
    .map((project) => project.updatedAt)
    .filter(Boolean)
    .sort()
  const latestUpdate = updates[updates.length - 1];
  const stats = [
    { label: "PAGES INDEXED", value: projects.length, detail: "GitHub Pages websites" },
    { label: "LANGUAGES", value: languages.length, detail: languages.join(" / ") || "Index updating" },
    { label: "PUBLIC STARS", value: publicStars, detail: "Across indexed repositories" },
    { label: "FORKS", value: forks, detail: "Across indexed repositories" },
    { label: "LAST UPDATED", value: formatDate(latestUpdate), detail: "From the project index" },
  ];
  let index = 0;

  function showStat() {
    const stat = stats[index];
    statsLabel.textContent = stat.label;
    statsValue.textContent = typeof stat.value === "number"
      ? new Intl.NumberFormat("en-GB").format(stat.value).padStart(2, "0")
      : stat.value;
    statsDetail.textContent = stat.detail;
    statsProgress.style.width = `${((index + 1) / stats.length) * 100}%`;
    statsStage.classList.remove("stats-enter");
    void statsStage.offsetWidth;
    statsStage.classList.add("stats-enter");
    index = (index + 1) % stats.length;
  }

  clearInterval(statsTimer);
  showStat();
  statsTimer = setInterval(showStat, 3200);
}

function renderProjects(projects) {
  const visibleProjects = projects
    .map((project) => ({
      ...project,
      title: project.title || titleFromSlug(project.name || ""),
      url: safeUrl(project.url),
    }))
    .filter((project) => project.title && project.url);

  projectCount.textContent = String(visibleProjects.length).padStart(2, "0");
  renderStats(visibleProjects);

  if (!visibleProjects.length) {
    projectList.innerHTML = '<p class="empty-state">No projects yet.</p>';
    return;
  }

  projectList.innerHTML = visibleProjects
    .map((project, index) => {
      const language = project.language || "GitHub Pages";

      return `
        <a class="project-card" href="${escapeHtml(project.url)}" target="_blank" rel="noreferrer">
          <span class="project-index">${String(index + 1).padStart(2, "0")}</span>
          <span class="project-content">
            <h3>${escapeHtml(project.title)}</h3>
          </span>
          <span class="project-meta">
            <span>${escapeHtml(language)}</span>
            <span class="project-arrow" aria-hidden="true">↗</span>
          </span>
        </a>`;
    })
    .join("");
}

async function loadProjects() {
  try {
    const response = await fetch("projects.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Project index returned ${response.status}`);
    }

    renderProjects(await response.json());
  } catch (error) {
    renderProjects(fallbackProjects);
    console.warn("Could not load the generated project index.", error);
  }
}

renderProjects(fallbackProjects);
loadProjects();
