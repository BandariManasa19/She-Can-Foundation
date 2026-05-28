(() => {
    const toast = () => document.getElementById('toast');

    function showMessage(msg = 'Thank you for supporting She Can Foundation!') {
        const el = toast();
        if (!el) {
            alert(msg);
            return;
        }
        el.textContent = msg;
        el.classList.add('show');
        clearTimeout(el._hideTimeout);
        el._hideTimeout = setTimeout(() => el.classList.remove('show'), 3500);
    }

    document.addEventListener('DOMContentLoaded', () => {
        // simple student-made site: no theme cycling
        const title = document.getElementById('site-title');
        if (title) title.style.cursor = 'default';
    });

    // expose showMessage globally for inline onclick in HTML
    window.showMessage = showMessage;
})();

// Scroll to contact form when user clicks primary join button
document.addEventListener('DOMContentLoaded', () => {
    const joinBtn = document.getElementById('join-btn');
    if (joinBtn) {
        joinBtn.addEventListener('click', () => {
            const contact = document.getElementById('contact');
            if (contact) contact.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

function contactSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const msg = document.getElementById('contact-message').value.trim();
    if (!name || !email || !msg) {
        showMessage('Please complete all fields.');
        return false;
    }
    const endpoint = window.FORM_ENDPOINT || '';
    if (endpoint) {
        // send data to provided form endpoint (e.g., Formspree)
        fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message: msg })
        }).then(res => {
            if (res.ok) {
                showMessage('Thanks ' + name.split(' ')[0] + '! Message sent.');
                document.getElementById('contact-form').reset();
            } else {
                showMessage('Submission failed — please try again later.');
            }
        }).catch(() => showMessage('Submission failed — please try again later.'));
    } else {
        // Basic fake-submit: show toast and reset form
        showMessage('Thanks ' + name.split(' ')[0] + '! We will contact you soon.');
        document.getElementById('contact-form').reset();
    }
    return false;
}
