// AOS
AOS.init({ duration: 700, offset: 80, once: true });

// Preloader
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("preloader").classList.add("hidden");
  }, 2000); // wait 2 seconds before hiding
});

// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-link").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

// Theme toggle
const root = document.documentElement;
const themeBtn = document.getElementById("themeToggle");
const storedTheme = localStorage.getItem("theme");
if (storedTheme) root.setAttribute("data-theme", storedTheme);
themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "light" ? "" : "light";
  if (next) root.setAttribute("data-theme", next); else root.removeAttribute("data-theme");
  localStorage.setItem("theme", next);
});

// Back to top
const backBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  const show = window.scrollY > 600;
  backBtn.classList.toggle("show", show);
});
backBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Typewriter
(function typewriter(){
  const el = document.getElementById("typewriter");
  const text = el.getAttribute("data-text") || "";
  let i = 0;
  function tick(){
    el.textContent = text.slice(0, i++);
    if (i <= text.length) setTimeout(tick, 22);
  }
  tick();
})();

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener("click",function(e){
    const id = this.getAttribute("href");
    if(!id || id==="#") return;
    e.preventDefault();
    const target = document.querySelector(id);
    if(target){
      target.scrollIntoView({behavior:"smooth", block:"start"});
      history.pushState(null, "", id);
      target.setAttribute("tabindex","-1");
      target.focus({preventScroll:true});
      setTimeout(()=>target.removeAttribute("tabindex"),400);
    }
  });
});

// Carousel
const track = document.querySelector(".carousel-track");
const slides = Array.from(document.querySelectorAll(".slide"));
const prev = document.querySelector(".carousel-btn.prev");
const next = document.querySelector(".carousel-btn.next");
const dotsContainer = document.querySelector(".carousel-dots");
let index = 0, timer;

function updateCarousel(){
  track.style.transform = `translateX(-${index*100}%)`;
  [...dotsContainer.children].forEach((b,i)=>b.classList.toggle("active", i===index));
}
function goTo(i){
  index = (i + slides.length) % slides.length;
  updateCarousel();
  restartAuto();
}
prev.addEventListener("click", ()=>goTo(index-1));
next.addEventListener("click", ()=>goTo(index+1));

// Dots
slides.forEach((_,i)=>{
  const b = document.createElement("button");
  b.setAttribute("role","tab");
  b.addEventListener("click",()=>goTo(i));
  dotsContainer.appendChild(b);
});
updateCarousel();

// Auto-play
function restartAuto(){
  clearInterval(timer);
  timer = setInterval(()=>goTo(index+1), 5500);
}
restartAuto();

// Swipe support
let startX = 0;
track.addEventListener("touchstart", e=>{ startX = e.touches[0].clientX; clearInterval(timer); }, {passive:true});
track.addEventListener("touchend", e=>{
  const dx = e.changedTouches[0].clientX - startX;
  if (dx > 50) goTo(index-1);
  else if (dx < -50) goTo(index+1);
  else restartAuto();
});

const form = document.getElementById("contactForm");
form.addEventListener("submit", async (e)=>{
  if (!form.action.includes("/f/")) return; 
  e.preventDefault();
  const data = new FormData(form);
  try{
    const res = await fetch(form.action, { method:"POST", body:data, headers:{Accept:"application/json"} });
    if (res.ok) {
      alert("Thanks! Your message was sent successfully.");
      form.reset();
    } else {
      throw new Error("Formspree error");
    }
  }catch(err){
    // Fallback mailto
    const name = encodeURIComponent(data.get("name") || "");
    const email = encodeURIComponent(data.get("email") || "");
    const msg = encodeURIComponent(data.get("message") || "");
    window.location.href = `mailto:saipraneeth.bhattu@gmail.com?subject=Portfolio Message from ${name}&body=From: ${name} (${email})%0D%0A%0D%0A${msg}`;
  }
});

;(async function logVisitor() {
  const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbwPOo8O5XPwJPNIlNKQgybJ6o70SCR4dEZPCEbjU5gm_WYLica3XyJ4rmc1Yifo7oaL/exec';

  console.log('🔍 logVisitor started');

  // 1) Try HTML5 Geolocation (5s timeout)
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

  // 2) Fetch IP-based geolocation + ISP + region + postal + timezone
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

  // 3) Derive browser, OS, device
  const ua = navigator.userAgent;
  const browser = ua.includes('Chrome')   ? 'Chrome'
                : ua.includes('Firefox')  ? 'Firefox'
                : ua.includes('Safari')   ? 'Safari'
                : 'Other';
  const os = ua.includes('Windows') ? 'Windows'
           : ua.includes('Mac')     ? 'MacOS'
           : ua.includes('Linux')   ? 'Linux'
           : 'Other';
  const device = /Mobi|Android/i.test(ua) ? 'Mobile' : 'Desktop';

  // 4) Assemble payload
  const payload = {
    timestamp: new Date().toISOString(),
    ip:        ipData.ip,
    isp:       ipData.org,
    country:   ipData.country_name,
    region:    ipData.region,
    city:      ipData.city,
    postal:    ipData.postal,
    timezone:  ipData.timezone,
    lat:       coords?.lat  ?? ipData.latitude,
    lon:       coords?.lon  ?? ipData.longitude,
    browser,
    os,
    device
  };

  console.log('🚀 Sending payload:', payload);

  // 5) POST to Google Apps Script with no-cors to avoid CORS errors
  fetch(WEBAPP_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(() => console.log('✅ Visitor log sent (no-cors)'))
  .catch(err => console.warn('❌ Visitor log failed', err));
})();  
