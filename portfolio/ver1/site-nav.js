const stickyHeader = document.querySelector(".site-header");
if (stickyHeader) {
  const updateStickyPortrait = () => {
    stickyHeader.classList.toggle("has-scrolled", window.scrollY > 180);
  };
  window.addEventListener("scroll", updateStickyPortrait, { passive: true });
  updateStickyPortrait();
}
const sitePages = [
  { file: "index.html", name: "About me", sections: [["Introduction", "about"], ["A little about me", "story"], ["My project", "project"], ["Play. Build. Repeat.", "activities"], ["Academic career", "career"], ["CV", "cv"]] },
  { file: "contact.html", name: "Contact me", sections: [["Contact details", "contact-details"]] },
  { file: "football.html", name: "Football", sections: [["Match day", "football-photo"], ["Free-kick game", "free-kick"]] },
  { file: "basketball.html", name: "Basketball", sections: [["Free-throw game", "free-throws"]] },
  { file: "writing.html", name: "Writing & code", sections: [["Notebook", "notebook"]] },
  { file: "car.html", name: "The workshop", sections: [["Workshop", "workshop"], ["Project gallery", "gallery"], ["Mechanical challenge", "mechanical-game-link"]] },
  { file: "mechanical-game.html", name: "Mechanical challenge", sections: [["Diagnosis game", "diagnosis"]] }
];

const currentFile = window.location.pathname.split("/").pop() || "index.html";
const siteMap = document.createElement("div");
siteMap.className = "site-map";
siteMap.innerHTML = '<button class="site-map-toggle" type="button" aria-label="Open website sections" aria-expanded="false" aria-controls="site-map-panel"><span aria-hidden="true">⌃</span></button><nav class="site-map-panel" id="site-map-panel" aria-label="Website sections"><p class="site-map-title">Explore the site</p><div class="site-map-pages"></div></nav>';
document.body.append(siteMap);

const pageList = siteMap.querySelector(".site-map-pages");
sitePages.forEach(page => {
  const details = document.createElement("details");
  details.className = "site-map-page";
  if (page.file === currentFile) details.open = true;

  const summary = document.createElement("summary");
  summary.textContent = page.name;
  details.append(summary);

  const pageLink = document.createElement("a");
  pageLink.className = "site-map-page-link";
  pageLink.href = "./" + page.file;
  pageLink.textContent = "Open page";
  details.append(pageLink);

  const sectionList = document.createElement("ul");
  page.sections.forEach(section => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = "./" + page.file + "#" + section[1];
    link.textContent = section[0];
    item.append(link);
    sectionList.append(item);
  });
  details.append(sectionList);
  pageList.append(details);
});

const siteMapButton = siteMap.querySelector(".site-map-toggle");
let siteMapPinnedOpen = false;
const setSiteMapOpen = open => {
  siteMap.classList.toggle("open", open);
  siteMapButton.setAttribute("aria-expanded", String(open));
};
siteMap.addEventListener("mouseenter", () => setSiteMapOpen(true));
siteMap.addEventListener("mouseleave", () => {
  if (!siteMapPinnedOpen) setSiteMapOpen(false);
});
siteMap.addEventListener("focusin", () => setSiteMapOpen(true));
siteMap.addEventListener("focusout", event => {
  if (!siteMap.contains(event.relatedTarget) && !siteMapPinnedOpen) setSiteMapOpen(false);
});
siteMapButton.addEventListener("click", () => {
  siteMapPinnedOpen = !siteMapPinnedOpen;
  setSiteMapOpen(siteMapPinnedOpen);
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    siteMapPinnedOpen = false;
    setSiteMapOpen(false);
    siteMapButton.focus();
  }
});

