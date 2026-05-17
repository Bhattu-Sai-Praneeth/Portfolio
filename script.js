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

(async function logVisitor() {
  const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbwPOo8O5XPwJPNIlNKQgybJ6o70SCR4dEZPCEbjU5gm_WYLica3XyJ4rmc1Yifo7oaL/exec';
  console.log('🔍 Enhanced logVisitor (accuracy-focused) started');
  async function fetchIPData() {
    try {
      const res = await fetch('https://ipapi.co/json/');
      if (!res.ok) throw new Error('IP lookup not ok');
      const j = await res.json();
      console.log('🌐 IP lookup success', j);
      return {
        ip: j.ip || '',
        org: j.org || j.org || '',
        country_name: j.country_name || '',
        region: j.region || '',
        city: j.city || '',
        postal: j.postal || '',
        timezone: j.timezone || '',
        latitude: j.latitude ?? j.lat ?? null,
        longitude: j.longitude ?? j.lon ?? null
      };
    } catch (err) {
      console.warn('⚠️ IP lookup failed:', err);
      return {
        ip: '',
        org: '',
        country_name: '',
        region: '',
        city: '',
        postal: '',
        timezone: '',
        latitude: null,
        longitude: null
      };
    }
  }
  async function getHighAccuracyPosition({
    desiredAccuracyMeters = 30,
    maxSamples = 6,
    maxWaitMS = 15000
  } = {}) {
    if (!('geolocation' in navigator)) {
      throw new Error('Geolocation API not available');
    }
    let permState = null;
    try {
      if (navigator.permissions && navigator.permissions.query) {
        const p = await navigator.permissions.query({ name: 'geolocation' });
        permState = p.state;
        console.log('🔐 Geolocation permission state:', permState);
      }
    } catch (e) {
    }
    return new Promise((resolve, reject) => {
      const samples = [];
      let watchId = null;
      let finished = false;
      function finalize() {
        if (finished) return;
        finished = true;
        if (watchId !== null) navigator.geolocation.clearWatch(watchId);
        if (samples.length === 0) {
          reject(new Error('No position samples obtained'));
          return;
        }
        samples.sort((a, b) => (a.coords.accuracy ?? 1e9) - (b.coords.accuracy ?? 1e9));
        resolve(samples[0]);
      }
      const overallTimer = setTimeout(() => {
        console.warn('⏱ getHighAccuracyPosition timed out; returning best sample so far (if any).');
        finalize();
      }, maxWaitMS);
      try {
        watchId = navigator.geolocation.watchPosition(
          pos => {
            console.log('📡 sample:', {
              lat: pos.coords.latitude,
              lon: pos.coords.longitude,
              accuracy: pos.coords.accuracy,
              timestamp: pos.timestamp
            });
            samples.push(pos);
            const bestAccuracy = Math.min(...samples.map(s => s.coords.accuracy ?? 1e9));
            if (bestAccuracy <= desiredAccuracyMeters || samples.length >= maxSamples) {
              clearTimeout(overallTimer);
              finalize();
            }
          },
          err => {
            console.warn('⚠️ watchPosition error:', err);
            if (err.code === err.PERMISSION_DENIED) {
              clearTimeout(overallTimer);
              if (watchId !== null) navigator.geolocation.clearWatch(watchId);
              reject(err);
            }
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: maxWaitMS
          }
        );
      } catch (e) {
        clearTimeout(overallTimer);
        reject(e);
      }
    });
  }
  let coords = null;
  try {
    const sample = await getHighAccuracyPosition({
      desiredAccuracyMeters: 30,
      maxSamples: 8,
      maxWaitMS: 20000
    });
    coords = {
      lat: sample.coords.latitude,
      lon: sample.coords.longitude,
      accuracy: sample.coords.accuracy,
      source: 'geolocation'
    };
    console.log('📍 Best geolocation sample:', coords);
  } catch (err) {
    console.warn('⚠️ High-accuracy geolocation failed or denied:', err);
    const ipData = await fetchIPData();
    if (ipData.latitude != null && ipData.longitude != null) {
      coords = {
        lat: ipData.latitude,
        lon: ipData.longitude,
        accuracy: 5000,
        source: 'ip'
      };
    } else {
      coords = { lat: null, lon: null, accuracy: null, source: 'none' };
    }
  }
  const ipData = await fetchIPData();
  async function reverseGeocode(lat, lon) {
    if (lat == null || lon == null) return null;
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
      const res = await fetch(url, { headers: { 'User-Agent': 'MyApp/1.0 (contact@example.com)' } });
      if (!res.ok) throw new Error('Reverse geocode failed');
      const data = await res.json();
      return data.display_name || null;
    } catch (err) {
      console.warn('⚠️ Reverse geocode failed:', err);
      return null;
    }
  }
  const humanAddress = await reverseGeocode(coords.lat, coords.lon);
  if (humanAddress) console.log('🏷 Reverse geocoded address:', humanAddress);
  const payload = {
    timestamp: new Date().toISOString(),
    ip: ipData.ip,
    isp: ipData.org,
    country: ipData.country_name,
    region: ipData.region,
    city: ipData.city,
    postal: ipData.postal,
    timezone: ipData.timezone,
    lat: coords.lat ?? ipData.latitude,
    lon: coords.lon ?? ipData.longitude,
    coordAccuracyMeters: coords.accuracy ?? null,
    coordSource: coords.source,
    address: humanAddress ?? null,
    browser: (function() {
      const ua = navigator.userAgent;
      if (ua.includes('Chrome')) return 'Chrome';
      if (ua.includes('Firefox')) return 'Firefox';
      if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
      if (ua.includes('Edge')) return 'Edge';
      return 'Other';
    })(),
    os: (function() {
      const ua = navigator.userAgent;
      if (ua.includes('Windows')) return 'Windows';
      if (ua.includes('Mac')) return 'MacOS';
      if (ua.includes('Linux')) return 'Linux';
      if (/Android/i.test(ua)) return 'Android';
      if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
      return 'Other';
    })(),
    device: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
    screenResolution: `${screen.width}x${screen.height}`,
    language: navigator.language,
    referrer: document.referrer || 'Direct',
    userAgent: navigator.userAgent
  };
  console.log('🚀 Sending accurate payload:', payload);
  let retries = 3;
  while (retries > 0) {
    try {
      await fetch(WEBAPP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      console.log('✅ Visitor log sent');
      break;
    } catch (err) {
      console.warn(`❌ Visitor log failed (${retries} retries left)`, err);
      retries--;
      if (retries > 0) await new Promise(r => setTimeout(r, 1000));
    }
  }
  window.addEventListener('load', () => {
    setTimeout(() => {
      try {
        const perf = performance.getEntriesByType('navigation')[0];
        console.log('🚀 Page Performance:', {
          loadTime: perf.loadEventEnd - perf.loadEventStart,
          domContentLoaded: perf.domContentLoadedEventEnd - perf.domContentLoadedEventStart,
          totalTime: perf.loadEventEnd - perf.fetchStart
        });
      } catch (e) {
        console.warn('⚠️ Performance data not available:', e);
      }
    }, 1000);
  });
})();

window.addEventListener('load', () => {
  setTimeout(() => {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('🚀 Page Performance:', {
      loadTime: perfData.loadEventEnd - perfData.loadEventStart,
      domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
      totalTime: perfData.loadEventEnd - perfData.fetchStart
    });
  }, 1000);
});