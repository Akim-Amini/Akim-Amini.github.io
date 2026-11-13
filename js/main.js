/* ==========================================================================
   Akim Amini — Personal Portfolio
   Shared JavaScript
   --------------------------------------------------------------------------
   This file powers behaviour that is shared by every page:
   - Light/dark theme toggle, saved in localStorage.
   - Manual reduce-motion toggle, alongside the operating-system setting.
   - Responsive mobile navigation.
   - The typing effect (also reused by the Animated Concepts page).
   - Scroll reveal with IntersectionObserver.
   - The back-to-top button.
   - The current year in the footer.
   ========================================================================== */

(function () {
  "use strict";

  var root = document.documentElement;
  var THEME_KEY = "portfolio-theme";
  var MOTION_KEY = "portfolio-motion";

  /* ------------------------------------------------------------------------
     Small shared helpers
     ------------------------------------------------------------------------ */

  /**
   * Returns true when motion should be reduced.
   * The manual choice (reduce-motion / motion-full) takes priority, then the
   * operating-system preference is used as the default.
   */
  function prefersReducedMotion() {
    if (root.classList.contains("motion-full")) {
      return false;
    }

    return root.classList.contains("reduce-motion") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function savePreference(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      /* localStorage can be unavailable in private browsing. The page still works. */
    }
  }

  /* ------------------------------------------------------------------------
     Theme
     ------------------------------------------------------------------------ */
  function applyTheme(theme, save) {
    root.setAttribute("data-theme", theme);

    if (save) {
      savePreference(THEME_KEY, theme);
    }

    var themeColour = document.querySelector('meta[name="theme-color"]');
    if (themeColour) {
      themeColour.setAttribute("content", theme === "light" ? "#F2F6FD" : "#060A14");
    }

    var buttons = document.querySelectorAll("[data-theme-toggle]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute(
        "aria-label",
        theme === "light" ? "Switch to dark theme" : "Switch to light theme"
      );
    }
  }

  function initTheme() {
    var current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
    applyTheme(current, false);

    var buttons = document.querySelectorAll("[data-theme-toggle]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
        applyTheme(next, true);
      });
    }
  }

  /* ------------------------------------------------------------------------
     Motion preference
     ------------------------------------------------------------------------ */
  function applyMotionPreference(reduced, save) {
    root.classList.toggle("reduce-motion", reduced);
    root.classList.toggle("motion-full", !reduced);

    if (save) {
      savePreference(MOTION_KEY, reduced ? "reduced" : "full");
    }

    var buttons = document.querySelectorAll("[data-motion-toggle]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("aria-pressed", String(reduced));
      buttons[i].setAttribute(
        "aria-label",
        reduced ? "Enable animations and motion" : "Reduce animations and motion"
      );
    }

    /* Other scripts listen for this event so they can react immediately. */
    document.dispatchEvent(new CustomEvent("portfolio:motionchange"));
  }

  function initMotionPreference() {
    var saved = null;

    try {
      saved = window.localStorage.getItem(MOTION_KEY);
    } catch (error) {
      saved = null;
    }

    var reduced;

    if (saved === "reduced") {
      reduced = true;
    } else if (saved === "full") {
      reduced = false;
    } else {
      reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    applyMotionPreference(reduced, false);

    var buttons = document.querySelectorAll("[data-motion-toggle]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        applyMotionPreference(!root.classList.contains("reduce-motion"), true);
      });
    }
  }

  /* ------------------------------------------------------------------------
     Mobile navigation
     ------------------------------------------------------------------------ */
  function initNavigation() {
    var navToggle = document.querySelector(".nav-toggle");
    var primaryNav = document.querySelector("#primary-nav");

    if (!navToggle || !primaryNav) {
      return;
    }

    function setNavigationState(isOpen) {
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      primaryNav.classList.toggle("is-open", isOpen);
      document.body.classList.toggle("nav-open", isOpen);
    }

    navToggle.addEventListener("click", function () {
      var isOpen = navToggle.getAttribute("aria-expanded") === "true";
      setNavigationState(!isOpen);
    });

    document.addEventListener("keydown", function (event) {
      var isOpen = navToggle.getAttribute("aria-expanded") === "true";

      if (event.key === "Escape" && isOpen) {
        setNavigationState(false);
        navToggle.focus();
      }
    });

    var desktopQuery = window.matchMedia("(min-width: 821px)");

    desktopQuery.addEventListener("change", function (event) {
      if (event.matches) {
        setNavigationState(false);
      }
    });
  }

  /* ------------------------------------------------------------------------
     Typing effect
     ------------------------------------------------------------------------ */

  /**
   * Types, pauses and deletes a list of phrases inside one element.
   * It is exposed on window so the Animated Concepts page can reuse it.
   *
   * @param {HTMLElement} element  Where the text is written.
   * @param {string[]} phrases     The phrases to rotate through.
   * @param {object} [options]     Optional speed settings.
   * @returns {{restart: Function, setPhrase: Function}}
   */
  function createTypingEffect(element, phrases, options) {
    var settings = options || {};
    var typeSpeed = settings.typeSpeed || 75;
    var deleteSpeed = settings.deleteSpeed || 40;
    var pause = settings.pause || 1500;
    var startDelay = settings.startDelay || 350;

    var phraseIndex = 0;
    var characterIndex = 0;
    var deleting = false;
    var timer = null;

    function clearTimer() {
      if (timer !== null) {
        window.clearTimeout(timer);
        timer = null;
      }
    }

    function showFullPhrase() {
      element.textContent = phrases[phraseIndex];
    }

    function step() {
      if (prefersReducedMotion()) {
        clearTimer();
        showFullPhrase();
        return;
      }

      var phrase = phrases[phraseIndex];

      if (!deleting) {
        characterIndex = characterIndex + 1;
        element.textContent = phrase.slice(0, characterIndex);

        if (characterIndex === phrase.length) {
          deleting = true;
          timer = window.setTimeout(step, pause);
          return;
        }

        timer = window.setTimeout(step, typeSpeed);
        return;
      }

      characterIndex = characterIndex - 1;
      element.textContent = phrase.slice(0, characterIndex);

      if (characterIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timer = window.setTimeout(step, typeSpeed * 2);
        return;
      }

      timer = window.setTimeout(step, deleteSpeed);
    }

    function start() {
      clearTimer();
      characterIndex = 0;
      deleting = false;

      if (prefersReducedMotion()) {
        showFullPhrase();
        return;
      }

      element.textContent = "";
      timer = window.setTimeout(step, startDelay);
    }

    document.addEventListener("portfolio:motionchange", function () {
      if (prefersReducedMotion()) {
        clearTimer();
        showFullPhrase();
      } else {
        start();
      }
    });

    start();

    return {
      restart: start,
      setPhrase: function (index) {
        if (index < 0 || index >= phrases.length) {
          return;
        }
        phraseIndex = index;
        start();
      }
    };
  }

  window.createTypingEffect = createTypingEffect;
  window.portfolioPrefersReducedMotion = prefersReducedMotion;

  function initHomeTyping() {
    var element = document.getElementById("typed-text");

    if (!element) {
      return;
    }

    createTypingEffect(element, [
      "Computer Science Student",
      "Aspiring Software Developer",
      "Technology Enthusiast"
    ]);
  }

  /* ------------------------------------------------------------------------
     Scroll reveal
     ------------------------------------------------------------------------ */
  function initScrollReveal() {
    var items = document.querySelectorAll(".reveal");

    if (!items.length) {
      return;
    }

    function revealAll() {
      for (var i = 0; i < items.length; i++) {
        items[i].classList.add("is-visible");
      }
    }

    if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
      revealAll();
    } else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: "0px 0px -48px 0px"
      });

      for (var i = 0; i < items.length; i++) {
        observer.observe(items[i]);
      }
    }

    document.addEventListener("portfolio:motionchange", function () {
      if (prefersReducedMotion()) {
        revealAll();
      }
    });
  }

  /* ------------------------------------------------------------------------
     Back to top
     ------------------------------------------------------------------------ */
  function initBackToTop() {
    var button = document.querySelector(".back-to-top");

    if (!button) {
      return;
    }

    function updateVisibility() {
      button.classList.toggle("is-visible", window.scrollY > 420);
    }

    window.addEventListener("scroll", updateVisibility, { passive: true });
    updateVisibility();

    button.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? "auto" : "smooth"
      });
    });
  }

  /* ------------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------------ */
  function initFooterYear() {
    var yearElement = document.querySelector("#year");

    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  /* ------------------------------------------------------------------------
     Start everything
     ------------------------------------------------------------------------ */
  initTheme();
  initMotionPreference();
  initNavigation();
  initHomeTyping();
  initScrollReveal();
  initBackToTop();
  initFooterYear();
})();
