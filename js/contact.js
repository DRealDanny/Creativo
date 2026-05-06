/**
 * ==============================================================
 * CREATIVO CREATES
 * Contact Page Specific Scripts
 * ==============================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    
    /* ----------------------------------------
       CONTACT FORM SUBMIT HANDLER
       NOTE: Replace the fetch URL with your
       actual form endpoint (Formspree etc.)
       ---------------------------------------- */
    const form       = document.getElementById('contactForm');
    const submitBtn  = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitIcon = document.getElementById('submitIcon');

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate required fields
        const required = form.querySelectorAll('[required]');
        let isValid = true;

        required.forEach(field => {
          if (!field.value.trim()) {
            field.style.borderColor = '#ff4d4d';
            isValid = false;
          } else {
            field.style.borderColor = '';
          }
        });

        if (!isValid) return;

        // Loading state
        submitBtn.classList.add('loading');
        submitText.textContent = 'Sending…';

        // Simulate sending (replace with real fetch to your form handler)
        // Example Formspree: fetch('https://formspree.io/f/YOUR_FORM_ID', { method:'POST', body: new FormData(form) })
        await new Promise(resolve => setTimeout(resolve, 1800));

        // Success state
        submitBtn.classList.remove('loading');
        submitBtn.classList.add('success');
        submitText.textContent = 'Message Sent!';
        submitIcon.innerHTML = `<path d="M2 8l4 4 8-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`;

        form.reset();

        // Reset button after 5 seconds
        setTimeout(() => {
          submitBtn.classList.remove('success');
          submitText.textContent = 'Send Message';
          submitIcon.innerHTML = `<path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`;
        }, 5000);
      });

      // Live validation: clear red border on input
      form.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('input', () => {
          field.style.borderColor = '';
        });
      });
    }

});