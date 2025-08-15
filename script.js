AOS.init({
  duration: 800,
  offset: 80,
  once: true,
  easing: 'ease-out-cubic',
  anchorPlacement: 'top-bottom'
});

const cursorBlob = document.getElementById('cursor-blob');
const cursorBlur = document.getElementById('cursor-blur');
let mouseX = 0;
let mouseY = 0;
let blobX = 0;
let blobY = 0;
let blurX = 0;
let blurY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateBlob() {
  blobX += (mouseX - blobX) * 0.15;
  blobY += (mouseY - blobY) * 0.15;

  blurX += (mouseX - blurX) * 0.08;
  blurY += (mouseY - blurY) * 0.08;

  cursorBlob.style.left = blobX + 'px';
  cursorBlob.style.top = blobY + 'px';

  cursorBlur.style.left = blurX + 'px';
  cursorBlur.style.top = blurY + 'px';

  requestAnimationFrame(animateBlob);
}

animateBlob();

document.addEventListener('mousedown', () => {
  cursorBlob.style.transform = 'translate(-50%, -50%) scale(0.8)';
  cursorBlob.style.filter = 'blur(30px)';
});

document.addEventListener('mouseup', () => {
  cursorBlob.style.transform = 'translate(-50%, -50%) scale(1)';
  cursorBlob.style.filter = 'blur(40px)';
});

const interactiveElements = document.querySelectorAll('a, button, .skill, .btn');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorBlob.style.width = '400px';
    cursorBlob.style.height = '400px';
    cursorBlob.style.filter = 'blur(50px)';
    cursorBlur.style.opacity = '0.8';
  });

  el.addEventListener('mouseleave', () => {
    cursorBlob.style.width = '300px';
    cursorBlob.style.height = '300px';
    cursorBlob.style.filter = 'blur(40px)';
    cursorBlur.style.opacity = '1';
  });
});

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  setTimeout(() => {
    preloader.style.opacity = '0';
    preloader.style.transform = 'scale(1.1)';

    setTimeout(() => {
      preloader.classList.add("hidden");

      document.body.style.overflow = 'auto';

      const animatedElements = document.querySelectorAll('[data-aos]');
      animatedElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('aos-animate');
        }, index * 100);
      });
    }, 400);
  }, 2000);
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.skill, .about-card, .pub-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navLinksItems = document.querySelectorAll(".nav-link");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  navToggle.classList.toggle("active");

  const icon = navToggle.querySelector('i');
  if (navLinks.classList.contains('open')) {
    icon.className = 'fa-solid fa-times';
    navToggle.style.transform = 'rotate(90deg)';
  } else {
    icon.className = 'fa-solid fa-bars';
    navToggle.style.transform = 'rotate(0deg)';
  }
});

navLinksItems.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("active");
    const icon = navToggle.querySelector('i');
    icon.className = 'fa-solid fa-bars';
    navToggle.style.transform = 'rotate(0deg)';
  });
});

document.addEventListener('click', (e) => {
  if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove("open");
    navToggle.classList.remove("active");
    const icon = navToggle.querySelector('i');
    icon.className = 'fa-solid fa-bars';
    navToggle.style.transform = 'rotate(0deg)';
  }
});

const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");
const storedTheme = localStorage.getItem("theme");

if (storedTheme) {
  root.setAttribute("data-theme", storedTheme);
}

themeBtn.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "" : "light";

  document.body.style.transition = 'background 0.3s ease, color 0.3s ease';

  if (newTheme) {
    root.setAttribute("data-theme", newTheme);
  } else {
    root.removeAttribute("data-theme");
  }

  localStorage.setItem("theme", newTheme);

  setTimeout(() => {
    document.body.style.transition = '';
  }, 300);
});

