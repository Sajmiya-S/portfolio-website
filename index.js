// Scroll reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // Active nav on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
      });
      navLinks.forEach(l => {
        l.style.color = l.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
      });
    });

    document.getElementById("contact-form").addEventListener("submit", async function(e) {
        e.preventDefault();

        const form = e.target;
        const status = document.getElementById("form-status");

        const data = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/mvzdlqwp", {
            method: "POST",
            body: data,
            headers: {
                'Accept': 'application/json'
            }
            });

            if (response.ok) {
            status.innerHTML = "✅ Message sent successfully!";
            form.reset();
            } else {
            status.innerHTML = "❌ Something went wrong. Try again.";
            }

        } catch (error) {
            status.innerHTML = "❌ Network error. Try again.";
        }
    });