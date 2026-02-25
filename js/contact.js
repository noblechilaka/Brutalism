/**
 * UNFORM - Contact Page
 * Interactive Functionality
 */

document.addEventListener("DOMContentLoaded", () => {
  initClocks();
  initFormProgress();
  initPillTags();
  initMagneticButton();
  initCopyToClipboard();
  initContactForm();
  initLenis();
});

/**
 * Initialize Lenis Smooth Scroll
 */
function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Expose for GSAP
  window.lenis = lenis;

  // Integrate with GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

/**
 * World Clocks - Live Time for Each City
 */
function initClocks() {
  const cities = {
    london: { timezone: "Europe/London", element: "clock-london" },
    newyork: { timezone: "America/New_York", element: "clock-newyork" },
    oslo: { timezone: "Europe/Oslo", element: "clock-oslo" },
  };

  function updateClocks() {
    Object.keys(cities).forEach((city) => {
      const cityData = cities[city];
      const element = document.getElementById(cityData.element);

      if (element) {
        const time = new Date().toLocaleTimeString("en-US", {
          timeZone: cityData.timezone,
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        element.textContent = time;
      }
    });
  }

  // Update immediately and every second
  updateClocks();
  setInterval(updateClocks, 1000);
}

/**
 * Form Progress Line - Fills as fields are completed
 */
function initFormProgress() {
  const form = document.getElementById("contactForm");
  const progressFill = document.getElementById("formProgress");

  if (!form || !progressFill) return;

  const fields = form.querySelectorAll(".field-input, .field-select");
  let completedFields = 0;
  const totalFields = fields.length;

  function updateProgress() {
    completedFields = 0;
    fields.forEach((field) => {
      if (field.value && field.value.trim() !== "") {
        completedFields++;
      }
    });

    // Also count project type selection
    const projectType = document.getElementById("projectType");
    if (projectType && projectType.value) {
      completedFields++;
    }

    const percentage = (completedFields / (totalFields + 1)) * 100;
    progressFill.style.height = `${percentage}%`;
  }

  fields.forEach((field) => {
    field.addEventListener("input", updateProgress);
    field.addEventListener("change", updateProgress);
  });

  // Initial check
  updateProgress();
}

/**
 * Pill Tags - Project Type Selection
 */
function initPillTags() {
  const pillTags = document.querySelectorAll(".pill-tag");
  const projectTypeInput = document.getElementById("projectType");

  pillTags.forEach((tag) => {
    tag.addEventListener("click", () => {
      // Remove active from all
      pillTags.forEach((t) => t.classList.remove("active"));

      // Add active to clicked
      tag.classList.add("active");

      // Set hidden input value
      if (projectTypeInput) {
        projectTypeInput.value = tag.getAttribute("data-value");
      }

      // Trigger form progress update
      const progressFill = document.getElementById("formProgress");
      if (progressFill) {
        const form = document.getElementById("contactForm");
        const fields = form.querySelectorAll(".field-input, .field-select");
        let completedFields = 0;

        fields.forEach((field) => {
          if (field.value && field.value.trim() !== "") {
            completedFields++;
          }
        });

        if (projectTypeInput.value) {
          completedFields++;
        }

        const percentage = (completedFields / (fields.length + 1)) * 100;
        progressFill.style.height = `${percentage}%`;
      }
    });
  });
}

/**
 * Magnetic Button Effect
 */
function initMagneticButton() {
  const btn = document.getElementById("scheduleBtn");

  if (!btn) return;

  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Magnetic pull strength
    const strength = 0.3;

    gsap.to(btn, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  });
}

/**
 * Copy to Clipboard
 */
function initCopyToClipboard() {
  const channelLinks = document.querySelectorAll(".channel-link");

  channelLinks.forEach((link) => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();

      const email = link.getAttribute("data-email");

      try {
        await navigator.clipboard.writeText(email);

        // Visual feedback
        const action = link.querySelector(".channel-action");
        if (action) {
          const originalText = action.textContent;
          action.textContent = "COPIED!";

          setTimeout(() => {
            action.textContent = originalText;
          }, 2000);
        }
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    });
  });
}

/**
 * Contact Form - Submit with Animation
 */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const submitBtn = form.querySelector(".submit-btn");
  const successOverlay = document.getElementById("successOverlay");

  if (!form || !submitBtn || !successOverlay) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validate form
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const projectType = document.getElementById("projectType").value;
    const budget = document.getElementById("budget").value;

    if (!name || !email || !projectType || !budget) {
      // Highlight empty fields
      const fields = form.querySelectorAll(".field-input, .field-select");
      fields.forEach((field) => {
        if (!field.value) {
          field.parentElement.querySelector(
            ".field-line"
          ).style.backgroundColor = "#ff0000";
          setTimeout(() => {
            field.parentElement.querySelector(
              ".field-line"
            ).style.backgroundColor = "";
          }, 2000);
        }
      });
      return;
    }

    // Add loading state
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    // Wait for animation
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Show success overlay
    successOverlay.classList.add("active");

    // Reset form after delay
    setTimeout(() => {
      form.reset();
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;

      // Reset pill tags
      document.querySelectorAll(".pill-tag").forEach((tag) => {
        tag.classList.remove("active");
      });

      // Reset progress
      document.getElementById("formProgress").style.height = "0%";
    }, 3000);
  });

  // Close overlay when clicking on empty space
  successOverlay.addEventListener("click", (e) => {
    if (e.target === successOverlay) {
      successOverlay.classList.remove("active");

      // Reset form when closing
      if (form) {
        form.reset();
      }
      if (submitBtn) {
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
      }

      // Reset pill tags
      document.querySelectorAll(".pill-tag").forEach((tag) => {
        tag.classList.remove("active");
      });

      // Reset progress
      const progressFill = document.getElementById("formProgress");
      if (progressFill) {
        progressFill.style.height = "0%";
      }
    }
  });
}

/**
 * GSAP Animations on Load
 */
window.addEventListener("load", () => {
  // Animate monolith header
  gsap.from(".monolith-title", {
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.2,
  });

  gsap.from(".vertical-divider", {
    scaleY: 0,
    transformOrigin: "top",
    duration: 1,
    ease: "power3.inOut",
    delay: 0.5,
  });

  // Animate studio columns
  gsap.from(".studio-col", {
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".studio-grid",
      start: "top 80%",
    },
  });

  // Animate inquiry section
  gsap.from(".inquiry-editorial", {
    x: -60,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".inquiry-grid",
      start: "top 80%",
    },
  });

  gsap.from(".inquiry-form-wrap", {
    x: 60,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".inquiry-grid",
      start: "top 80%",
    },
  });

  // Animate direct channels
  gsap.from(".channel-item", {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".direct-channels",
      start: "top 90%",
    },
  });

  // Animate footer
  gsap.from(".question-text", {
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".new-business-footer",
      start: "top 80%",
    },
  });
});
