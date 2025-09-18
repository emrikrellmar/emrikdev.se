(() => {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz3_MJzSGV9gE_1-Dttw5C9uvxuAbVfHNeUM6-38FWvNOBE-AzUkPVj0ZyhirWSZ7BNhQ/exec'; // TODO: replace with your deployed Apps Script Web App URL

    if (!contactForm || !formStatus) {
        return;
    }

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        formStatus.textContent = 'Sending...';
        formStatus.className = 'form-status pending';

        try {
            const response = await fetch(scriptURL, {
                method: 'POST',
                body: new FormData(contactForm),
                mode: 'cors'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            contactForm.reset();
            formStatus.textContent = 'Thanks! Your message is on its way.';
            formStatus.className = 'form-status success';
        } catch (error) {
            console.error('Form submission error:', error);
            formStatus.textContent = 'Something went wrong. Email me directly at hello@emrikstudio.com.';
            formStatus.className = 'form-status error';
        }
    });
})();