const backBtn = document.getElementById("backToTop");
let scrollProgress = 0;

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress = (scrollTop / docHeight) * 100;

  const show = scrollTop > 600;
  backBtn.classList.toggle("show", show);

  backBtn.style.background = `conic-gradient(var(--red) ${scrollProgress * 3.6}deg, var(--card) 0deg)`;
});

backBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  backBtn.style.transform = 'translateY(-3px) scale(0.95)';
  setTimeout(() => {
    backBtn.style.transform = '';
  }, 150);
});

function typewriter() {
  const el = document.getElementById("typewriter");
  const text = el.getAttribute("data-text") || "";
  const cursor = '<span class="typewriter-cursor">|</span>';
  let i = 0;

  const style = document.createElement('style');
  style.textContent = `
    .typewriter-cursor {
      animation: blink 1s infinite;
      color: var(--red);
    }
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  function tick() {
    el.innerHTML = text.slice(0, i) + cursor;
    i++;

    if (i <= text.length) {
      setTimeout(tick, 1 + Math.random() * 25); 
    } else {
      setTimeout(() => {
        el.innerHTML = text + cursor;
      }, 500);
    }
  }

  tick();
}

const typewriterEl = document.getElementById("typewriter");
if (typewriterEl) {
  const typewriterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        typewriter();
        typewriterObserver.unobserve(entry.target);
      }
    });
  });
  typewriterObserver.observe(typewriterEl);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const id = this.getAttribute("href");
    if (!id || id === "#") return;

    e.preventDefault();
    const target = document.querySelector(id);

    if (target) {
      const offsetTop = target.offsetTop - 80; 

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });

      history.pushState(null, "", id);

      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      setTimeout(() => target.removeAttribute("tabindex"), 400);

      target.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.3)';
      setTimeout(() => {
        target.style.boxShadow = '';
      }, 1000);
    }
  });
});

const carousel = {
  track: document.querySelector(".carousel-track"),
  slides: Array.from(document.querySelectorAll(".slide")),
  prev: document.querySelector(".carousel-btn.prev"),
  next: document.querySelector(".carousel-btn.next"),
  dotsContainer: document.querySelector(".carousel-dots"),
  index: 0,
  timer: null,
  isPlaying: true,

  init() {
    if (!this.track || !this.slides.length) return;

    this.createDots();
    this.updateCarousel();
    this.bindEvents();
    this.startAutoplay();
  },

  createDots() {
    this.slides.forEach((_, i) => {
      const button = document.createElement("button");
      button.setAttribute("role", "tab");
      button.setAttribute("aria-label", `Go to slide ${i + 1}`);
      button.addEventListener("click", () => this.goTo(i));
      this.dotsContainer.appendChild(button);
    });
  },

  updateCarousel() {
    this.track.style.transform = `translateX(-${this.index * 100}%)`;

    [...this.dotsContainer.children].forEach((btn, i) => {
      btn.classList.toggle("active", i === this.index);
    });

    this.slides.forEach((slide, i) => {
      slide.setAttribute('aria-hidden', i !== this.index);
    });
  },

  goTo(newIndex) {
    this.index = (newIndex + this.slides.length) % this.slides.length;
    this.updateCarousel();
    this.restartAutoplay();

    this.track.style.transition = 'transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1)';
  },

  bindEvents() {
    this.prev.addEventListener("click", () => this.goTo(this.index - 1));
    this.next.addEventListener("click", () => this.goTo(this.index + 1));

    document.addEventListener('keydown', (e) => {
      if (document.activeElement.closest('.carousel')) {
        if (e.key === 'ArrowLeft') this.goTo(this.index - 1);
        if (e.key === 'ArrowRight') this.goTo(this.index + 1);
      }
    });

    let startX = 0;
    let isDragging = false;

    this.track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      this.pauseAutoplay();
    }, { passive: true });

    this.track.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const diff = startX - currentX;

      const resistance = Math.abs(diff) / window.innerWidth;
      this.track.style.transform = `translateX(calc(-${this.index * 100}% - ${diff * 0.5}px))`;
    }, { passive: true });

    this.track.addEventListener("touchend", (e) => {
      if (!isDragging) return;
      isDragging = false;

      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      const threshold = 50;

      if (diff > threshold) {
        this.goTo(this.index + 1);
      } else if (diff < -threshold) {
        this.goTo(this.index - 1);
      } else {
        this.updateCarousel();
      }

      this.startAutoplay();
    });

    this.track.addEventListener('mouseenter', () => this.pauseAutoplay());
    this.track.addEventListener('mouseleave', () => this.startAutoplay());
  },

  startAutoplay() {
    if (!this.isPlaying) return;
    this.pauseAutoplay();
    this.timer = setInterval(() => this.goTo(this.index + 1), 5500);
  },

  pauseAutoplay() {
    clearInterval(this.timer);
  },

  restartAutoplay() {
    this.pauseAutoplay();
    this.startAutoplay();
  }
};

carousel.init();

const form = document.getElementById("contactForm");
if (form) {
  const inputs = form.querySelectorAll('input, textarea');

  inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearErrors);
  });

  function validateField(e) {
    const field = e.target;
    const value = field.value.trim();

    clearFieldError(field);

    if (field.required && !value) {
      showFieldError(field, 'This field is required');
      return false;
    }

    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
      }
    }

    field.classList.add('success');
    return true;
  }

  function showFieldError(field, message) {
    field.classList.add('error');

    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) existingError.remove();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '4px';
    field.parentNode.appendChild(errorDiv);
  }

  function clearFieldError(field) {
    field.classList.remove('error', 'success');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) errorMessage.remove();
  }

  function clearErrors() {
    clearFieldError(this);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let isValid = true;
    inputs.forEach(input => {
      if (!validateField({ target: input })) {
        isValid = false;
      }
    });

    if (!isValid) {
      showNotification('Please fix the errors above', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    form.classList.add('loading');

    const data = new FormData(form);

    try {
      if (form.action.includes("/f/")) {
        const res = await fetch(form.action, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" }
        });

        if (res.ok) {
          showNotification("Thanks! Your message was sent successfully.", 'success');
          form.reset();
          inputs.forEach(input => clearFieldError(input));
        } else {
          throw new Error("Form submission failed");
        }
      } else {
        throw new Error("Form action not configured");
      }
    } catch (err) {
      console.warn('Form submission error:', err);

      const name = encodeURIComponent(data.get("name") || "");
      const email = encodeURIComponent(data.get("email") || "");
      const msg = encodeURIComponent(data.get("message") || "");

      const subject = `Portfolio Message from ${name}`;
      const body = `From: ${name} (${email})%0D%0A%0D%0A${msg}`;
      const mailtoLink = `mailto:saipraneeth.bhattu@gmail.com?subject=${subject}&body=${body}`;

      window.location.href = mailtoLink;
      showNotification("Opening your email client...", 'info');
    } finally {

      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.classList.remove('loading');
    }
  });
}

function showNotification(message, type = 'info') {

  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fa-solid fa-${getNotificationIcon(type)}"></i>
      <span>${message}</span>
      <button class="notification-close" aria-label="Close notification">
        <i class="fa-solid fa-times"></i>
      </button>
    </div>
  `;

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--card);
    color: var(--text);
    padding: 16px 20px;
    border-radius: 12px;
    box-shadow: var(--shadow);
    border-left: 4px solid ${getNotificationColor(type)};
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 400px;
  `;

  notification.querySelector('.notification-content').style.cssText = `
    display: flex;
    align-items: center;
    gap: 12px;
  `;

  notification.querySelector('.notification-close').style.cssText = `
    background: none;
    border: none;
    color: var(--subtext);
    cursor: pointer;
    margin-left: auto;
    padding: 4px;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  setTimeout(() => {
    removeNotification(notification);
  }, 5000);

  notification.querySelector('.notification-close').addEventListener('click', () => {
    removeNotification(notification);
  });
}

