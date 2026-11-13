/* ==========================================================================
   Akim Amini — Personal Portfolio
   Animated Concepts page JavaScript
   --------------------------------------------------------------------------
   This file is loaded only on animations.html. It makes the three main
   demonstrations interactive:
   - Typing text demo with a phrase selector and replay button.
   - Scroll reveal demo with a reset/replay button.
   - Keyframe animation demo with a pause/resume button.

   The typing function itself lives in main.js so the home page and this page
   share the same code.
   ========================================================================== */

(function () {
  "use strict";

  function prefersReducedMotion() {
    if (typeof window.portfolioPrefersReducedMotion === "function") {
      return window.portfolioPrefersReducedMotion();
    }
    return false;
  }

  /* ------------------------------------------------------------------------
     1. Typing demo
     ------------------------------------------------------------------------ */
  var typedOutput = document.getElementById("demo-typed-text");
  var replayButton = document.getElementById("typing-replay");
  var phraseSelect = document.getElementById("typing-phrase");
  var typingControl = null;

  if (typedOutput && typeof window.createTypingEffect === "function") {
    typingControl = window.createTypingEffect(typedOutput, [
      "Computer Science Student",
      "Aspiring Software Developer",
      "Technology Enthusiast"
    ]);

    if (replayButton) {
      replayButton.addEventListener("click", function () {
        typingControl.restart();
      });
    }

    if (phraseSelect) {
      phraseSelect.addEventListener("change", function () {
        typingControl.setPhrase(Number(phraseSelect.value));
      });
    }
  }

  /* ------------------------------------------------------------------------
     2. Scroll reveal demo
     ------------------------------------------------------------------------ */
  var revealDemo = document.getElementById("reveal-demo");
  var revealReplay = document.getElementById("reveal-replay");

  if (revealDemo) {
    var demoItems = revealDemo.querySelectorAll(".reveal-demo-item");
    var demoObserver = null;

    function showAllDemoItems() {
      for (var i = 0; i < demoItems.length; i++) {
        demoItems[i].classList.add("is-visible");
      }
    }

    function observeDemoItems() {
      if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
        showAllDemoItems();
        return;
      }

      demoObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            demoObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });

      for (var i = 0; i < demoItems.length; i++) {
        demoObserver.observe(demoItems[i]);
      }
    }

    observeDemoItems();

    if (revealReplay) {
      revealReplay.addEventListener("click", function () {
        if (demoObserver) {
          demoObserver.disconnect();
          demoObserver = null;
        }

        for (var i = 0; i < demoItems.length; i++) {
          demoItems[i].classList.remove("is-visible");
        }

        /* Reading offsetWidth forces the browser to apply the hidden state. */
        void revealDemo.offsetWidth;

        observeDemoItems();
        revealDemo.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "center"
        });
      });
    }
  }

  /* ------------------------------------------------------------------------
     3. Keyframe animation demo
     ------------------------------------------------------------------------ */
  var keyframeDemo = document.getElementById("keyframe-demo");
  var pauseButton = document.getElementById("keyframe-pause");

  if (keyframeDemo && pauseButton) {
    pauseButton.addEventListener("click", function () {
      var paused = keyframeDemo.classList.toggle("is-paused");
      pauseButton.textContent = paused ? "Resume animation" : "Pause animation";
      pauseButton.setAttribute("aria-pressed", String(paused));
    });
  }
})();
