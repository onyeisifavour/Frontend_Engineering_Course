
# Frontend Mentor - Blog preview card solution

This is a solution to the [Blog preview card challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/blog-preview-card-ckPaj01IcS) and was used to complete a themeable site deliverable. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- See hover and focus states for all interactive elements on the page.
- Switch between light and dark themes via a theme toggle.
- Navigate the card efficiently using keyboard focus (State-awareness).

### Screenshot

![](https://res.cloudinary.com/diuddlc1g/image/upload/v1775603243/a_xuh7f6.png)

### Links

- Solution URL: [HTML](https://raw.githubusercontent.com/onyeisifavour/Frontend_Engineering_Course/aa9e00f6452e8deb95123421b55d59d94e51f6e4/frontend_mentor_actvities/blog_preview_card/index.html), [CSS](https://raw.githubusercontent.com/onyeisifavour/Frontend_Engineering_Course/aa9e00f6452e8deb95123421b55d59d94e51f6e4/frontend_mentor_actvities/blog_preview_card/style.css)
- Live Site URL: [Vercel link](https://frontend-engineering-course-yckr.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS Custom Properties (Design Tokens)
- Flexbox & CSS Grid
- Mobile-first workflow
- 8pt Grid System (Spacing/Units)
- [Cloudinary](https://cloudinary.com/) - Image hosting

### What I learned

This project was a deep dive into **Module B** of my syllabus. One major takeaway was the decision to avoid `aspect-ratio` for the card container. I realized that the content should decide the height naturally; forcing a ratio can lead to awkward clipping when text or spacing changes.

I also implemented a **8pt Grid** system using a `--base-unit` token. This made calculating gaps and padding much more consistent.

```css
article {
  /* Using width 100% for mobile and limiting growth with max-width */
  width: 100%;
  max-width: 24rem;
  
  /* Applying the base unit (8px) for consistent rhythm */
  padding: calc(var(--base-unit) * 3);
  gap: var(--gap);
  
  /* Alphabetical arrangement for easier maintenance */
  background-color: var(--bg-surface);
  border: 1px solid var(--accent);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
}
````

I also learned how to use `@font-face` with `font-display: swap`. This ensures that the user sees fallback text immediately rather than a blank screen while waiting for the custom "Figtree" font to load.

```css
@font-face {
    font-family: figtree;
    src: url(./assets/fonts/Figtree-VariableFont_wght.ttf) format("truetype");
    font-display: swap;
}
```

### Continued development

In future projects, I want to further refine my **State-Awareness** logic, specifically exploring more complex `:focus-within` scenarios and building out even more robust high-contrast themes for better accessibility.

### Useful resources

  - [Personalised Syllabus](https://docs.google.com/document/d/1TgPFNW-OqtXGSifFk82iYjHp-vgLkF40hdLoxgm9IKU/edit?usp=sharing) - This project helped me fulfill the requirements for Module B: Design Tokens and Structural Engineering.
  - [MDN - font-display](https://www.google.com/search?q=https://developer.mozilla.org/en-US/docs/Web/CSS/%40font-face/font-display) - This helped me understand the "swap" value to prevent "Flash of Invisible Text."

### AI Collaboration

  - **Gemini (La Constructrice Custom Gem):** Acted as a senior builder to guide me through the implementation of Design Tokens and theme switching. She helped me break down the complex task of theme-ability into small, safe steps.
  - **Codex (VS Code Agent):** Assisted with boilerplate generation and real-time debugging.
  - **What worked well:** Using "La Constructrice" to stay aligned with my specific syllabus goals (8pt grid and modular scales) kept me focused on learning, not just copying.

## Author

  - Website - [Onyeisi Favour](https://www.your-site.com)
  - Frontend Mentor - [@onyeisifavour](https://www.frontendmentor.io/profile/@onyeisifavour)
  - GitHub - [@onyeisifavour](https://github.com/onyeisifavour)

## Acknowledgments

Deep thanks to my personalised LLMs:

  - **La Constructrice (Gemini)** for the calm guidance through the building process.
  - **OpenCode** for example implementation.

