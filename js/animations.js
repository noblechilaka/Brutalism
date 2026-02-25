/**
 * UNFORM - Architectural Studio
 * GSAP Animations & Lenis Setup
 */

document.addEventListener("DOMContentLoaded", () => {
  initLenis();
  initScrollAnimations();
  initHeroAnimations();
  initStructuralAnimations();
  initCaseStudyAnimations();
  initAccordionAnimations();
  initSliderAnimations();
  initFooterAnimations();
});

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

  // Expose to global
  window.lenis = lenis;

  // Synchronize with GSAP ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // Add class to html
  document.documentElement.classList.add("lenis");

  return lenis;
}

/**
 * Register ScrollTrigger
 */
gsap.registerPlugin(ScrollTrigger);

/**
 * Hero Section Animations
 */
function initHeroAnimations() {
  const hero = document.querySelector(".hero-plate");
  if (!hero) return;

  // Headline entrance animation - plays on page load
  const headline = document.querySelector(".hero-headline");

  if (headline) {
    // Set initial state
    gsap.set(headline, { y: 60, opacity: 0 });

    // Entrance animation - plays immediately on load
    gsap.to(headline, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power4.out",
      delay: 0.3, // Slight delay for dramatic effect
    });

    // Headline weight scroll effect - letter-spacing tightens on scroll
    gsap.to(headline, {
      letterSpacing: "-0.08em",
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }

  // Hero video parallax + entrance animation
  const videoWrap = document.querySelector(".hero-video");

  if (videoWrap) {
    // Set initial state
    gsap.set(videoWrap, { y: 40, opacity: 0 });
    
    // Entrance animation
    gsap.to(videoWrap, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power4.out",
      delay: 0.5,
    });

    // Parallax scroll effect
    gsap.to(videoWrap, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }

  // Hero superscript entrance animation
  const superscript = document.querySelector(".hero-superscript");

  if (superscript) {
    gsap.set(superscript, { opacity: 0 });
    
    gsap.to(superscript, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.8,
    });
  }
}

/**
 * Structural Index Animations
 */
function initStructuralAnimations() {
  const section = document.querySelector(".structural-index");
  if (!section) return;

  // Stagger reveal for columns
  const columns = document.querySelectorAll(".structural-col");

  gsap.fromTo(
    columns,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.15,
      ease: "power4.out",
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Plus icon rotation on scroll
  columns.forEach((col, i) => {
    const plus = col.querySelector(".structural-plus");
    if (!plus) return;

    gsap.fromTo(
      plus,
      { rotation: 0 },
      {
        rotation: 45,
        scrollTrigger: {
          trigger: col,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

/**
 * Case Study Animations
 */
function initCaseStudyAnimations() {
  const section = document.querySelector(".case-study-section");
  if (!section) return;

  // Hero image reveal
  const heroImage = document.querySelector(".case-hero-image");

  if (heroImage) {
    gsap.fromTo(
      heroImage,
      { scale: 1.1, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  // Data stack slide in
  const dataStack = document.querySelector(".case-data-stack");

  if (dataStack) {
    gsap.fromTo(
      dataStack,
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  // View case button underline animation
  const viewBtn = document.querySelector(".view-case-btn");

  if (viewBtn) {
    gsap.fromTo(
      viewBtn,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: viewBtn,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }
}

/**
 * Accordion Animations
 */
function initAccordionAnimations() {
  const section = document.querySelector(".technical-accordion");
  if (!section) return;

  // Title reveal
  const title = document.querySelector(".accordion-title");

  if (title) {
    gsap.fromTo(
      title,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  // Bars stagger reveal
  const bars = document.querySelectorAll(".accordion-bar");

  gsap.fromTo(
    bars,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Wireframe cube 3D rotation
  const cubes = document.querySelectorAll(".wireframe-cube");

  cubes.forEach((cube) => {
    gsap.to(cube, {
      rotationX: 360,
      rotationY: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
      scrollTrigger: {
        trigger: cube,
        start: "top 80%",
        toggleActions: "play pause pause pause",
      },
    });
  });
}

/**
 * Materiality Slider Animations - Full-width Scrub Gallery
 */
function initSliderAnimations() {
  const section = document.querySelector(".materiality-slider");
  if (!section) return;

  // Title reveal
  const title = document.querySelector(".slider-title");

  if (title) {
    gsap.fromTo(
      title,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  // Scrub items - animate from narrow slits to expanded
  const items = document.querySelectorAll(".scrub-item");

  // Set initial state - all items narrow
  gsap.set(items, { flex: "0 0 100px" });

  // Animate items into view
  gsap.fromTo(
    items,
    { opacity: 0, x: 50 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

/**
 * Footer Animations
 */
function initFooterAnimations() {
  const footer = document.querySelector(".blueprint-footer");
  if (!footer) return;

  // CTA text massive reveal
  const cta = document.querySelector(".cta-text");

  if (cta) {
    gsap.fromTo(
      cta,
      { scaleY: 0, opacity: 0 },
      {
        scaleY: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  // GPS coordinates reveal
  const gps = document.querySelector(".footer-gps");

  if (gps) {
    gsap.fromTo(
      gps,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 50%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  // Social links stagger
  const socialLinks = document.querySelectorAll(".social-link");

  gsap.fromTo(
    socialLinks,
    { y: 20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footer,
        start: "top 30%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Grid lines animation
  const gridLines = document.querySelectorAll(".grid-line");

  gsap.fromTo(
    gridLines,
    { scaleY: 0 },
    {
      scaleY: 1,
      duration: 1,
      stagger: 0.05,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footer,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

/**
 * General Scroll Animations
 */
function initScrollAnimations() {
  // Reveal elements on scroll
  const revealElements = document.querySelectorAll(".gsap-reveal");

  revealElements.forEach((el) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    });
  });

  // Stagger children
  const staggerContainers = document.querySelectorAll(".stagger-children");

  staggerContainers.forEach((container) => {
    const children = container.querySelectorAll(":scope > *");

    gsap.fromTo(
      children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

/**
 * Parallax scroll effects
 */
function initParallaxEffects() {
  // Add custom parallax here if needed
}

/**
 * Export for debugging
 */
window.gsapAnimations = {
  initLenis,
  initScrollAnimations,
  initHeroAnimations,
  initStructuralAnimations,
  initCaseStudyAnimations,
  initAccordionAnimations,
  initSliderAnimations,
  initFooterAnimations,
};
