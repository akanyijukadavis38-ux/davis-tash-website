/* =========================================================
   DAVIS TASH
   Main JavaScript
   Digital Services & Creative Solutions
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".main-navigation");
    const navLinks = document.querySelectorAll(".nav-link");

    const header = document.querySelector(".site-header");

    const contactForm = document.getElementById("contactForm");

    const footerYear = document.querySelector(".footer-bottom-container p");


    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navigation.classList.toggle("nav-open");

            menuToggle.classList.toggle("menu-open", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            /* Change hamburger icon */
            const icon = menuToggle.querySelector("i");

            if (icon) {

                if (isOpen) {

                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");

                } else {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            }

        });


        /* Close menu after clicking a navigation link */

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navigation.classList.remove("nav-open");

                menuToggle.classList.remove("menu-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon = menuToggle.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            });

        });

    }


    /* =====================================================
       SMOOTH SCROLLING
    ====================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length < 2
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       HEADER SCROLL EFFECT
    ====================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 30) {

            header.classList.add("header-scrolled");

        } else {

            header.classList.remove("header-scrolled");

        }

    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       ACTIVE NAVIGATION LINK
    ====================================================== */

    const sections = document.querySelectorAll(
        "main section[id]"
    );


    function updateActiveNavigation() {

        if (!sections.length || !navLinks.length) {
            return;
        }

        const scrollPosition =
            window.scrollY +
            (header ? header.offsetHeight : 0) +
            150;

        let currentSection = "home";

        sections.forEach(section => {

            if (
                scrollPosition >= section.offsetTop
            ) {

                currentSection = section.id;

            }

        });


        navLinks.forEach(link => {

            const linkTarget =
                link.getAttribute("href");

            if (linkTarget === `#${currentSection}`) {

                link.classList.add("active");

            } else {

                link.classList.remove("active");

            }

        });

    }

    updateActiveNavigation();

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    /* =====================================================
       CONTACT FORM
       SENDS PROJECT REQUEST DIRECTLY TO WHATSAPP
    ====================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const nameInput =
                    document.getElementById("name");

                const serviceInput =
                    document.getElementById("service");

                const messageInput =
                    document.getElementById("message");


                if (
                    !nameInput ||
                    !serviceInput ||
                    !messageInput
                ) {
                    return;
                }


                const name =
                    nameInput.value.trim();

                const service =
                    serviceInput.options[
                        serviceInput.selectedIndex
                    ].text;

                const message =
                    messageInput.value.trim();


                /* Basic validation */

                if (!name) {

                    alert("Please enter your name.");

                    nameInput.focus();

                    return;

                }


                if (!serviceInput.value) {

                    alert("Please select the service you need.");

                    serviceInput.focus();

                    return;

                }


                if (!message) {

                    alert("Please tell us about your project.");

                    messageInput.focus();

                    return;

                }


                /* WhatsApp message */

                const whatsappMessage =
`Hello Davis Tash 👋

I would like to request a digital service.

Name: ${name}

Service Needed:
${service}

Project Details:
${message}

I would like to discuss this project with you. Thank you.`;


                /* Davis Tash WhatsApp number */

                const whatsappNumber =
                    "256704784556";


                const whatsappURL =
                    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        whatsappMessage
                    )}`;


                /* Change button temporarily */

                const submitButton =
                    contactForm.querySelector(
                        ".form-submit-btn"
                    );

                const originalButtonHTML =
                    submitButton
                        ? submitButton.innerHTML
                        : "";


                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.innerHTML =
                        `
                        <span>Opening WhatsApp...</span>
                        <i class="fa-brands fa-whatsapp"></i>
                        `;

                }


                /* Open WhatsApp */

                window.open(
                    whatsappURL,
                    "_blank",
                    "noopener,noreferrer"
                );


                /* Reset form */

                contactForm.reset();


                /* Restore button */

                setTimeout(() => {

                    if (submitButton) {

                        submitButton.disabled = false;

                        submitButton.innerHTML =
                            originalButtonHTML;

                    }

                }, 1500);

            }
        );

    }


    /* =====================================================
       REVEAL ANIMATION
    ====================================================== */

    const revealElements = document.querySelectorAll(
        `
        .service-card,
        .benefit-card,
        .intro-item,
        .about-content,
        .about-visual,
        .feature-banner-content,
        .cta-box,
        .contact-content,
        .contact-form-wrapper
        `
    );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "reveal-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            element.classList.add(
                "reveal-element"
            );

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "reveal-visible"
            );

        });

    }


    /* =====================================================
       SERVICE LINKS
       Automatically scroll to contact section
    ====================================================== */

    const serviceLinks =
        document.querySelectorAll(
            ".service-link"
        );


    serviceLinks.forEach(link => {

        link.addEventListener("click", () => {

            /*
             * The existing href="#contact"
             * already handles navigation.
             *
             * This section is intentionally left
             * simple so your CSS and HTML remain
             * in control of the layout.
             */

        });

    });


    /* =====================================================
       AUTOMATIC COPYRIGHT YEAR
    ====================================================== */

    if (footerYear) {

        const currentYear =
            new Date().getFullYear();

        footerYear.innerHTML =
            `&copy; ${currentYear} DAVIS TASH. All Rights Reserved.`;

    }


    /* =====================================================
       ESC KEY CLOSES MOBILE MENU
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                navigation &&
                navigation.classList.contains("nav-open")
            ) {

                navigation.classList.remove(
                    "nav-open"
                );

                if (menuToggle) {

                    menuToggle.classList.remove(
                        "menu-open"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    const icon =
                        menuToggle.querySelector("i");

                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }

            }

        }
    );


    /* =====================================================
       PREVENT DOUBLE CLICK ON FORM BUTTON
    ====================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "invalid",
            event => {

                event.target.classList.add(
                    "input-error"
                );

            },
            true
        );


        contactForm.addEventListener(
            "input",
            event => {

                if (
                    event.target.classList.contains(
                        "input-error"
                    )
                ) {

                    event.target.classList.remove(
                        "input-error"
                    );

                }

            }
        );

    }


    /* =====================================================
       PAGE READY
    ====================================================== */

    document.body.classList.add(
        "page-ready"
    );

});