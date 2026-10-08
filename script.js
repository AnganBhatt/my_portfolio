/* =====================================================
   script.js  –  all the interaction for both pages
   Sections:
     1. CONFIG (backend settings)
     2. Helpers
     3. Mobile menu
     4. Hero name animation
     5. Card spotlight effect
     6. Projects (load, render, filter, search)
     7. Contact form
     8. Footer year
   ===================================================== */

/* ---------- 1. CONFIG ----------
   Leave API_BASE empty while you have no backend.
   When your backend is ready, put its address here,
   for example:  "https://api.yoursite.com"            */
const CONFIG = {
  API_BASE: "",
  PROJECTS_ENDPOINT: "/api/projects",   // GET  -> list of projects
  CONTACT_ENDPOINT: "/api/contact"      // POST -> { name, email, message }
};

/* ---------- 2. HELPERS ---------- */

// Makes text safe before putting it into HTML (stops broken layout / XSS
// when the text comes from a backend or database).
function esc(text) {
  const div = document.createElement("div");
  div.textContent = text == null ? "" : String(text);
  return div.innerHTML.replace(/"/g, "&quot;");
}

// Short way to find one element.
const $ = (selector) => document.querySelector(selector);

/* ---------- 3. MOBILE MENU ---------- */
const burger = $("#burger");
const nav = $("#nav");

if (burger && nav) {
  // Open / close the menu when the button is clicked.
  burger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", isOpen);
  });

  // Close the menu after clicking a link or pressing Escape.
  const closeMenu = () => {
    nav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  };
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
}

/* ---------- 4. HERO NAME ANIMATION ----------
   Splits the name into letters so each letter can jump on hover.
   Words are kept together so a word never breaks in the middle. */
const nameEl = $("#name");
if (nameEl) {
  const fullName = nameEl.textContent.trim();
  nameEl.setAttribute("aria-label", fullName);
  nameEl.innerHTML = fullName
    .split(" ")
    .map((word) => '<span class="word" aria-hidden="true">' +
      word.split("").map((ch) => "<span>" + esc(ch) + "</span>").join("") + "</span>")
    .join(" ");
}

/* ---------- 5. CARD SPOTLIGHT ----------
   The soft light that follows the mouse inside a card.
   Works for cards added later too (event delegation). */
document.addEventListener("pointermove", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  const box = card.getBoundingClientRect();
  card.style.setProperty("--x", e.clientX - box.left + "px");
  card.style.setProperty("--y", e.clientY - box.top + "px");
});

/* ---------- 6. PROJECTS ---------- */

// Get projects: from your backend if API_BASE is set, otherwise from projects.js
async function loadProjects() {
  if (!CONFIG.API_BASE) return PROJECTS;
  try {
    const res = await fetch(CONFIG.API_BASE + CONFIG.PROJECTS_ENDPOINT);
    if (!res.ok) throw new Error("Server error " + res.status);
    return await res.json();
  } catch (err) {
    console.warn("Could not load projects from the server, using projects.js", err);
    return PROJECTS; // backup so the page is never empty
  }
}

// Builds the HTML for ONE project card. The whole card is a link.
function projectCard(p) {
  const hasImage = Boolean(p.image);
  const image = hasImage
    ? '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + ' preview" loading="lazy">'
    : "";
  const tags = (p.tags || []).map((t) => "<span>" + esc(t) + "</span>").join("");
  return (
    '<a class="card work" href="' + esc(p.url || "#") + '" target="_blank" rel="noopener noreferrer">' +
      '<div class="th p' + esc(p.pattern || 1) + (hasImage ? " has-img" : "") + '">' + image +
        "<b>" + esc(p.category) + "</b></div>" +
      '<div class="bd"><div><h3>' + esc(p.title) + "</h3>" +
        "<p>" + esc(p.description) + "</p>" +
        '<div class="tags">' + tags + "</div></div>" +
      '<span class="arr" aria-hidden="true">↗</span></div>' +
    "</a>"
  );
}

// Draws a list of projects inside a container.
function renderProjects(list, container) {
  container.innerHTML = list.length
    ? list.map(projectCard).join("")
    : '<p class="empty">No projects found.</p>';
}

/* -- Home page: "Selected works" (only projects with featured: true) -- */
const featuredBox = $("#featuredWorks");
if (featuredBox) {
  loadProjects().then((all) => {
    renderProjects(all.filter((p) => p.featured).slice(0, 6), featuredBox);
  });
}

/* -- Works page: all projects + filter buttons + search -- */
const allBox = $("#allWorks");
if (allBox) {
  const filterBox = $("#filters");
  const searchBox = $("#search");
  const countEl = $("#count");
  let projects = [];
  let activeCategory = "All";

  // Shows the projects that match the active filter and the search text.
  function update() {
    const text = searchBox.value.trim().toLowerCase();
    const shown = projects.filter((p) => {
      const matchCategory = activeCategory === "All" || p.category === activeCategory;
      const searchable = [p.title, p.description, p.category, (p.tags || []).join(" ")]
        .join(" ").toLowerCase();
      return matchCategory && searchable.includes(text);
    });
    renderProjects(shown, allBox);
    countEl.textContent = shown.length + (shown.length === 1 ? " project" : " projects");
  }

  loadProjects().then((all) => {
    projects = all;
    // Make one button per category, plus "All".
    const categories = ["All", ...new Set(all.map((p) => p.category))];
    filterBox.innerHTML = categories
      .map((c, i) => '<button type="button" data-cat="' + esc(c) + '"' +
        (i === 0 ? ' class="active"' : "") + ">" + esc(c) + "</button>")
      .join("");
    update();
  });

  filterBox.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    activeCategory = btn.dataset.cat;
    filterBox.querySelectorAll("button").forEach((b) => b.classList.toggle("active", b === btn));
    update();
  });
  searchBox.addEventListener("input", update);
}

/* ---------- 7. CONTACT FORM ---------- */
const form = $("#contactForm");
if (form) {
  const status = $("#formStatus");
  const button = form.querySelector("button[type=submit]");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();                       // stop the page from reloading

    // Reads the value of one form field by its name attribute.
    const field = (fieldName) => form.elements[fieldName].value.trim();

    // Hidden "website" field: real people leave it empty, spam bots fill it.
    if (field("website")) return;

    // Data that will be sent to your backend.
    const data = {
      name: field("name"),
      email: field("email"),
      message: field("message")
    };

    button.disabled = true;
    status.textContent = "Sending...";

    try {
      if (CONFIG.API_BASE) {
        // Real mode: send to your backend.
        const res = await fetch(CONFIG.API_BASE + CONFIG.CONTACT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Server error " + res.status);
      } else {
        // Demo mode (no backend yet): nothing is sent anywhere.
        console.log("Contact form data (demo mode):", data);
        await new Promise((r) => setTimeout(r, 600));
      }
      status.textContent = CONFIG.API_BASE
        ? "✓ Message sent. Thank you!"
        : "✓ Form works. Connect a backend to really send messages.";
      form.reset();
    } catch (err) {
      status.textContent = "✕ Could not send. Please try again.";
      console.error(err);
    } finally {
      button.disabled = false;
    }
  });
}

/* ---------- 8. FOOTER YEAR ---------- */
const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
