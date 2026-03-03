# UNFORM Technical Plotter Preloader - Implementation

## Task: Implement "The Technical Plotter" preloader with "Horizontal Fracture" exit animation

### Steps:
- [x] 1. Add preloader CSS styles to styles/styles.css
- [x] 2. Add preloader HTML structure to index.html
- [x] 3. Add preloader GSAP animation to js/animations.js
- [x] 4. Test and verify the animation works correctly

### Design Specifications:
- **The Skeleton (0%)**: Word "UNFORM" appears as faint 1px wireframe outline (blueprint style)
- **The Inking (0% → 100%)**: Vertical Blue Scan Line moves left to right, turning letters solid Ink Black
- **The Sync**: Percentage counter pinned to bottom of Blue Scan Line, traveling with it
- **Exit Animation**: 
  - Blue Scan Line vanishes at 100%
  - 1px horizontal fracture line strikes through center
  - Top half slides UP, bottom half slides DOWN
  - Letters stay attached to their halves (word "rips" in half)
  - Reveals homepage hero section

### Technical Details:
- Font: Space Grotesk (existing)
- Colors: #f9f9f7 (bg), #0f0f0f (ink), #0041FF (accent/blueprint cyan)
- Duration: ~3.5s for fill, ~1.2s for exit fracture
- GSAP timeline for smooth sync animation

