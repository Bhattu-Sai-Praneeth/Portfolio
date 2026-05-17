/* ═══════════════════════════════════════════════════
   PRELOADER
═══════════════════════════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => {
    const pl = document.getElementById('preloader');
    if (pl) {
      pl.classList.add('hide');
      setTimeout(() => pl.remove(), 600);
    }
  }, 1500);
});

/* ═══════════════════════════════════════════════════
   CURSOR GLOW
═══════════════════════════════════════════════════ */
const glow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', e => {
  if (glow) {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  }
});

/* ═══════════════════════════════════════════════════
   NAV — scroll + mobile toggle
═══════════════════════════════════════════════════ */
const navbar    = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (navbar)    navbar.classList.toggle('scrolled', window.scrollY > 10);
  if (backToTop) backToTop.classList.toggle('show',   window.scrollY > 400);
});

if (backToTop) {
  backToTop.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('.nav-link').forEach(l =>
    l.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

/* ═══════════════════════════════════════════════════
   TYPED ROLE
═══════════════════════════════════════════════════ */
const roles = [
  'DevOps Engineer',
  'Cloud Practitioner',
  'AWS Enthusiast',
  'CI/CD Architect',
  'Kubernetes Explorer',
  'Infrastructure as Code',
  'DevSecOps Practitioner'
];
let roleIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typedRole');

function typeLoop() {
  if (!typedEl) return;
  const current = roles[roleIdx];

  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx  = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 80);
}
setTimeout(typeLoop, 1200);

/* ═══════════════════════════════════════════════════
   AOS INIT + CONTACT FORM
═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 650,
      once: true,
      offset: 80,
      easing: 'ease-out-cubic'
    });
  }

  /* ═══════════════════════════════════════════════════
     CONTACT FORM — opens email client with form data
  ═══════════════════════════════════════════════════ */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn  = contactForm.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;

      // Get form values
      const name    = contactForm.querySelector('input[name="name"]').value.trim();
      const email   = contactForm.querySelector('input[name="email"]').value.trim();
      const message = contactForm.querySelector('textarea[name="message"]').value.trim();

      // Validate form
      if (!name || !email || !message) {
        btn.innerHTML = '<i class="fa-solid fa-exclamation"></i> Fill all fields';
        btn.disabled  = true;
        setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 2000);
        return;
      }

      // Create mailto link with form data
      const recipient = 'saipraneeth.bhattu@gmail.com';
      const subject   = encodeURIComponent(`Portfolio Contact: Message from ${name}`);
      const body      = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;

      btn.innerHTML = '<i class="fa-solid fa-check"></i> Opening email...';
      btn.disabled  = true;

      // Open email client
      window.location.href = mailtoLink;

      // Reset form and button after a short delay
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.disabled  = false;
        contactForm.reset();
      }, 500);
    });
  }
});

/* ═══════════════════════════════════════════════════
   FOOTER YEAR
═══════════════════════════════════════════════════ */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ═══════════════════════════════════════════════════
   ACTIVE NAV LINK on scroll
═══════════════════════════════════════════════════ */
const sections  = document.querySelectorAll('section[id], header[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
