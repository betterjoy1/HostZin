/* HostZin Eco Tech Vanilla Javascript */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initContactForm();
  initFaqAccordion();
});

/**
 * Mobile Navigation Menu Handler
 */
function initMobileNavigation() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  // Toggle active class and aria-expanded attribute
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && e.target !== toggleBtn) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('active');
    }
  });

  // Close menu on pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('active');
      toggleBtn.focus();
    }
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('active');
    });
  });
}

/**
 * Progressive Enhancement for FAQ Accordion
 * Ensures only one FAQ item is open at a time (accordion style)
 */
function initFaqAccordion() {
  const faqDetails = document.querySelectorAll('.faq-item');
  
  faqDetails.forEach(details => {
    details.addEventListener('toggle', (e) => {
      // Only act when opening
      if (details.open) {
        faqDetails.forEach(otherDetails => {
          if (otherDetails !== details && otherDetails.open) {
            otherDetails.open = false;
          }
        });
      }
    });
  });
}

/**
 * Contact Form Progressive Enhancement
 * Displays a nice success message without reloading the page
 */
function initContactForm() {
  const form = document.querySelector('.contact-form-element');
  const feedback = document.querySelector('.form-feedback');
  
  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate successful client-side submission
    feedback.textContent = 'Thank you for your message! Our hosting experts will respond within 24 hours.';
    feedback.className = 'form-feedback success';
    feedback.style.display = 'block';
    
    form.reset();
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}
