/**
 * UNFORM - Methodology / Research Lab
 * JavaScript Interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  initManifestoScroll();
  initTimelineHorizontalScroll();
  initMaterialLens();
  initSustainabilityGauges();
});

/**
 * Section 1: Manifesto Background Transition
 */
function initManifestoScroll() {
  const manifesto = document.querySelector(".methodology-manifesto");
  if (!manifesto) return;

  ScrollTrigger.create({
    trigger: manifesto,
    start: "top top",
    end: "bottom top",
    onUpdate: (self) => {
      if (self.progress > 0.3) {
        manifesto.classList.add("scrolled");
      } else {
        manifesto.classList.remove("scrolled");
      }
    },
  });
}

/**
 * Section 2: Timeline Horizontal Scroll
 */
function initTimelineHorizontalScroll() {
  const timeline = document.querySelector(".methodology-timeline");
  if (!timeline) return;

  const scrollWrapper = document.querySelector(".timeline-scroll-wrapper");
  const horizontalSection = document.querySelector(".timeline-horizontal");

  if (!scrollWrapper || !horizontalSection) return;

  // Get the total scrollable width
  const getScrollWidth = () => {
    return horizontalSection.scrollWidth - window.innerWidth + window.innerWidth * 0.1;
  };

  // Create the horizontal scroll animation
  const scrollTween = gsap.to(horizontalSection, {
    x: () => -getScrollWidth(),
    ease: "none",
    scrollTrigger: {
      trigger: timeline,
      start: "top top",
      end: () => "+=" + getScrollWidth(),
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // Animate phase elements as they come into view
  const phases = document.querySelectorAll(".timeline-phase");

  phases.forEach((phase, index) => {
    gsap.fromTo(
      phase,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: phase,
          containerAnimation: scrollTween,
          start: "left 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

/**
 * Section 3: Material Lens Effect
 */
function initMaterialLens() {
  const materialVisual = document.querySelector(".material-visual");
  const materialImage = document.querySelector(".material-image");
  const lens = document.querySelector(".lens");

  if (!materialVisual || !materialImage || !lens) return;

  const zoomLevel = 2.5;

  materialVisual.addEventListener("mousemove", (e) => {
    const rect = materialVisual.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate position as percentage
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    // Show lens
    lens.classList.add("active");

    // Position lens
    lens.style.left = `${e.clientX - 75}px`;
    lens.style.top = `${e.clientY - 75}px`;

    // Set background image for lens (magnified)
    const imgSrc = materialImage.src || materialImage.currentSrc;
    lens.style.backgroundImage = `url(${imgSrc})`;
    lens.style.backgroundSize = `${rect.width * zoomLevel}px ${rect.height * zoomLevel}px`;
    lens.style.backgroundPosition = `${-x * zoomLevel + 75}px ${-y * zoomLevel + 75}px`;
  });

  materialVisual.addEventListener("mouseleave", () => {
    lens.classList.remove("active");
  });

  // Animate spec values on scroll
  gsap.fromTo(
    ".spec-item",
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".materials-comparison",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Animate footprint bar
  gsap.fromTo(
    ".footprint-fill",
    { width: 0 },
    {
      width: "78%",
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".spec-footprint",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

/**
 * Section 4: Sustainability Circular Gauges
 */
function initSustainabilityGauges() {
  const gauges = document.querySelectorAll(".gauge-container");

  if (!gauges.length) return;

  const gaugeData = [
    { percent: 30, element: ".gauge-energy .gauge-fill", value: ".gauge-energy .gauge-value" },
    { percent: 65, element: ".gauge-recycled .gauge-fill", value: ".gauge-recycled .gauge-value" },
    { percent: 85, element: ".gauge-light .gauge-fill", value: ".gauge-light .gauge-value" },
  ];

  const circumference = 2 * Math.PI * 90; // radius = 90

  gaugeData.forEach((data, index) => {
    const gauge = gauges[index];
    if (!gauge) return;

    const fill = gauge.querySelector(".gauge-fill");
    const value = gauge.querySelector(".gauge-value");

    if (!fill || !value) return;

    ScrollTrigger.create({
      trigger: gauge,
      start: "top 80%",
      onEnter: () => {
        // Animate stroke
        const offset = circumference - (data.percent / 100) * circumference;
        gsap.to(fill, {
          strokeDashoffset: offset,
          duration: 1.5,
          ease: "power3.out",
        });

        // Animate number
        const obj = { val: 0 };
        gsap.to(obj, {
          val: data.percent,
          duration: 1.5,
          ease: "power3.out",
          onUpdate: () => {
            value.textContent = Math.round(obj.val) + "%";
          },
        });
      },
      once: true,
    });
  });

  // Header animations
  gsap.fromTo(
    ".sustainability-title",
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".methodology-sustainability",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

/**
 * Export for debugging
 */
window.methodologyJS = {
  initManifestoScroll,
  initTimelineHorizontalScroll,
  initMaterialLens,
  initSustainabilityGauges,
};

