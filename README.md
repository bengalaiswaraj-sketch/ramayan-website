# Ramayana: Beyond What We Were Told

A production-quality static website presenting an immersive digital exhibition about the textual history of the Ramayana. Based on scholarly manuscript analysis and the Baroda Critical Edition, the site explores how popular beliefs about the epic compare with the earliest textual evidence.

## Purpose

This website helps users discover that several popular ideas commonly associated with the Ramayana may not appear in the earliest textual layer, belong to later retellings, or require more contextual understanding than popular culture normally provides. The approach is evidence-oriented, respectful of all traditions, and designed as a digital museum experience rather than a polemical argument.

## Project Structure

```
/
├── index.html                  # Homepage with hero, six investigation cards, methodology overview
├── timeline.html               # Interactive chronological timeline of Ramayana traditions
├── methodology.html            # How textual criticism works (accessible explanation)
├── sources.html                # Filterable source library
├── about.html                  # About the project
├── glossary.html               # Glossary of Sanskrit and textual terms
│
├── facts/                      # Six investigation detail pages
│   ├── sita-exile.html         # Investigation 01: Sita's Exile and the Uttara Kanda
│   ├── ravana-dahan.html       # Investigation 02: Ravana Dahan and Dussehra origins
│   ├── rama-shiva-penance.html # Investigation 03: Rama's alleged Brahmahatya penance
│   ├── lakshmana-rekha.html    # Investigation 04: The Lakshmana Rekha motif
│   ├── agni-pariksha.html      # Investigation 05: Agni Pariksha context and meaning
│   └── shambuka.html           # Investigation 06: The Shambuka episode
│
├── css/
│   ├── reset.css               # Modern CSS reset
│   ├── variables.css           # CSS custom properties (colors, typography, spacing)
│   ├── main.css                # Core layout (header, hero, footer, containers)
│   ├── components.css          # Reusable components (cards, modals, badges, etc.)
│   ├── article.css             # Long-form article styling
│   └── responsive.css          # Media queries, reduced motion, print styles
│
├── js/
│   ├── config.js               # Site configuration (visitor counter endpoint, etc.)
│   ├── main.js                 # Entry point, initializes all modules
│   ├── navigation.js           # Sticky header, mobile menu, active states
│   ├── animations.js           # Scroll-based animations (IntersectionObserver)
│   ├── search.js               # Client-side search with fuzzy matching
│   ├── sources.js              # Source reference modal system
│   ├── visitor-counter.js      # Dual-mode visitor counter
│   ├── reading-progress.js     # Reading progress bar and estimated read time
│   └── theme.js                # Dark/light reading mode toggle
│
├── data/
│   ├── sources.js              # Source database (all references from manuscript)
│   ├── search-index.js         # Search index for client-side search
│   └── glossary.js             # Glossary terms and definitions
│
├── assets/
│   ├── images/                 # Add final images here (see Image Guide below)
│   ├── icons/                  # Site icons
│   └── textures/               # Background textures
│
├── Manuscript.docx             # Primary source manuscript (not for public deployment)
├── CONTENT_REVIEW.md           # Editorial review file (claims needing verification)
└── README.md                   # This file
```

## How to Run Locally

The site is completely static — no build system or server required.

### Option 1: Direct File Access
Open `index.html` in any modern browser. Most features work directly from the filesystem.

### Option 2: Local HTTP Server (recommended for full functionality)

**Python:**
```bash
cd Ramayana_Website
python -m http.server 8000
# Open http://localhost:8000
```

**Node.js:**
```bash
npx serve .
# Or: npx http-server .
```

**VS Code:**
Install the "Live Server" extension, right-click `index.html`, select "Open with Live Server."

## Deployment

### GitHub Pages
1. Push the repository to GitHub
2. Go to Settings → Pages
3. Set Source to "Deploy from a branch" → select `main` (or `master`) → `/ (root)`
4. The site will be live at `https://yourusername.github.io/repository-name/`
5. **Important:** Remove `Manuscript.docx` and `CONTENT_REVIEW.md` from the public repo before deploying, or add them to `.gitignore`

### Netlify
1. Push to GitHub/GitLab/Bitbucket
2. Connect the repository in Netlify
3. Build command: (leave empty — no build step needed)
4. Publish directory: `.` (root)
5. Deploy

### Cloudflare Pages
1. Connect your Git repository
2. Framework preset: None
3. Build command: (leave empty)
4. Build output directory: `.` (root)
5. Deploy

## Adding Images

