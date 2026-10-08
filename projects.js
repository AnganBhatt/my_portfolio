/* =====================================================
   projects.js  –  ALL YOUR PROJECTS LIVE HERE
   -----------------------------------------------------
   To add a project: copy one block, paste it below, edit it.
   Fields:
     title       – project name
     category    – used for the filter buttons on works.html
     description – one short sentence
     tags        – technologies used
     url         – link to the live website (opens in a new tab)
     image       – optional screenshot, e.g. "images/furniro.jpg"
                   (leave "" to show a black & white pattern instead)
     pattern     – 1 to 6, which pattern to use when there is no image
     featured    – true = also shown in "Selected works" on the home page

   BACKEND LATER: when your API is ready, set API_BASE in script.js.
   The site will then load projects from your server and use this
   list only as a backup. Your API should return the same shape:
   [ { title, category, description, tags, url, image, pattern, featured } ]
   ===================================================== */

const PROJECTS = [
  {
    title: "Furniro Furniture Store",
    category: "E-commerce",
    description: "A furniture shop website built from a Figma design.",
    tags: ["HTML", "CSS", "Bootstrap"],
    url: "#",          // TODO: replace with your live link
    image: "",
    pattern: 1,
    featured: true
  },
  {
    title: "Nexcent Landing Page",
    category: "Landing Page",
    description: "A clean, responsive business landing page.",
    tags: ["HTML", "CSS", "Bootstrap"],
    url: "#",          // TODO
    image: "",
    pattern: 2,
    featured: true
  },
  {
    title: "Designer Portfolio",
    category: "Portfolio",
    description: "A portfolio website built for a UI/UX designer.",
    tags: ["HTML", "CSS", "Bootstrap"],
    url: "#",          // TODO
    image: "",
    pattern: 3,
    featured: true
  },
  {
    title: "E-commerce Admin Dashboard",
    category: "Web App",
    description: "A front-end admin dashboard that saves data in localStorage.",
    tags: ["HTML", "CSS", "JavaScript"],
    url: "#",          // TODO
    image: "",
    pattern: 4,
    featured: true
  },
  {
    title: "Personal Portfolio",
    category: "Portfolio",
    description: "My first personal portfolio website.",
    tags: ["HTML", "CSS", "Bootstrap"],
    url: "#",          // TODO
    image: "",
    pattern: 5,
    featured: true
  },
  {
    title: "4K Video Site Layout",
    category: "UI Concept",
    description: "A video-sharing site layout concept.",
    tags: ["HTML", "CSS"],
    url: "#",          // TODO
    image: "",
    pattern: 6,
    featured: true
  }
];
