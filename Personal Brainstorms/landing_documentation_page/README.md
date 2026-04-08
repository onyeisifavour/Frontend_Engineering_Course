# Documentation Gateway Component

A high-performance, fluid landing page component designed to act as a professional bridge between a main application and its technical documentation.

## 🚀 Technical Highlights
This project was built to demonstrate mastery of modern CSS architecture and the browser rendering pipeline.

### 1. Fluid Typography & Spacing
- **Implementation:** Used `clamp()` and `calc()` based on a 1.25x Type Scale.
- **Why:** To ensure the UI remains readable and aesthetically balanced across all device sizes (from 320px to 2560px) without relying on excessive media queries.

### 2. Contextual Fluidity (Container Queries)
- **Implementation:** Utilized `cqi` units for button padding.
- **Why:** By using Container Query units instead of Viewport units, the buttons maintain their proportions relative to their parent container (`header`), making this component truly plug-and-play for any layout.

### 3. Rendering Optimization
- **Implementation:** Animations are restricted to the `transform: scale()` property.
- **Why:** This ensures transitions happen on the **Composite Layer** of the browser engine, avoiding expensive "Layout" or "Paint" cycles and maintaining a smooth 60fps experience.

## 🎨 Design System
- **Color Logic:** Built using HSL variables to allow for rapid theming.
- **Hierarchy:** Established through high-contrast typography and intentional "Negative Space" to guide the user toward the primary action: "View Documentation."

## 🛠 Setup
1. Clone the repository.
2. Open `index.html` in any modern browser.
3. To customize colors, modify the `:root` variables in `style.css`.