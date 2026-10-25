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
    title: "Wanderline Travels",
    category: "E-commerce",
    description: "Travel Agency Website – Concept Project",
    tags: ["HTML", "CSS", "Bootstrap" ,"java script"],
    url: "https://anganbhatt.github.io/travel_agency/",          // TODO: replace with your live link
    image: "image/travelagency.png",
    pattern: 1,
    featured: true
  },
  {
    title: "Ember & Spice",
    category: "E-commerce",
    description: "Restaurant Website with Online Ordering – Concept Project",
    tags: ["HTML", "CSS", "Bootstrap","java script"],
    url: "https://anganbhatt.github.io/Resturant_website/",          // TODO
    image: "image/resturant.png",
    pattern: 2,
    featured: true
  },
  {
    title: "ecobazar",
    category: "E-commerce",
    description: "demo e-stor project",
    tags: ["HTML", "CSS", "Bootstrap"],
    url: "https://anganbhatt.github.io/Ecobazar_website/",          // TODO
    image: "image/ecommerce-1.png",
    pattern: 3,
    featured: true
  },
  {
    title: "Urbano",
    category: "",
    description: "Modern E-commerce Store – Concept Project",
    tags: ["HTML", "CSS", "JavaScript" , "bootstrap"],
    url: "https://anganbhatt.github.io/deom_ecommerce/",          // TODO
    image: "image/ecommerce-2.png",
    pattern: 4,
    featured: true
  },
  
];
