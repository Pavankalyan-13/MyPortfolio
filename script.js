"use strict";

/* ==========================================
   AKULA PAVAN KALYAN REDDY
   PORTFOLIO JAVASCRIPT
========================================== */


/* ------------------------------------------
   1. SELECT ELEMENTS
------------------------------------------ */

const menuToggle = document.getElementById("menuToggle");

const mainNavigation = document.getElementById("mainNavigation");

const navigationLinks = document.querySelectorAll(".nav-link");

const pageSections = document.querySelectorAll("main section[id]");

const currentYear = document.getElementById("currentYear");


/* ------------------------------------------
   2. MOBILE NAVIGATION
------------------------------------------ */

function closeMobileMenu() {

    if (!menuToggle || !mainNavigation) {
        return;
    }

    mainNavigation.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Open navigation");

}


if (menuToggle && mainNavigation) {

    menuToggle.addEventListener("click", function () {

        const isOpen = mainNavigation.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

    });


    /* Close menu after clicking navigation link */

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            closeMobileMenu();

        });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", function (event) {

        const clickedInsideMenu =
            mainNavigation.contains(event.target);

        const clickedMenuButton =
            menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedMenuButton) {

            closeMobileMenu();

        }

    });


    /* Close menu using Escape key */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeMobileMenu();

            menuToggle.focus();

        }

    });

}


/* ------------------------------------------
   3. AUTOMATIC COPYRIGHT YEAR
------------------------------------------ */

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* ------------------------------------------
   4. ACTIVE NAVIGATION LINK
------------------------------------------ */

function setActiveNavigation(sectionId) {

    navigationLinks.forEach(function (link) {

        const linkTarget = link.getAttribute("href");

        const isActive = linkTarget === "#" + sectionId;

        link.classList.toggle("active", isActive);

    });

}


if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    setActiveNavigation(entry.target.id);

                }

            });

        },

        {
            root: null,

            rootMargin: "-30% 0px -60% 0px",

            threshold: 0
        }

    );


    pageSections.forEach(function (section) {

        sectionObserver.observe(section);

    });

}


/* ------------------------------------------
   5. INITIAL ACTIVE NAVIGATION
------------------------------------------ */

function updateNavigationOnLoad() {

    const currentHash = window.location.hash;

    if (currentHash) {

        const targetSection = document.querySelector(currentHash);

        if (targetSection && targetSection.matches("section[id]")) {

            setActiveNavigation(targetSection.id);

            return;

        }

    }

    setActiveNavigation("home");

}


updateNavigationOnLoad();


/* ------------------------------------------
   6. HANDLE WINDOW RESIZE
------------------------------------------ */

window.addEventListener("resize", function () {

    if (window.innerWidth > 700) {

        closeMobileMenu();

    }

});
