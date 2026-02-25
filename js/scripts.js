/**
 * UNFORM - Architectural Studio
 * Interactive Functionality
 */

document.addEventListener("DOMContentLoaded", () => {
  initCursor();
  // initNavigation();
  initStructuralIndex();
  initAccordion();
  initMaterialitySlider();
  initJournalEntries();
  initBackToTop();
  initParallax();
  initPageLoad();
  initFeaturedPair();
  initAxisToggle();
});

/**
 * Custom Cursor Crosshair - Smooth Movement with Lerp
 */
function initCursor() {
  const cursorH = document.querySelector(".crosshair-h");
  const cursorV = document.querySelector(".crosshair-v");

  if (!cursorH || !cursorV) return;

  // Target positions
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;

  // Current positions (for smooth lerp)
  let currentX = targetX;
  let currentY = targetY;

  // Lerp factor (lower = smoother/slower)
  const lerpFactor = 0.15;

  // Animation frame
  let animationId = null;

  // Update cursor position with smooth lerp
  function updateCursor() {
    // Linear interpolation
    currentX += (targetX - currentX) * lerpFactor;
    currentY += (targetY - currentY) * lerpFactor;

    cursorH.style.setProperty("--cursor-y", `${currentY}px`);
    cursorV.style.setProperty("--cursor-x", `${currentX}px`);

    animationId = requestAnimationFrame(updateCursor);
  }

  // Start the animation loop
  updateCursor();

  document.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  // Hide cursor on mouse leave
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
 * Navigation & Chapter Marker
 */
function initNavigation() {
  const navLinks = document.querySelectorAll(".nav-item");
  const chapterNum = document.getElementById("chapter-num");
  const chapterLabel = document.querySelector(".chapter-label");

  const chapters = [
    { id: "hero", num: "01", label: "HERO" },
    { id: "index", num: "02", label: "INDEX" },
    { id: "works", num: "03", label: "WORKS" },
    { id: "services", num: "04", label: "SERVICES" },
    { id: "materials", num: "05", label: "MATERIALS" },
    { id: "journal", num: "06", label: "JOURNAL" },
  ];

  // Update chapter on scroll
  const observerOptions = {
    root: null,
    rootMargin: "-50% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const chapter = chapters.find((c) => c.id === id);

        if (chapter && chapterNum) {
          chapterNum.textContent = chapter.num;
        }
        if (chapter && chapterLabel) {
          const text = chapterLabel.textContent;
          chapterLabel.textContent = `CH. ${chapter.num} — ${chapter.label}`;
        }
      }
    });
  }, observerOptions);

  chapters.forEach((chapter) => {
    const section = document.getElementById(chapter.id);
    if (section) observer.observe(section);
  });

  // Smooth scroll for nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      const target = document.querySelector(href);

      if (target && window.lenis) {
        window.lenis.scrollTo(target, { offset: -60 });
      } else if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

/**
 * Structural Index - Film Strip & Plus Toggle
 */
function initStructuralIndex() {
  const columns = document.querySelectorAll(".structural-col");

  columns.forEach((col) => {
    const trigger = col.querySelector(".structural-trigger");
    const plus = col.querySelector(".structural-plus");

    if (!trigger || !plus) return;

    trigger.addEventListener("click", () => {
      const isActive = col.classList.contains("active");

      // Close all other columns
      columns.forEach((c) => {
        c.classList.remove("active");
        c.style.backgroundColor = "";
      });

      // Toggle current
      if (!isActive) {
        col.classList.add("active");
      }
    });

    // Hover for film strip preview
    trigger.addEventListener("mouseenter", () => {
      if (!col.classList.contains("active")) {
        // Quick preview
      }
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".structural-col")) {
      columns.forEach((c) => c.classList.remove("active"));
    }
  });
}

/**
 * Technical Accordion
 */