Image placeholders throughout the site are marked with the class `editorial-image-placeholder` and HTML comments describing the recommended image:

```html
<!-- IMAGE PLACEHOLDER:
Scene: Rama and Sita during coronation
Mood: triumphant, sacred, golden light
Aspect ratio: 16:9
Recommended source: public-domain artwork or commissioned illustration
-->
```

To add an image:
1. Place the image file in `assets/images/`
2. Replace the placeholder `<div>` with an `<img>` tag:
   ```html
   <img src="../assets/images/your-image.jpg" alt="Descriptive alt text" loading="lazy">
   ```
3. Use `loading="lazy"` for performance
4. Ensure images are respectful and culturally appropriate
5. Recommended formats: WebP (preferred), JPEG, PNG
6. Recommended sizes: 1200px wide for hero images, 800px for article images

## Adding Another Investigation

1. Create a new HTML file in `facts/` (e.g., `facts/new-topic.html`)
2. Copy the structure from an existing investigation page
3. Follow the storytelling structure:
   - The Story We Know → The Question → What the Text Says → The Evidence → Timeline → Why It Changed → What We Know/Don't → Sources → Next Investigation
4. Add source entries to `data/sources.js`
5. Add a search entry to `data/search-index.js`
6. Add a card to the homepage `index.html` investigations section
7. Update navigation in all pages
8. Add any new glossary terms to `data/glossary.js`

## Adding Sources

Sources are stored in `data/sources.js` as a JavaScript array:

```js
{
    id: "SRC051",
    author: "Author Name",
    title: "Full Title of Work",
    year: "Year",
    publisher: "Publisher Name",
    type: "CRITICAL EDITION",  // or: PRIMARY TEXT, ACADEMIC STUDY, REGIONAL RAMAYANA, etc.
    usedIn: ["sita-exile", "lakshmana-rekha"],
    description: "Brief description of the source and its relevance."
}
```

Reference sources in HTML using: `<span class="source-ref" data-source="SRC051">[Source 51]</span>`

## Visitor Counter Configuration

### Browser-Local Counter (Default)
By default, the site counts visits per browser using `localStorage`. This is labeled honestly as "Your visits: X" — not as a global count.

### Global Counter (Requires API)
To enable a global visitor counter:

1. Deploy a counter API (options below)
2. Set the endpoint in `js/config.js`:
   ```js
   const SITE_CONFIG = {
       visitorCounterEndpoint: "https://your-api-endpoint.com/counter"
   };
   ```

**Counter API Options:**
- **Cloudflare Worker** with KV storage
- **Firebase Cloud Function** with Firestore
- **Supabase Edge Function**
- **Vercel Serverless Function**

The API should support:
- `GET /counter` → returns `{ "count": 12345 }`
- `POST /counter` → increments and returns updated count

The site handles API errors gracefully, falling back to local counting.

### Difference Between Counters
- **Browser-local**: Counts only this browser's visits. Resets if localStorage is cleared. Cannot be shared across devices. Labeled as "Your visits."
- **Global**: Counts all visitors across all devices. Requires a server/API. Can show "X Explorers Have Visited."

## Technology

- **HTML5** — Semantic markup, ARIA accessibility
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript ES6+** — No frameworks, no dependencies
- **Google Fonts** — Cinzel (headings), Inter (body), Noto Serif Devanagari (Sanskrit)

No React, Vue, Angular, or build system. Zero runtime dependencies.

## Content Integrity

All factual content is derived from the supplied manuscript (`Manuscript.docx`). Claims needing editorial verification are flagged in `CONTENT_REVIEW.md`. Source integrity rules:

1. Every citation traces to the manuscript
2. No manufactured URLs, DOIs, page numbers, or quotations
3. Scholarly controversies are presented as debates, not settled facts
4. Later traditions are treated respectfully as cultural developments
5. Confidence badges distinguish: TEXTUALLY ATTESTED, LATER TRADITION, SCHOLARLY INTERPRETATION, DEBATED

## Accessibility

- Semantic HTML throughout
- Keyboard navigable (visible focus states)
- Skip-to-content link
- ARIA labels where needed
- Minimum 4.5:1 contrast ratios
- `prefers-reduced-motion` respected
- Responsive from 360px to desktop
- Alt text placeholders for images

## Performance Targets

- Lighthouse Performance: > 90
- Lighthouse Accessibility: > 95
- Lighthouse Best Practices: > 95
- Lighthouse SEO: > 95

## License

Content derived from the supplied manuscript. Website code may be adapted with attribution.
