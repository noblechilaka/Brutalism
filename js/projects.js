/**
 * UNFORM - Projects Page
 * Interactive functionality for projects page
 */

document.addEventListener("DOMContentLoaded", () => {
  initCursor();
  initTitleDivider();
  initClock();
  initHorizontalScroll();
  initPerspectiveSlider();
  initDirectoryHover();
  initDynamicArchive();
  initProjectModal();
  initLenis();
  initAnimations();
});

/**
 * Custom Cursor Crosshair
 */
function initCursor() {
  const cursorH = document.querySelector(".crosshair-h");
  const cursorV = document.querySelector(".crosshair-v");

  if (!cursorH || !cursorV) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorH.style.setProperty("--cursor-y", `${mouseY}px`);
    cursorV.style.setProperty("--cursor-x", `${mouseX}px`);
  });

  document.addEventListener("mouseleave", () => {
    cursorH.style.opacity = "0";
    cursorV.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    cursorH.style.opacity = "0.4";
    cursorV.style.opacity = "0.4";
  });
}

/**
 * Title Divider - Mouse interaction shifts position
 */
function initTitleDivider() {
  const divider = document.getElementById("titleDivider");
  if (!divider) return;

  const titleBlock = document.querySelector(".title-block");
  if (!titleBlock) return;

  titleBlock.addEventListener("mousemove", (e) => {
    const rect = titleBlock.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;

    // Shift between 20% and 30%
    const newPos = 20 + x * 10;
    divider.style.left = `${newPos}%`;
  });

  titleBlock.addEventListener("mouseleave", () => {
    divider.style.left = "25%";
  });
}

/**
 * Real-time Studio Clock
 */
function initClock() {
  const clockEl = document.getElementById("studioClock");
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    clockEl.textContent = `${hours}:${minutes}:${seconds}`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/**
 * Horizontal Blueprint Scroll with Parallax Friction
 */
function initHorizontalScroll() {
  const section = document.querySelector(".horizontal-blueprint");
  const container = document.getElementById("blueprintContainer");

  if (!section || !container) return;

  // Lock scroll and enable horizontal movement
  let isHorizontalSection = false;
  let currentScroll = 0;
  let targetScroll = 0;

  const projects = document.querySelectorAll(".blueprint-project");

  // Parallax friction factors
  const foregroundSpeed = 1;
  const midgroundSpeed = 0.7;
  const backgroundSpeed = 0.4;

  function updateParallax() {
    projects.forEach((project, index) => {
      const foreground = project.querySelector(".depth-foreground");
      const midground = project.querySelector(".depth-midground");
      const background = project.querySelector(".depth-background");

      if (foreground) {
        foreground.style.transform = `translateX(${
          -currentScroll * foregroundSpeed * (index + 1) * 0.1
        }px)`;
      }
      if (midground) {
        midground.style.transform = `translateX(${
          -currentScroll * midgroundSpeed * (index + 1) * 0.1
        }px)`;
      }
      if (background) {
        background.style.transform = `translateX(${
          -currentScroll * backgroundSpeed * (index + 1) * 0.1
        }px)`;
      }
    });
  }

  // Use scroll to drive horizontal movement
  window.addEventListener("scroll", () => {
    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;

    // When section is in view
    if (rect.top <= 0 && rect.bottom >= windowHeight) {
      isHorizontalSection = true;
      targetScroll = Math.abs(rect.top);
    } else {
      isHorizontalSection = false;
    }

    // Smooth scroll interpolation
    currentScroll += (targetScroll - currentScroll) * 0.1;
    updateParallax();
  });

  // Also handle wheel for horizontal scroll
  section.addEventListener(
    "wheel",
    (e) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        e.preventDefault();
        targetScroll += e.deltaY;
        targetScroll = Math.max(0, targetScroll);
      }
    },
    { passive: false }
  );
}

/**
 * Perspective Slider - View switching
 */
function initPerspectiveSlider() {
  const viewBtns = document.querySelectorAll(".view-btn");
  const views = document.querySelectorAll(".slider-view");

  if (!viewBtns.length || !views.length) return;

  viewBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const view = btn.dataset.view;

      // Update buttons
      viewBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Update views with wipe transition
      views.forEach((v) => {
        if (v.dataset.view === view) {
          v.classList.add("active");
        } else {
          v.classList.remove("active");
        }
      });
    });
  });
}

/**
 * Directory Table - Preview Thumbnail
 */
