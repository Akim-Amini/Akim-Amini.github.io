# Akim Amini — Personal Portfolio

A four-page personal portfolio website built with HTML5, external CSS and vanilla JavaScript for the **Design and Development of a Personal Portfolio Website Using HTML, CSS and JavaScript** assignment.

No frameworks, no build step and no downloaded templates. Every file in this folder was written for this project.

## Phase status

**Phase 1.5 + Phase 2 — interactive features and portfolio content: complete.**

Completed so far:

- Phase 1: folder structure, four HTML pages, shared header/navigation/footer, dark navy and blue visual foundation, responsive layout, base JavaScript.
- Phase 1.5: light/dark theme toggle with `localStorage` and system-preference fallback, manual reduce-motion toggle, scroll reveal with `IntersectionObserver`, typing animation, back-to-top button, hover and focus transitions, CSS keyframe animations.
- Phase 2: full Home, About Me, Projects and Animated Concepts content, plus labelled placeholders where genuine screenshots are not yet supplied.
- Genuine images: Akim's profile photograph on the Home page and genuine screenshots for NoteNest, the DMI Voting System, the Two-Way TCP File Server/Client GUI and the Event Planner Application on the Projects page (see below).

Not started: deployment and Git history.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home page: hero, typing animation, professional interests, featured projects, contact band. |
| `about.html` | About Me: approved biography, quick facts, education table, skills, interests, career aspirations. |
| `projects.html` | Six project cards in the required order with statuses, technologies and links. |
| `animations.html` | Four interactive animation demonstrations with explanations. |

## Folder structure

```text
PersonalPortfolio/
├── index.html
├── about.html
├── projects.html
├── animations.html
├── css/
│   ├── styles.css        shared theme tokens, layout and components
│   └── animations.css    @keyframes and reduced-motion rules
├── js/
│   ├── main.js           shared behaviour (theme, motion, nav, typing, reveal, back-to-top)
│   └── animations.js     controllers for the Animated Concepts page
├── assets/
│   ├── images/
│   │   ├── profile/
│   │   │   ├── profile.jpg            genuine photograph, 3000 x 4000
│   │   │   └── profile-placeholder.svg
│   │   └── projects/
│   │       ├── notenest-dashboard.png      genuine screenshot, 1906 x 874
│   │       ├── notenest-checklist.png      genuine screenshot, 1838 x 866
│   │       ├── notenest-mobile.png         genuine screenshot, 662 x 888
│   │       ├── dmi-voting-home.png         genuine screenshot, 1902 x 867
│   │       ├── dmi-voting-results.png      genuine screenshot, 1898 x 875
│   │       ├── dmi-voting-team.png         genuine screenshot, 1886 x 880
│   │       ├── tcp-gui_main.png            genuine screenshot, 631 x 528
│   │       ├── tcp-upload_success.png      genuine screenshot, 631 x 528
│   │       ├── tcp-download_success.png    genuine screenshot, 631 x 528
│   │       ├── event-main.png              genuine screenshot, 1202 x 1008
│   │       ├── notenest-placeholder.svg
│   │       ├── flex-placeholder.svg
│   │       └── chichewa-placeholder.svg
│   └── docs/
│       └── Akim-Amini-CV.pdf            private CV, gitignored — not published
├── .nojekyll
├── .gitignore
└── README.md
```

## Running the website locally

There is no build step and no framework.

1. Open `index.html` directly in a modern browser, or
2. Open the project folder in Visual Studio Code and use a local server such as Live Server, or run `python -m http.server 8000` in the project folder and visit `http://localhost:8000/`.

A local server is recommended because it matches how the site will behave when published.

The mobile navigation and all animations require JavaScript. If JavaScript is disabled, a `<noscript>` style keeps the navigation usable and the animation toggles hidden.

## Features and where they live

| Feature | Files | Notes |
| --- | --- | --- |
| Typing animation | `js/main.js` (`createTypingEffect`), `index.html`, `animations.html` | Types, pauses, deletes and rotates three phrases. Shared by the home page and the demo page. |
| Scroll reveal | `js/main.js` (`initScrollReveal`), `css/styles.css` (`.reveal`) | `IntersectionObserver` with `threshold: 0.12`. Content stays visible if JavaScript is off. |
| Light/dark theme | inline `<head>` script + `js/main.js` (`applyTheme`) | Saved in `localStorage` under `portfolio-theme`; system preference used on the first visit. |
| Reduce motion | inline `<head>` script + `js/main.js` (`applyMotionPreference`) | Saved under `portfolio-motion`. Manual choice overrides the OS setting. |
| Back to top | `js/main.js` (`initBackToTop`) | Appears after 420px of scrolling and uses `window.scrollTo`. |
| Mobile navigation | `js/main.js` (`initNavigation`) | Toggles `aria-expanded`, closes with Escape and returns focus to the button. |
| CSS keyframes | `css/animations.css` | `cursor-blink`, `float-orb`, `pulse-ring`, `shine`. |

## Keyboard and accessibility notes

