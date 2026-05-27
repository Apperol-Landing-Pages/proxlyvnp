const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const headerBar = document.querySelector(".header-bar");

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

const contactForm = document.querySelector(".contact-form");
const formModal = document.getElementById("formModal");
const formModalIcon = document.getElementById("formModalIcon");
const formModalTitle = document.getElementById("formModalTitle");
const formModalText = document.getElementById("formModalText");
const formModalClose = document.getElementById("formModalClose");
const contactSubmit = document.querySelector(".contact-submit");

function showFormModal(type) {
    if (!formModal || !formModalIcon || !formModalTitle || !formModalText) return;

    const isSuccess = type === "success";

    formModalIcon.textContent = isSuccess ? "✓" : "!";
    formModalIcon.classList.toggle("is-error", !isSuccess);

    formModalTitle.textContent = isSuccess ? "Message sent" : "Message not sent";
    formModalText.textContent = isSuccess
        ? "Thank you! Your message has been sent to support."
        : "Something went wrong. Please try again in a moment.";

    formModal.classList.add("is-active");
    formModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeFormModal() {
    if (!formModal) return;

    formModal.classList.remove("is-active");
    formModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (contactSubmit) {
            contactSubmit.disabled = true;
            contactSubmit.textContent = "Sending...";
        }

        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            const result = await response.json();

            if (response.ok && result.success) {
                contactForm.reset();
                showFormModal("success");
            } else {
                showFormModal("error");
            }
        } catch (error) {
            showFormModal("error");
        } finally {
            if (contactSubmit) {
                contactSubmit.disabled = false;
                contactSubmit.textContent = "Send Message";
            }
        }
    });
}

if (formModalClose) {
    formModalClose.addEventListener("click", closeFormModal);
}

if (formModal) {
    formModal.addEventListener("click", (event) => {
        if (event.target.classList.contains("form-modal__overlay")) {
            closeFormModal();
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeFormModal();
    }
});
