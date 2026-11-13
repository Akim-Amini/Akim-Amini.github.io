# Akim Amini — Personal Portfolio

A four-page personal portfolio website built with HTML5, external CSS3 and vanilla JavaScript for the assignment **“Design and Development of a Personal Portfolio Website Using HTML, CSS and JavaScript.”**

The site presents Akim Amini's background, education, technical skills, interests, career aspirations and six software projects. It uses no frameworks, no build step and no downloaded templates: every HTML, CSS and JavaScript file in this repository was written for this project.

| | |
| --- | --- |
| **Live website** | <https://akim-amini.github.io/> |
| **GitHub repository** | <https://github.com/Akim-Amini/Akim-Amini.github.io> |
| **Branch** | `main` |
| **Hosting** | GitHub Pages (branch `main`, root folder) |

## Objectives

- Present a clear professional profile: biography, education, technical skills, interests and career aspirations.
- Showcase six genuine projects with their real status, technologies, screenshots and public links where one exists.
- Demonstrate practical HTML5, CSS3 and JavaScript skills through semantic markup, responsive layout, CSS animation and JavaScript interaction.
- Provide an accessible, keyboard-friendly experience, including a light/dark theme and a manual Reduce Motion option.
- Publish the finished site with Git, GitHub and GitHub Pages, and document how it is maintained.

## Technologies used

| Technology | How it is used |
| --- | --- |
| **HTML5** | Semantic page structure, headings, lists, a data table, figures with captions, and accessible landmarks on all four pages. |
| **CSS3** | Two external stylesheets, custom properties, Flexbox and Grid layouts, media queries, transitions and `@keyframes` animations. |
| **JavaScript** | Two external scripts using the DOM, `localStorage`, `setTimeout`, `IntersectionObserver` and event listeners. No libraries or frameworks. |
| **Git and GitHub** | Local version control and the public remote repository that stores the source. |
| **GitHub Pages** | Static hosting for the site, published directly from the `main` branch. |
| **Google Fonts** | The Manrope and Sora web fonts, with system-font fallbacks. |

## Website structure

The website has four linked pages, each sharing the same header, primary navigation and footer.

| File | Page | Content |
| --- | --- | --- |
| `index.html` | **Home** | Hero with the profile photograph and a typing animation, five professional-interest cards, three featured projects and a contact band. |
| `about.html` | **About Me** | Biography, quick-facts panel, education table, technical skills list, interests list and career aspirations. |
| `projects.html` | **Projects** | Six project cards in a fixed order, each with its description, category, technologies, status and links or a private-repository note. Ten project screenshots in total. |
| `animations.html` | **Animated Concepts** | Four interactive demonstrations with explanations: typing text, hover/focus effects, scroll reveal and CSS keyframes. |

### Home

The hero introduces Akim as a Computer Science student at DMI – St. John the Baptist University and cycles through three phrases with a typing effect. It links to the About and Projects pages and to the contact section. The page then lists five focus areas — software development, networking, cybersecurity, graphic design and artificial intelligence — followed by three featured projects and links to GitHub and LinkedIn.

### About Me

The About page contains a three-paragraph biography, a quick-facts panel, an education table with a caption and column headers, a list of twelve languages and tools, a list of five interests, and a career-aspirations section. It does not display proficiency percentages, because the portfolio does not claim levels of expertise.

### Projects

The Projects page presents six projects as an ordered list of cards. Projects with genuine screenshots use image galleries; projects without a genuine screenshot use a text-only card rather than an empty image frame. Each screenshot links to its full-size local PNG in a new tab and has descriptive `alt` text and a caption.

### Animated Concepts

The Animated Concepts page explains and demonstrates the techniques used across the site:

1. **Typing text** — types, pauses, deletes and rotates three phrases, with a replay button and a phrase selector.
2. **Hover and focus** — cards lift, glow and move their icon on hover or keyboard focus.
3. **Scroll reveal** — four blocks fade in as they enter the viewport, with a reset-and-replay button.
4. **CSS keyframes** — a floating orb and expanding ring, with a pause/resume button.

