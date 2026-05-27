const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const headerBar = document.querySelector(".header-bar");
const placeholderLinks = document.querySelectorAll("[data-placeholder='true']");

function openMenu() {
    if (!menuToggle || !mobileMenu || !headerBar) {
        return;
    }

    headerBar.classList.add("menu-open");
    mobileMenu.setAttribute("aria-hidden", "false");
    menuToggle.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
}

function closeMenu() {
    if (!menuToggle || !mobileMenu || !headerBar) {
        return;
    }

    headerBar.classList.remove("menu-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
}

if (menuToggle && mobileMenu && headerBar) {
    menuToggle.addEventListener("click", () => {
        if (headerBar.classList.contains("menu-open")) {
            closeMenu();
            return;
        }

        openMenu();
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
        if (!headerBar.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 960) {
            closeMenu();
        }
    });
}

placeholderLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
    });
});