function initDirectoryHover() {
  const tableRows = document.querySelectorAll(".table-row");
  const preview = document.getElementById("previewThumbnail");

  if (!tableRows.length || !preview) return;

  // Project images for preview
  const projectImages = {
    "01": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
    "02": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80",
    "03": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
    "04": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80",
    "05": "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400&q=80",
    "06": "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80",
  };

  const previewImg = preview.querySelector("img");

  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", (e) => {
      const projectId = row.dataset.project;
      const imgSrc = projectImages[projectId];

      if (imgSrc && previewImg) {
        previewImg.src = imgSrc;
        preview.classList.add("active");
      }
    });

    row.addEventListener("mousemove", (e) => {
      // Position preview near cursor but not under it
      const x = e.clientX + 30;
      const y = e.clientY - 75;

      preview.style.left = `${x}px`;
      preview.style.top = `${y}px`;
    });

    row.addEventListener("mouseleave", () => {
      preview.classList.remove("active");
    });
  });
}

/**
 * Initialize Lenis Smooth Scroll
 */
function initLenis() {
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  window.lenis = lenis;

  // Synchronize with GSAP ScrollTrigger
  if (typeof ScrollTrigger !== "undefined") {
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  document.documentElement.classList.add("lenis");

  return lenis;
}

/**
 * GSAP Animations - Title uses same entrance animation as index.html headline
 */
function initAnimations() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
    return;

  gsap.registerPlugin(ScrollTrigger);

  // Title Block animations
  const titleBlock = document.querySelector(".title-block");
  if (titleBlock) {
    gsap.from(".project-counter, .realtime-clock", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
      delay: 0.3,
    });

    // Headline entrance animation - scale from bottom (original)
    gsap.from(".title-headline", {
      scaleY: 0,
      transformOrigin: "bottom",
      duration: 1.2,
      ease: "power4.out",
      delay: 0.5,
    });
  }

  // Blueprint projects stagger
  const blueprintSection = document.querySelector(".horizontal-blueprint");
  if (blueprintSection) {
    gsap.from(".blueprint-project", {
      x: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: blueprintSection,
        start: "top 70%",
      },
    });
  }

  // Technical grid items
  const gridItems = document.querySelectorAll(".masonry-item");
  if (gridItems.length) {
    gsap.from(gridItems, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".technical-grid",
        start: "top 60%",
      },
    });
  }

  // Slider title
  const slider = document.querySelector(".perspective-slider");
  if (slider) {
    gsap.from(".slider-title", {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: slider,
        start: "top 70%",
      },
    });
  }

  // Directory table rows
  const tableRows = document.querySelectorAll(".table-row");
  if (tableRows.length) {
    gsap.from(tableRows, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".directory-table",
        start: "top 70%",
      },
    });
  }
}

// Export for debugging
window.projectsJS = {
  initCursor,
  initTitleDivider,
  initClock,
  initHorizontalScroll,
  initPerspectiveSlider,
  initDirectoryHover,
  initDynamicArchive,
};

/**
 * Dynamic Archive - Load projects from JSON
 * Creates the modular grid with "broken" architectural layout
 */
function initDynamicArchive() {
  const archiveGrid = document.getElementById("archiveGrid");
  const archiveCount = document.getElementById("archiveCount");

  if (!archiveGrid) return;

  // Fetch projects from JSON
  fetch("assets/projects.json")
    .then((response) => response.json())
    .then((projects) => {
      // Get category filter from URL parameter
      const urlParams = new URLSearchParams(window.location.search);
      const categoryFilter = urlParams.get("category");

      // Map URL category values to JSON category values
      const categoryMap = {
        residential: "Residential",
        commercial: "Commercial",
        cultural: "Cultural",
        "mixed-use": "Mixed-Use",
      };

      let filteredProjects = projects;
      let activeCategory = null;

      // Apply filter if category parameter exists
      if (categoryFilter && categoryMap[categoryFilter]) {
        activeCategory = categoryMap[categoryFilter];
        filteredProjects = projects.filter(
          (project) =>
            project.category.toLowerCase() === activeCategory.toLowerCase()
        );

        // Update archive counter to show filtered count
        if (archiveCount) {
          const count = String(filteredProjects.length).padStart(3, "0");
          archiveCount.textContent = count;
        }

        // Also update title block counter
        const titleCount = document.getElementById("projectCount");
        if (titleCount) {
          titleCount.textContent = String(filteredProjects.length).padStart(
            3,
            "0"
          );
        }

        // Show active filter indicator
        showActiveFilter(activeCategory);
      } else {
        // No filter - show all projects
        if (archiveCount) {
          const count = String(projects.length).padStart(3, "0");
          archiveCount.textContent = count;
        }

        // Also update title block counter
        const titleCount = document.getElementById("projectCount");
        if (titleCount) {
          titleCount.textContent = String(projects.length).padStart(3, "0");
        }
      }

      // Clear existing content
      archiveGrid.innerHTML = "";

      // Create project cards with staggered animation
      filteredProjects.forEach((project, index) => {
        const card = createProjectCard(project, index);
        archiveGrid.appendChild(card);

        // Staggered load animation - 0.1s delay between each
        setTimeout(() => {
          card.classList.add("loaded");
        }, index * 100);
      });

      // Initialize hover interactions after cards are added
      initArchiveCardHover();
    })
    .catch((error) => {
      console.error("Error loading projects:", error);
    });
}