- A skip link is the first focusable element on every page.
- All interactive controls are real `<button>` or `<a>` elements and show a visible `:focus-visible` outline.
- The theme and motion buttons expose `aria-label` and `aria-pressed` states.
- Motion is reduced automatically when the operating system asks for it, unless the visitor explicitly enables motion.
- Decorative SVG graphics are marked `aria-hidden`; the placeholders carry descriptive `alt` text.

## Responsive behaviour

Tested at 360, 375, 390, 414, 768, 1024 and 1366 pixels wide, with extra checks at 320, 520, 521, 700, 701, 820 and 821 pixels to confirm the breakpoints.

| Width | Layout |
| --- | --- |
| 320–400 | Single column, AA mark only at ≤340, icon-only menu button at ≤400 |
| 401–520 | Single column, full-width hero buttons, theme label hidden |
| 521–700 | Single column, stacked education table |
| 701–820 | Single column, normal education table, collapsible menu |
| 821–980 | Two-column footer, full navigation bar, single-column project cards |
| 981–1120 | Two-column project cards, two-column home hero |
| 1121+ | Full desktop layout |

Key decisions:

- The navigation collapses into a menu at 820px rather than 768px, because a 768px tablet left only about 20px between the brand and the navigation links. Phones and portrait tablets now share the same menu.
- Below 700px the education table is stacked into one card per row. Each `<td>` carries a `data-label` attribute and CSS shows that label with `::before`, so the table markup is unchanged on desktop.
- Buttons and header controls have a minimum height of 44px, and the back-to-top button is 48px on small screens.
- Images keep their natural aspect ratio: the portrait frame is 3:4, matching the profile photograph, so `object-fit: cover` shows the whole image without cropping the face, upper body or laptop. Project images scale with the column width.
- Projects without a genuine screenshot (Flex by Dramin and Chichewa) use a single centred text column instead of an empty image pane. Projects with several screenshots use a gallery: the DMI screenshots stack in one column, the TCP main window spans the column with the upload and download shots two-up, and the gallery becomes one column at 520px and below.
- No horizontal page overflow at any tested width.

## Content rules

- No personal information, project features, screenshots or achievements are invented.
- The CV is kept private. It is excluded from Git and is not linked or published on the website.
- No private email address, phone number or referee contact details appear on any of the four HTML pages.
- Private project repositories remain unlinked and are described as available on request.
- Project statuses are presented accurately.
- The profile photograph and the project screenshots are Akim's own images, used unmodified. Flex by Dramin and Chichewa are presented as text-only cards because no genuine screenshots were supplied for them.

## Profile photograph

The Home page portrait uses `assets/images/profile/profile.jpg`, Akim's genuine photograph. The original file is used as supplied: it has not been cropped, retouched or re-encoded. It is 3000 x 4000 pixels (3:4) and about 7.9 MB. The frame matches that 3:4 ratio, so the face, upper body and laptop are all visible at every viewport width, and `object-position: center 25%` keeps the focal point high if the image is ever shown in a shorter frame.

The file is large for a web page. It is left untouched to preserve the original, but a web-optimised copy (for example 1200 pixels wide, JPEG quality 85) would cut the download to roughly 200-300 KB and is recommended before publishing.

## Genuine images

- `assets/images/profile/profile.jpg` — Akim's profile photograph, Home page portrait.
- `assets/images/projects/notenest-dashboard.png`, `notenest-checklist.png`, `notenest-mobile.png` — NoteNest screenshots, shown as a three-image gallery in the NoteNest card. The tall mobile capture is capped at 15rem and centred so it does not dominate the card.
- `assets/images/projects/dmi-voting-home.png`, `dmi-voting-results.png`, `dmi-voting-team.png` — DMI Voting System screenshots. The home page spans the media column and the results and team pages sit two-up beneath it.
- `assets/images/projects/tcp-gui_main.png`, `tcp-upload_success.png`, `tcp-download_success.png` — Two-Way TCP File Server/Client screenshots. The main window spans the column and the upload and download success shots sit two-up beneath it.
- `assets/images/projects/event-main.png` — Event Planner Application screenshot.

Every screenshot links to its full-size local PNG in a new tab, keeps its natural aspect ratio, and carries descriptive `alt` text and a short caption. The DMI and TCP galleries switch to a single column at 520px and below.

## Private CV

The complete CV is stored at `assets/docs/Akim-Amini-CV.pdf` for the owner's own use. It contains personal contact information and referee details, so it is **not** part of the public website:

- It is listed in `.gitignore` and must not be committed or uploaded to GitHub.
- There is no **Download My CV** button and no link to the file on any page.
- The file remains on the owner's computer, unmodified.
- The About page contains no CV download, and no private email address, phone number or referee contact details appear in the HTML.

## Known placeholders

- `assets/images/projects/notenest-placeholder.svg`, `flex-placeholder.svg` and `chichewa-placeholder.svg` remain on disk but are no longer referenced by any project card. Flex by Dramin and Chichewa are text-only cards.
- The LinkedIn URL currently uses `ackim-amini-401151327` and needs confirmation.

## Deployment later

The intended GitHub Pages repository is `Akim-Amini.github.io`, which will publish to:

`https://akim-amini.github.io/`

Deployment has **not** been performed. Git has **not** been initialised in this folder.
