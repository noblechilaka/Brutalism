# Preloader Implementation Plan

## Information Gathered:

- **Project**: UNFORM Architectural Studio website
- **Current Tech Stack**: HTML, CSS (custom properties), GSAP, Lenis smooth scroll
- **Design System**:
  - Paper White: #F9F9F7 (background)
  - Ink Black: #0F0F0F (text)
  - Font: Space Grotesk (headlines), IBM Plex Mono (functional)
- **Animation**: GSAP already in use

## Implementation Status: ✅ COMPLETE

### 1. HTML Structure (index.html) - ✅ DONE

- Preloader container with split design (top/bottom)
- 12-column background grid
- UNFORM logo with SVG paths (wireframe outline + fill)
- Scanner line with glow effect
- Progress counter (bottom-right)
- Corner metadata elements (SCANNING_ASSETS, GPS coords, GRID status)

### 2. CSS Styles (styles/styles.css) - ✅ DONE

- Preloader overlay (fixed, z-index: 99999)
- 12-column grid with 1px lines
- Logo animations: stroke-dasharray for wireframe effect, clip-path for fill reveal
- Scanner line animation synced to timing
- Flickering metadata text animation
- Grid split exit animation (top slides up, bottom slides down)
- Added --ease-weighted: cubic-bezier(0.85, 0, 0.15, 1)

### 3. JavaScript (js/scripts.js) - ✅ DONE

- initPreloader() function
- Progress counter: 0.00% → 100.00% over 2.2 seconds
- Scanner line animation synced to progress
- Logo fill effect using CSS clip-path
- GeoIP fetch for user coordinates (ipapi.co)
- Corner metadata updates during load
- Grid split exit at 100% completion
- Hero animation trigger after preloader

## Followup Steps:

- Test preloader on page load
- Verify grid split animation works smoothly
- Check GeoIP functionality (may need CORS proxy in some environments)
- Ensure fonts load correctly
- Test with slow network to see loading behavior
