/* ── Scroll-based nav styling ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Hamburger / mobile menu ── */
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
hamburgerBtn.addEventListener('click', () => {
  hamburgerBtn.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburgerBtn.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── Scroll reveal animations ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

/* ── Instantly reveal hero elements ── */
document.querySelectorAll('#hero .reveal').forEach(el => {
  el.classList.add('visible');
});

/* ── Contact form submission ── */
function handleFormSubmit() {
  const required = ['firstName', 'lastName', 'email', 'caseType', 'description'];
  let valid = true;
  required.forEach(id => {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.style.borderColor = 'var(--clr-danger)';
      valid = false;
    } else {
      el.style.borderColor = '';
    }
  });
  if (!valid) return;

  // REPLACE: Wire up your form backend here (Netlify Forms, Formspree, EmailJS, etc.)
  // For Netlify: add name="contact" netlify to the form tag and action="/thank-you"
  // For Formspree: fetch('https://formspree.io/f/YOUR_ID', { method:'POST', ... })

  document.getElementById('formContent').style.display = 'none';
  document.getElementById('formSuccess').classList.add('show');
}

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

/* ── Update footer year automatically ── */
const yearEl = document.querySelector('.footer-copy');
if (yearEl) {
  yearEl.innerHTML = yearEl.innerHTML.replace('2025', new Date().getFullYear());
}