## Main features

### Responsive design

The layout adapts to phones, tablets and desktop screens using media queries at 980, 900, 820, 700, 600, 520, 400 and 340 pixels.

| Width | Layout |
| --- | --- |
| Above 980px | Full desktop layout with two-column hero and project cards. |
| 900px and below | About grid and project cards become single column; footer becomes two columns. |
| 820px and below | Primary navigation collapses into a menu button; header controls keep 44px targets. |
| 700px and below | The education table stacks into one card per row, with column labels supplied by `data-label`. |
| 600px and below | Footer becomes a single column. |
| 520px and below | Hero buttons become full width, the theme label is hidden, project galleries become one column and project metadata stacks. |
| 400px and below | The menu button shows its icon only; the accessible label is unchanged. |
| 340px and below | Only the “AA” brand mark is shown in the header. |

The site was checked at 320, 360, 390, 768, 1024 and 1366 pixels wide with no horizontal page overflow.

### Navigation

- The same four links appear in the header and footer of every page.
- The current page is marked with `aria-current="page"`.
- Below 820px the menu opens and closes with a real `<button>` that updates `aria-expanded` and its accessible label.
- The menu closes with the Escape key, returns focus to the menu button, and closes automatically when the viewport returns to desktop width.
- All links use relative paths, so the site works from the repository root and from a local folder.

### Semantic HTML

