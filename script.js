// Wait for the DOM to be fully loaded before running scripts
document.addEventListener("DOMContentLoaded", () => {
  // --- Mobile Menu Toggle ---
  const menuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  // Check if menuButton and mobileMenu exist before adding listener
  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      const isOpen = !mobileMenu.classList.contains("hidden");
      menuButton.innerHTML = isOpen
        ? `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`
        : `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>`;
    });
  } else {
    console.error("Mobile menu button or menu container not found.");
  }

  // --- Close Mobile Menu on Link Click ---
  const allNavLinks = document.querySelectorAll(
    'header nav a[href^="#"], #mobile-menu a[href^="#"]'
  );

  allNavLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (
        mobileMenu &&
        !mobileMenu.classList.contains("hidden") &&
        link.closest("#mobile-menu")
      ) {
        mobileMenu.classList.add("hidden");
        if (menuButton) {
          menuButton.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>`;
        }
      }
    });
  });

  // --- Set Current Year in Footer ---
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  } else {
    console.error("Element with ID 'current-year' not found.");
  }

  // --- Contact Form AJAX Submission ---
  const scriptURL = "https://script.google.com/macros/s/AKfycbwFUF6LtRnPuP7tWx2F8RfREAeo7JdEU86X-A8iWW01p--5c3MpHyc4nnIOwcI-a0XL/exec";
  const form = document.getElementById("contactForm");
  const successModal = document.getElementById("successModal");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.textContent = "Sending...";
        submitButton.disabled = true;
      }

      const formData = new FormData(form);

      try {
        // Send as FormData, NOT JSON!
        await fetch(scriptURL, {
          method: "POST",
          body: formData
        });
        form.reset();
        if (successModal) successModal.classList.remove("hidden");
      } catch (error) {
        alert("Error sending message. Please try again.");
      } finally {
        if (submitButton) {
          submitButton.textContent = "Send";
          submitButton.disabled = false;
        }
      }
    });
  }
});