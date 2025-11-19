/*
    nav-load.js

    Purpose: Load the navbar fragment into the page and wire the
    hamburger/mobile-menu behavior after injection.

    Steps:
        1) Wait for DOMContentLoaded.
        2) Find the `#navbar-container` element on the page.
        3) Fetch `navbar.html` if the container exists.
        4) Insert the returned HTML into the container.
        5) After insertion, locate the hamburger, menu and navbar elements
             and attach the click handler that toggles the mobile menu and
             the `menu-open` class on the navbar for styling.
        6) Handle fetch errors and log them to the console.
*/

document.addEventListener("DOMContentLoaded", function () {
  // Step 2: find the container for the navbar
  const navbarContainer = document.getElementById("navbar-container");

  // If no container, nothing to do
  if (!navbarContainer) return;

  // Step 3: fetch navbar HTML fragment
  fetch("navbar.html")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load navbar");
      return response.text();
    })
    .then((html) => {
      // Step 4: insert the navbar HTML into the page
      navbarContainer.innerHTML = html;

      // Step 5: wire up the hamburger/menu behavior after injection
      const hamburger = document.getElementById("hamburger");
      const navMenu = document.getElementById("nav-menu");
      const navbarEl = navbarContainer.querySelector(".navbar");

      if (hamburger && navMenu) {
        hamburger.addEventListener("click", function () {
          const opened = navMenu.classList.toggle("active");
          hamburger.classList.toggle("active");

          // keep styling logic in CSS by toggling `menu-open` on the navbar
          if (navbarEl) {
            navbarEl.classList.toggle("menu-open", opened);
            // update aria-expanded for screen readers
            const expanded = hamburger.getAttribute("aria-expanded") === "true";
            hamburger.setAttribute("aria-expanded", String(!expanded));
          }
        });
      }
      // Step 5b: wire up any submenu toggles for mobile (accordion behavior)
      const submenuParents = navbarContainer.querySelectorAll(".has-submenu");
      submenuParents.forEach((parent) => {
        const trigger = parent.querySelector(".submenu-toggle, a, button");
        const submenu = parent.querySelector(".submenu");
        if (!trigger || !submenu) return;
        if (trigger.dataset.submenuBound === "true") return; // avoid double-binding

        // ensure accessible state
        trigger.setAttribute("aria-expanded", "false");

        // toggle on click only for mobile widths
        const toggleHandler = (e) => {
          if (window.matchMedia("(max-width: 800px)").matches) {
            e.preventDefault();
            const isOpen = parent.classList.toggle("open");
            trigger.setAttribute("aria-expanded", String(isOpen));
          }
        };

        trigger.addEventListener("click", toggleHandler);
        trigger.addEventListener("keydown", (ev) => {
          if (ev.key === "Enter" || ev.key === " ") {
            toggleHandler(ev);
          }
        });
        trigger.dataset.submenuBound = "true";
      });

      // Close menus when clicking outside of the navbar (mobile & desktop)
      const closeAll = () => {
        // close mobile nav
        if (navMenu && navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
        }
        if (hamburger && hamburger.classList.contains("active")) {
          hamburger.classList.remove("active");
          hamburger.setAttribute("aria-expanded", "false");
        }
        if (navbarEl && navbarEl.classList.contains("menu-open")) {
          navbarEl.classList.remove("menu-open");
        }
        // close any open submenus
        submenuParents.forEach((p) => {
          p.classList.remove("open");
          const t = p.querySelector(".submenu-toggle, a, button");
          if (t) t.setAttribute("aria-expanded", "false");
        });
      };

      // click outside to close
      document.addEventListener("click", function (e) {
        // if click is inside the navbar element, do nothing
        if (navbarEl && navbarEl.contains(e.target)) return;
        // otherwise close
        closeAll();
      });

      // Escape key closes menus
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" || e.key === "Esc") {
          closeAll();
        }
      });

      // Mobile scroll: hide navbar on scroll down, show on scroll up
      let lastScrollY = window.scrollY;
      let ticking = false;
      function handleMobileNavbarScroll() {
        if (window.matchMedia("(max-width: 800px)").matches && navbarEl) {
          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY && currentScrollY > 40) {
            navbarEl.classList.add("navbar--hidden");
          } else {
            navbarEl.classList.remove("navbar--hidden");
          }
          lastScrollY = currentScrollY;
        } else if (navbarEl) {
          navbarEl.classList.remove("navbar--hidden");
        }
        ticking = false;
      }
      window.addEventListener("scroll", function () {
        if (!ticking) {
          window.requestAnimationFrame(handleMobileNavbarScroll);
          ticking = true;
        }
      });
      window.addEventListener("resize", function () {
        if (navbarEl && !window.matchMedia("(max-width: 800px)").matches) {
          navbarEl.classList.remove("navbar--hidden");
        }
      });
    })
    .catch((error) => {
      // Step 6: log any error during loading
      console.error("Error loading navbar:", error);
    });
});