function initAccordion() {
  const items = document.querySelectorAll(".accordion-item");

  items.forEach((item) => {
    const bar = item.querySelector(".accordion-bar");

    if (!bar) return;

    bar.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all
      items.forEach((i) => {
        i.classList.remove("active");
        i.style.backgroundColor = "";
      });

      // Open clicked
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

/**
 * Materiality Slider - Full-width Scrub Gallery
 */
function initMaterialitySlider() {
  const container = document.querySelector(".materiality-scrub-container");
  const items = document.querySelectorAll(".scrub-item");

  if (!container || !items.length) return;

  // Function to determine which item is in center
  function updateActiveItem() {
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    items.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.left + itemRect.width / 2;
      const distance = Math.abs(containerCenter - itemCenter);

      // If item is within 150px of center, it's active
      if (distance < 150) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  // Initial check
  updateActiveItem();

  // Update on scroll
  container.addEventListener("scroll", () => {
    requestAnimationFrame(updateActiveItem);
  });

  // Also update on mouse move for drag interaction
  container.addEventListener("mousemove", () => {
    requestAnimationFrame(updateActiveItem);
  });
}

/**
 * Journal Entries - Quote Hover
 */
function initJournalEntries() {
  const entries = document.querySelectorAll(".journal-entry");
  const quote = document.querySelector(".quote-text");
  const cite = document.querySelector(".quote-cite");

  const quotes = [
    {
      text: '"Architecture is the learned game, correct and magnificent, of forms assembled in light."',
      cite: "— Le Corbusier",
    },
    {
      text: "\"The dialogue between client and architect is about as intimate as any conversation you can have, because when you're talking about building a house, you're talking about dreams.\"",
      cite: "— Marta Ust",
    },
    {
      text: '"Every building is a prototype. No two buildings will have the same performance, although they may have the same brief."',
      cite: "— Renzo Piano",
    },
    {
      text: '"Form follows performance, not function."',
      cite: "— Peter Eisenman",
    },
  ];

  entries.forEach((entry, index) => {
    entry.addEventListener("mouseenter", () => {
      if (quote && quotes[index]) {
        quote.style.opacity = "0";
        cite.style.opacity = "0";

        setTimeout(() => {
          quote.textContent = quotes[index].text;
          cite.textContent = quotes[index].cite;
          quote.style.opacity = "1";
          cite.style.opacity = "1";
        }, 400);
      }
    });
  });
}

/**
 * Back to Top
 */
function initBackToTop() {
  const btn = document.getElementById("backToTop");

  if (!btn) return;

  btn.addEventListener("click", () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}

/**
 * Parallax Effects
 */
function initParallax() {
  // Hero video parallax
  const heroVideo = document.querySelector(".hero-video");

  if (heroVideo) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.15;

      if (scrolled < window.innerHeight) {
        heroVideo.style.transform = `translateY(${rate}px)`;
      }
    });
  }

  // Mouse parallax on hero video
  const heroPlate = document.querySelector(".hero-plate");

  if (heroPlate) {
    heroPlate.addEventListener("mousemove", (e) => {
      const video = heroPlate.querySelector(".hero-video");
      if (!video) return;

      const rect = heroPlate.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      video.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
    });
  }
}

/**
 * Page Load Animation
 */
function initPageLoad() {
  // Add loaded class for staggered reveal
  window.addEventListener("load", () => {
    const hero = document.querySelector(".hero-plate");
    if (hero) {
      hero.classList.add("loaded");
    }

    // Trigger initial chapter
    const chapterNum = document.getElementById("chapter-num");
    if (chapterNum) {
      chapterNum.textContent = "01";
    }
  });
}

/**
 * Expose Lenis for external use
 */
window.lenis = null;

/**
 * Featured Pair - Dynamic Data from JSON
 * Shows the 2 latest projects on the home page
 */
function initFeaturedPair() {
  // Only run if featured pair section exists
  const featuredSection = document.querySelector(".featured-pair");
  if (!featuredSection) return;

  // Fetch projects from JSON
  fetch("assets/projects.json")
    .then((response) => response.json())
    .then((projects) => {
      // Get first 2 projects (latest)
      const latestProjects = projects.slice(0, 2);

      // Update project count in View More button
      const countEl = document.getElementById("projectCount");
      if (countEl) {
        // Convert count to superscript format (e.g., 12 -> ⁽¹²⁾)
        const count = projects.length;
        countEl.textContent = `⁽${count}⁾`;
      }

      // Populate Featured Project 1 (Latest - Left, Full-bleed)
      const featured1 = document.getElementById("featured1");
      if (featured1 && latestProjects[0]) {
        const p1 = latestProjects[0];
        const img1 = featured1.querySelector(".featured-img");
        const title1 = featured1.querySelector(".featured-title");
        const id1 = featured1.querySelector(".featured-id");
        const cat1 = featured1.querySelector(".meta-category");
        const year1 = featured1.querySelector(".meta-year");
        const loc1 = featured1.querySelector(".meta-location");
        const tags1 = featured1.querySelector(".featured-tags");

        if (img1) img1.src = p1.heroImage;
        if (title1) title1.textContent = p1.title;
        if (id1) id1.textContent = `#${p1.id}`;
        if (cat1) cat1.textContent = p1.category;
        if (year1) year1.textContent = p1.year;
        if (loc1) loc1.textContent = p1.location;

        // Populate tags
        if (tags1 && p1.tags) {
          tags1.innerHTML = p1.tags
            .map((tag) => `<span class="featured-tag">${tag}</span>`)
            .join("");
        }
      }

      // Populate Featured Project 2 (Second Latest - Right, Floating)
      const featured2 = document.getElementById("featured2");
      if (featured2 && latestProjects[1]) {
        const p2 = latestProjects[1];
        const img2 = featured2.querySelector(".featured-img");
        const title2 = featured2.querySelector(".featured-title");
        const id2 = featured2.querySelector(".featured-id");
        const cat2 = featured2.querySelector(".meta-category");
        const year2 = featured2.querySelector(".meta-year");
        const loc2 = featured2.querySelector(".meta-location");
        const tags2 = featured2.querySelector(".featured-tags");

        if (img2) img2.src = p2.heroImage;
        if (title2) title2.textContent = p2.title;
        if (id2) id2.textContent = `#${p2.id}`;
        if (cat2) cat2.textContent = p2.category;
        if (year2) year2.textContent = p2.year;
        if (loc2) loc2.textContent = p2.location;

        // Populate tags
        if (tags2 && p2.tags) {
          tags2.innerHTML = p2.tags
            .map((tag) => `<span class="featured-tag">${tag}</span>`)
            .join("");
        }
      }

      // Add staggered animation to featured projects
      if (featured1) {
        featured1.style.opacity = "0";
        featured1.style.transform = "translateY(40px)";
        featured1.style.transition = "opacity 0.8s ease, transform 0.8s ease";

        setTimeout(() => {
          featured1.style.opacity = "1";
          featured1.style.transform = "translateY(0)";
        }, 100);
      }

      if (featured2) {
        featured2.style.opacity = "0";
        featured2.style.transform = "translateY(40px)";
        featured2.style.transition = "opacity 0.8s ease, transform 0.8s ease";

        setTimeout(() => {
          featured2.style.opacity = "1";
          featured2.style.transform = "translateY(0)";
        }, 200);
      }
    })
    .catch((error) => {
      console.error("Error loading projects:", error);
    });
}