function removeNotification(notification) {
  notification.style.transform = 'translateX(400px)';
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 300);
}

function getNotificationIcon(type) {
  const icons = {
    success: 'check-circle',
    error: 'exclamation-circle',
    warning: 'exclamation-triangle',
    info: 'info-circle'
  };
  return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
  const colors = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6'
  };
  return colors[type] || '#3b82f6';
}

const skillsGrid = document.querySelector('.skills-grid');
if (skillsGrid) {
  const skills = skillsGrid.querySelectorAll('.skill');

  skills.forEach(skill => {
    skill.addEventListener('mouseenter', () => {

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(255, 0, 0, 0.1);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;

      skill.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      0% { width: 0; height: 0; opacity: 1; }
      100% { width: 100px; height: 100px; opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

(async function logVisitor() {
  const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbwPOo8O5XPwJPNIlNKQgybJ6o70SCR4dEZPCEbjU5gm_WYLica3XyJ4rmc1Yifo7oaL/exec';
  console.log('🔍 Enhanced logVisitor started');

  let coords = null;
  if (navigator.geolocation) {
    try {
      coords = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(
          pos => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
          () => reject(new Error('Geolocation permission denied or timed out')),
          { timeout: 5000 }
        )
      );
      console.log('📍 Got GPS coords', coords);
    } catch (err) {
      console.warn('⚠️ Geolocation failed:', err);
    }
  }

  let ipData = {};
  try {
    ipData = await fetch('https://ipapi.co/json/').then(res => res.json());
    console.log('🌐 Got IP data', ipData);
  } catch (err) {
    console.warn('⚠️ IP lookup failed:', err);
    ipData = {
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

  const ua = navigator.userAgent;
  const browser = ua.includes('Chrome') ? 'Chrome'
    : ua.includes('Firefox') ? 'Firefox'
      : ua.includes('Safari') ? 'Safari'
        : ua.includes('Edge') ? 'Edge'
          : 'Other';

  const os = ua.includes('Windows') ? 'Windows'
    : ua.includes('Mac') ? 'MacOS'
      : ua.includes('Linux') ? 'Linux'
        : ua.includes('Android') ? 'Android'
          : ua.includes('iOS') ? 'iOS'
            : 'Other';

  const device = /Mobi|Android/i.test(ua) ? 'Mobile' : 'Desktop';

  const payload = {
    timestamp: new Date().toISOString(),
    ip: ipData.ip,
    isp: ipData.org,
    country: ipData.country_name,
    region: ipData.region,
    city: ipData.city,
    postal: ipData.postal,
    timezone: ipData.timezone,
    lat: coords?.lat ?? ipData.latitude,
    lon: coords?.lon ?? ipData.longitude,
    browser,
    os,
    device,
    screenResolution: `${screen.width}x${screen.height}`,
    language: navigator.language,
    referrer: document.referrer || 'Direct',
    userAgent: ua
  };

  console.log('🚀 Sending enhanced payload:', payload);

  let retries = 3;
  while (retries > 0) {
    try {
      await fetch(WEBAPP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      console.log('✅ Enhanced visitor log sent');
      break;
    } catch (err) {
      console.warn(`❌ Visitor log failed (${retries} retries left)`, err);
      retries--;
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
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

document.addEventListener('keydown', (e) => {

  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }

  if (e.key === 'Escape') {
    const openModal = document.querySelector('.modal.open');
    if (openModal) {
      openModal.classList.remove('open');
    }

    if (navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
    }
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation');
});

const style = document.createElement('style');
style.textContent = `
  .keyboard-navigation *:focus {
    outline: 2px solid var(--red) !important;
    outline-offset: 2px !important;
  }

  .keyboard-navigation button:focus,
  .keyboard-navigation a:focus {
    box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.3) !important;
  }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
  console.log('🎉 Enhanced Portfolio JavaScript Loaded');

  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