/**
 * Show active filter indicator in the archive header
 */
function showActiveFilter(category) {
  const archiveHeader = document.querySelector(".archive-header");
  if (!archiveHeader) return;

  // Remove existing filter indicator if any
  const existingIndicator = archiveHeader.querySelector(".active-filter");
  if (existingIndicator) {
    existingIndicator.remove();
  }

  // Create filter indicator
  const filterIndicator = document.createElement("div");
  filterIndicator.className = "active-filter";
  filterIndicator.innerHTML = `
    <span class="filter-label">FILTER:</span>
    <span class="filter-value">${category.toUpperCase()}</span>
    <button class="filter-clear" onclick="clearFilter()">[CLEAR]</button>
  `;

  archiveHeader.appendChild(filterIndicator);
}

/**
 * Clear filter and reload all projects
 */
function clearFilter() {
  // Remove query parameter and reload
  const url = new URL(window.location);
  url.searchParams.delete("category");
  window.location.href = url.toString();
}

/**
 * Create a project card element
 */
function createProjectCard(project, index) {
  const card = document.createElement("article");
  card.className = "archive-card";
  // Add even class for "broken" grid effect
  if ((index + 1) % 2 === 0) {
    card.classList.add("even");
  }

  card.innerHTML = `
    <div class="archive-image">
      <img src="${project.heroImage}" alt="${project.title}" />
      <div class="archive-tags">
        ${project.tags
          .map((tag) => `<span class="archive-tag">${tag}</span>`)
          .join("")}
      </div>
      <div class="autex-pill">#${project.id}</div>
    </div>
    <div class="archive-overlay">
      <div class="archive-content">
        <h3 class="archive-title">${project.title}</h3>
        <div class="archive-meta">
          <span class="meta-category">${project.category}</span>
          <span class="meta-year">${project.year}</span>
          <span class="meta-location">${project.location}</span>
        </div>
      </div>
    </div>
  `;

  return card;
}

/**
 * Initialize hover interactions for archive cards
 */
function initArchiveCardHover() {
  const cards = document.querySelectorAll(".archive-card");

  cards.forEach((card) => {
    const image = card.querySelector(".archive-image");
    const tags = card.querySelector(".archive-tags");

    if (image && tags) {
      image.addEventListener("mouseenter", () => {
        tags.classList.add("visible");
      });

      image.addEventListener("mouseleave", () => {
        tags.classList.remove("visible");
      });
    }
  });
}

/**
 * Project Modal - Show project details when clicking on a project
 */
function initProjectModal() {
  const modal = document.getElementById("projectModal");
  const closeBtn = document.getElementById("modalClose");

  if (!modal || !closeBtn) return;

  // Modal elements
  const modalImage = document.getElementById("modalImage");
  const modalId = document.getElementById("modalId");
  const modalTitle = document.getElementById("modalTitle");
  const modalCategory = document.getElementById("modalCategory");
  const modalYear = document.getElementById("modalYear");
  const modalLocation = document.getElementById("modalLocation");
  const modalTags = document.getElementById("modalTags");

  // Fetch projects for modal data
  let projectsData = [];
  fetch("assets/projects.json")
    .then((response) => response.json())
    .then((projects) => {
      projectsData = projects;
    })
    .catch((error) => {
      console.error("Error loading projects for modal:", error);
    });

  // Add click handlers to archive cards
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".archive-card");
    if (card) {
      const index = Array.from(card.parentElement.children).indexOf(card);
      if (projectsData[index]) {
        openModal(projectsData[index]);
      }
    }
  });

  // Close modal on close button click
  closeBtn.addEventListener("click", closeModal);

  // Close modal on outside click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  function openModal(project) {
    // Populate modal with project data
    if (modalImage) modalImage.src = project.heroImage;
    if (modalId) modalId.textContent = `#${project.id}`;
    if (modalTitle) modalTitle.textContent = project.title;
    if (modalCategory) modalCategory.textContent = project.category;
    if (modalYear) modalYear.textContent = project.year;
    if (modalLocation) modalLocation.textContent = project.location;

    // Populate tags
    if (modalTags && project.tags) {
      modalTags.innerHTML = project.tags
        .map((tag) => `<span class="modal-tag">${tag}</span>`)
        .join("");
    }

    // Show modal
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}
