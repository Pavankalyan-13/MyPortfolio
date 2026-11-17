/* ======================================
   AKULA PAVAN KALYAN REDDY
   PORTFOLIO JAVASCRIPT
====================================== */


/* MOBILE NAVIGATION */

const menuToggle = document.getElementById("menuToggle");

const mainNavigation = document.getElementById("mainNavigation");

const navigationLinks = document.querySelectorAll(".nav-link");


if (menuToggle && mainNavigation) {

    menuToggle.addEventListener("click", function () {

        const isOpen = mainNavigation.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

    });


    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            mainNavigation.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute("aria-label", "Open navigation");

        });

    });


    document.addEventListener("click", function (event) {

        const clickedInsideMenu = mainNavigation.contains(event.target);

        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {

            mainNavigation.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute("aria-label", "Open navigation");

        }

    });

}


/* AUTOMATIC COPYRIGHT YEAR */

const currentYear = document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* ACTIVE NAVIGATION LINK */

const pageSections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    const currentSection = entry.target.id;

                    navigationLinks.forEach(function (link) {

                        link.classList.remove("active");

                        if (link.getAttribute("href") === "#" + currentSection) {

                            link.classList.add("active");

                        }

                    });

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