const projectList = document.querySelector("#project-list");
const projectCount = document.querySelector("#project-count");
const currentYear = document.querySelector("#current-year");

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

function renderProjects(projects) {
  const visibleProjects = projects
    .map((project) => ({
      ...project,
      title: project.title || titleFromSlug(project.name || ""),
      url: safeUrl(project.url),
    }))
    .filter((project) => project.title && project.url);

  projectCount.textContent = String(visibleProjects.length).padStart(2, "0");

  if (!visibleProjects.length) {
    projectList.innerHTML = '<p class="empty-state">No live projects found yet.</p>';
    return;
  }

  projectList.innerHTML = visibleProjects
    .map((project, index) => {
      const description = project.description || "A small project built and shared in public.";
      const language = project.language || "GitHub Pages";

      return `
        <a class="project-card" href="${escapeHtml(project.url)}" target="_blank" rel="noreferrer">
          <span class="project-index">${String(index + 1).padStart(2, "0")}</span>
          <span class="project-content">
            <h3>${escapeHtml(project.title)}</h3>
            <p>${escapeHtml(description)}</p>
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
    projectCount.textContent = "01";
    projectList.innerHTML = `
      <a class="project-card" href="https://haydenw-uk.github.io/Money-Mission/" target="_blank" rel="noreferrer">
        <span class="project-index">01</span>
        <span class="project-content">
          <h3>Money Mission</h3>
          <p>Open the mini project on GitHub Pages.</p>
        </span>
        <span class="project-meta"><span>GitHub Pages</span><span class="project-arrow" aria-hidden="true">↗</span></span>
      </a>`;
    console.warn("Could not load the generated project index.", error);
  }
}

loadProjects();