- Every page declares `<!DOCTYPE html>`, `lang="en"` and a descriptive `<title>` and meta description.
- Pages use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<figcaption>`, `<aside>` and `<footer>`.
- Each page has exactly one `<h1>` and a logical heading order.
- Content uses unordered lists, an ordered project list, description lists and a data table with `<caption>`, `<thead>`, `<tbody>`, `<th scope="col">` and `data-label` attributes.
- Images include `width` and `height` attributes to reserve space while loading.

### CSS styling and animations

- `css/styles.css` holds the design tokens, layout, components, theme variants and responsive rules.
- `css/animations.css` holds the keyframes and reduced-motion rules.
- The design uses CSS custom properties, Flexbox, Grid, gradients, shadows, transitions and four named keyframe animations: `cursor-blink`, `float-orb`, `pulse-ring` and `shine`.
- A light/dark theme is applied through a `data-theme` attribute; the choice is saved in `localStorage` and falls back to the operating-system preference.

### JavaScript interactions

- `js/main.js` is loaded on every page and handles the theme toggle, motion preference, mobile navigation, home-page typing effect, scroll reveal, back-to-top button and footer year.
- `js/animations.js` is loaded only on the Animated Concepts page and controls the typing demo, the reveal replay and the keyframe pause/resume.
- The typing effect is shared between the home page and the demonstration page through one function.
- Scroll reveal uses `IntersectionObserver`; content is shown immediately when JavaScript is unavailable.
- All scripts are external files; there are no JavaScript frameworks or libraries.

### Accessibility

- A “Skip to main content” link is the first focusable element on every page.
- Interactive controls are real `<button>` and `<a>` elements with visible `:focus-visible` outlines.
- The theme and motion buttons expose `aria-label` and `aria-pressed`; the menu button exposes `aria-expanded` and `aria-controls`.
- Decorative graphics are marked `aria-hidden`; informative images have descriptive `alt` text.
- Buttons and header controls have a minimum height of 44px.
- A `<noscript>` block keeps the navigation usable and hides controls that require JavaScript.
- The site respects the operating system's `prefers-reduced-motion` setting.

### Reduce Motion

Every page includes a **Reduce motion** button in the footer, and the Animated Concepts page also has a motion-settings panel. The choice is saved in `localStorage` under `portfolio-motion` and overrides the operating-system setting for that browser. When motion is reduced, the typing effect shows a complete phrase, scroll-revealed content is displayed immediately, and keyframe animations are paused or shown in their final state. The preference can be reversed at any time with **Enable motion**.

## Project portfolio

The six projects below appear on `projects.html` in this order. The descriptions and technologies match the information displayed on the page; no project features, links or achievements have been added.

### 1. NoteNest — Version 1 Complete

A privacy-focused note-taking and productivity application for creating and organising personal notes, checklists and to-do lists. It supports offline access and installation as a Progressive Web App.

- **Category:** Web Application / Progressive Web App
- **Technologies:** React, TypeScript, Vite, Tailwind CSS, localStorage, Service Worker, PWA
- **Live application:** <https://akim-amini.github.io/notenest/>
- **Repository:** <https://github.com/Akim-Amini/notenest>
- **Screenshots:** dashboard, checklist and mobile views
- **Development disclosure:** initially created with Google AI Studio, then customised using GitHub Copilot; developed individually by Akim Amini.

### 2. Flex by Dramin — Working Prototype, Under Redevelopment

A Flask-based e-commerce prototype that allows administrators to add products, customers to view products and place orders, and administrators to monitor orders. Stock quantities decrease when orders are placed.

- **Category:** E-commerce Web Application
- **Technologies:** Python, Flask, SQLite, HTML, CSS, JavaScript
- **Repository:** private — available on request. No link is published.
- **Screenshot:** none supplied, so the card is text-only.

### 3. Chichewa Hate Speech Detection System — In Development

An ongoing academic project exploring machine-learning approaches for identifying potentially hateful language in Chichewa social media texts. The application uses Flask and provides authentication and an interface for the planned detection and moderation workflow.

- **Academic title:** “A Machine Learning-Based System for Detection of Hate Speech in Chichewa Social Media Texts.”
- **Category:** Academic Research / Web Application
- **Technologies currently used:** Python, Flask, SQLite, HTML, CSS, JavaScript
- **Repository:** private — available on request. No link is published.
- **Screenshot:** none supplied, so the card is text-only.

### 4. DMI Voting System — Live

A collaborative web-based voting system developed by members of the DMI Science and Engineering Club. It was approved by university management and used during the election of the Student Union President.

- **Category:** Collaborative Web Application
- **Development team:** DMI Science and Engineering Club
- **Akim's role:** Front-end Developer
- **Akim's contribution:** HTML and CSS front-end development
- **Technologies confirmed for this contribution:** HTML, CSS
- **Live website:** <https://dmiv.netlify.app/>
- **Screenshots:** home, results and team pages
- **Team disclosure:** a group effort; the rest of the system was delivered by other team members.

### 5. Two-Way TCP File Server/Client GUI

A Python desktop application demonstrating two-way file transfer between a client and server over a TCP socket connection. It supports uploading and downloading files, progress-bar updates and basic exception handling.

- **Category:** Networking / Desktop Application
- **Technologies:** Python 3, Tkinter, Python socket module
- **Development environment:** PyCharm
- **Screenshots:** main window, successful upload and successful download
- **Links:** none are displayed on the Projects page.

### 6. Event Planner Application

A simple event-management application that allows users to add, view, search, edit and delete event records.

- **Category:** Desktop Application
- **Technologies:** Python 3, Tkinter, ttk, SQLite3
- **Screenshot:** main window
- **Links:** none are displayed on the Projects page.

## Folder structure

```text
PersonalPortfolio/
├── index.html                  Home page
├── about.html                  About Me page
├── projects.html               Projects page
├── animations.html             Animated Concepts page
├── css/
│   ├── styles.css              theme tokens, layout, components and responsive rules
│   └── animations.css          @keyframes and reduced-motion rules
├── js/
│   ├── main.js                 shared behaviour on every page
│   └── animations.js           controllers for the Animated Concepts page
├── assets/
│   ├── images/
│   │   ├── profile/
│   │   │   ├── profile.jpg                 profile photograph (3000 × 4000)
│   │   │   └── profile-placeholder.svg     unused earlier asset
│   │   └── projects/
│   │       ├── notenest-dashboard.png      NoteNest screenshots
│   │       ├── notenest-checklist.png
│   │       ├── notenest-mobile.png
│   │       ├── dmi-voting-home.png         DMI Voting System screenshots
│   │       ├── dmi-voting-results.png
│   │       ├── dmi-voting-team.png
│   │       ├── tcp-gui_main.png            Two-Way TCP screenshots
│   │       ├── tcp-upload_success.png
│   │       ├── tcp-download_success.png
│   │       ├── event-main.png              Event Planner screenshot
│   │       ├── notenest-placeholder.svg    unused earlier assets
│   │       ├── flex-placeholder.svg
│   │       └── chichewa-placeholder.svg
│   └── docs/
│       └── Akim-Amini-CV.pdf   private CV — local only, ignored by Git, not published
├── .nojekyll                   tells GitHub Pages not to run Jekyll
├── .gitignore                  excludes the private CV and temporary files
└── README.md                   this documentation
```

The placeholder SVGs are retained on disk but are not referenced by any page. The `assets/docs/` folder exists only on the owner's computer and is not part of the public repository.

## Running the website locally

There is no build step, no package manager and no dependency installation.

**Option 1 — open the files directly**

Open `index.html` in a modern browser.

**Option 2 — use a local server (recommended)**

From the project folder, run:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000/>.

**Option 3 — Visual Studio Code**

Open the project folder and use the Live Server extension.

A local server is recommended because it matches how the site is served on GitHub Pages. The site uses relative paths, so all pages, stylesheets, scripts and images work from the project root.

The Google Fonts request requires an internet connection; if it fails, the CSS font stack falls back to system fonts and the site still works. JavaScript is required for the mobile menu, typing effect, theme toggle, scroll reveal and animation controls. With JavaScript disabled, the `<noscript>` rules keep the navigation usable and hide the controls that need scripting.

## Deployment with GitHub Pages

The repository is named `Akim-Amini.github.io`, which makes it a GitHub user site, so it is published at the root of <https://akim-amini.github.io/>.

Configuration used:

1. Open the repository on GitHub and go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Select branch **main** and folder **/ (root)**.
4. Save. GitHub Pages builds the site from the root of `main`.

Every push to `main` starts a new Pages build. The `.nojekyll` file disables Jekyll processing, so the HTML, CSS, JavaScript and image files are served exactly as committed. No GitHub Actions workflow is required.

To publish a change:

```bash
git add .
git commit -m "Describe the change"
git push origin main
```

The live site is served over HTTPS and the four pages are available at:

- <https://akim-amini.github.io/>
- <https://akim-amini.github.io/about.html>
- <https://akim-amini.github.io/projects.html>
- <https://akim-amini.github.io/animations.html>

## Verification

Checked on 13 November 2026 against the published site and the `main` branch:

- All four pages return HTTP 200 and load their shared header, navigation and footer.
- No JavaScript console errors on any page.
- No broken images: all 10 project screenshots and the profile photograph load.
- All 22 internal links, stylesheets, scripts and image links return HTTP 200.
- 24 responsive checks (four pages at 320, 360, 390, 768, 1024 and 1366 pixels) found no horizontal overflow.
- Theme toggle, Reduce Motion toggle, mobile menu, typing effect, scroll reveal and keyframe pause/resume all respond correctly.
- No placeholder or “coming soon” text is displayed, and no private email address, phone number, referee detail or CV link appears on any page.
- GitHub Pages is serving the latest `main` commit, and the published HTML, CSS and JavaScript files match the files in the repository.

## Private CV

The complete CV is stored locally at `assets/docs/Akim-Amini-CV.pdf`. It contains personal contact information and referee details, so it is **not** part of the public website:

- `.gitignore` excludes `assets/docs/Akim-Amini-CV.pdf`; it has never been committed or uploaded.
- There is no **Download My CV** button and no link to the file on any page.
- The original PDF remains on the owner's computer, unmodified.
- No private email address, phone number or referee contact details appear in the HTML.

To confirm the exclusion before committing:

```bash
git check-ignore -v assets/docs/Akim-Amini-CV.pdf
```

Do not use `git add -f` on that file.

## Author

**Akim Amini**  
Bachelor of Science in Computer Science  
DMI – St. John the Baptist University

- GitHub: <https://github.com/Akim-Amini>
- LinkedIn: <https://www.linkedin.com/in/ackim-amini-401151327/>
