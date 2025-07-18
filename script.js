// Wait for the DOM to be fully loaded before running scripts
document.addEventListener("DOMContentLoaded", () => {
  // --- Mobile Menu Toggle ---
  const menuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  // Check if menuButton and mobileMenu exist before adding listener
  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      // Change button icon (e.g., to X) when menu is open
      const isOpen = !mobileMenu.classList.contains("hidden");
      menuButton.innerHTML = isOpen
        ? `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>` // X icon
        : `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>`; // Menu icon
    });
  } else {
    console.error("Mobile menu button or menu container not found.");
  }

  // --- Close Mobile Menu on Link Click ---
  // Select all links within the mobile menu AND the main nav for consistency
  const allNavLinks = document.querySelectorAll(
    'header nav a[href^="#"], #mobile-menu a[href^="#"]'
  );

  allNavLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Only close mobile menu if it's open and the click was on a mobile link
      if (
        mobileMenu &&
        !mobileMenu.classList.contains("hidden") &&
        link.closest("#mobile-menu")
      ) {
        mobileMenu.classList.add("hidden");
        // Reset button icon if menuButton exists
        if (menuButton) {
          menuButton.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>`;
        }
      }

      // Smooth scroll logic (optional enhancement if CSS `scroll-smooth` isn't enough)
      // const targetId = link.getAttribute('href');
      // const targetElement = document.querySelector(targetId);
      // if (targetElement) {
      //    // e.preventDefault(); // Prevent default jump if you handle scroll manually
      //    // targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' }); // More specific scroll
      // }
    });
  });

  // --- Set Current Year in Footer ---
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  } else {
    console.error("Element with ID 'current-year' not found.");
  }

  // --- Prevent Form Submission (Example) ---
  const form = document.getElementById("contact-form"); // Use the form's ID
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent actual submission

      const submitButton = form.querySelector('button[type="submit"]');

      // Check if submitButton exists before modifying it
      if (submitButton) {
        const originalText = submitButton.textContent;
        submitButton.textContent = "Sent! (Demo)";
        submitButton.disabled = true;

        // Use a more user-friendly notification instead of alert if possible
        // For this example, we'll stick to alert for simplicity.
        setTimeout(() => {
          alert("Form submission is disabled in this demo."); // Inform the user
          submitButton.textContent = originalText;
          submitButton.disabled = false;
          // form.reset(); // Uncomment to clear form after fake submission
        }, 1500);
      } else {
        console.error("Submit button not found within the form.");
        alert("Form submission is disabled in this demo."); // Still inform user
      }
    });
  } else {
    console.error("Contact form with ID 'contact-form' not found.");
  }
}); // End of DOMContentLoaded listener
