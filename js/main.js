/* ── Supabase Config ──────────────────────────── */
// Anon key is safe to expose — RLS protects data.
// Or: replace these with real values from .env before going live.
const SUPABASE_URL = 'https://fapmkdhcysofgxcmodgk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhcG1rZGhjeXNvZmd4Y21vZGdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwNzI0OTcsImV4cCI6MjA5MTY0ODQ5N30.HJY6C5is9KhMP0qpfiMZbAFmRj2GDFYNKrs1Lr4hb8c';

/* ── Grow Payment URLs ───────────────────────── */
// Or: replace with real Grow static page URLs from .env
const GROW_URLS = {
  team_reset: 'https://pay.grow.link/36cad6e0f52205cec7b8ee192ef3f4c6-MzI4MjM4Mg',
  focus_session: 'https://pay.grow.link/d4fb6a5014979ca1d91ea05d0003d457-MzI4MzA0MQ',
  momentum_booster: 'https://pay.grow.link/1c3cc868eb771fe115cc9b9e3cf518ac-MzI4MzA1Ng',
};

/* ── Progress Bar Config ─────────────────────── */
const PROGRESS_GOAL = 50; // 50 teams target

/* ── Initialize ──────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  wireGrowButtons();
  initPackageAccordions();
  initStoryReadMore();
  initVolumeToggle();
  initBeachHubSlideshow();
  if (SUPABASE_URL !== 'REPLACE_WITH_SUPABASE_URL') {
    updateFeed();
    setInterval(updateFeed, 5000);
  }
});

/* ── Beach hub fadeshow ──────────────────────── */
function initBeachHubSlideshow() {
  const slides = document.querySelectorAll('#beachhub-slideshow .bh-slide');
  const dots   = document.querySelectorAll('#beachhub-slideshow .bh-dot');
  if (slides.length < 2) return;

  const FADE_MS  = 2200; // duration of each crossfade
  const HOLD_MS  = 5000; // how long each photo is fully visible

  let current   = 0;
  let timer     = null;
  let fadeType  = 'out'; // alternates: 'out' (current fades away) | 'in' (next fades in on top)

  // Show first slide immediately
  slides[0].style.opacity = '1';
  slides[0].style.zIndex  = '1';
  slides[0].classList.add('bh-slide-active');
  dots[0].classList.add('bh-dot-active');

  function goTo(index) {
    const prev = current;
    current = (index + slides.length) % slides.length;

    // Update dots
    dots.forEach((d, i) => d.classList.toggle('bh-dot-active', i === current));

    // Swap Ken Burns class so zoom restarts on the incoming slide
    slides[prev].classList.remove('bh-slide-active');
    slides[current].classList.add('bh-slide-active');

    if (fadeType === 'out') {
      // ── FADE OUT ── current photo dissolves away, revealing next beneath it
      slides[current].style.transition = 'none';
      slides[current].style.opacity    = '1';
      slides[current].style.zIndex     = '0'; // sit beneath current

      void slides[current].offsetWidth; // force reflow

      slides[prev].style.zIndex     = '1'; // sits on top
      slides[prev].style.transition = `opacity ${FADE_MS}ms ease-in-out`;
      slides[prev].style.opacity    = '0';

      setTimeout(() => {
        slides[prev].style.zIndex  = '0';
        slides[current].style.zIndex = '1';
      }, FADE_MS);

    } else {
      // ── FADE IN ── next photo materialises on top of the current one
      slides[current].style.transition = 'none';
      slides[current].style.opacity    = '0';
      slides[current].style.zIndex     = '2'; // sit above current

      void slides[current].offsetWidth; // force reflow

      slides[current].style.transition = `opacity ${FADE_MS}ms ease-in-out`;
      slides[current].style.opacity    = '1';

      setTimeout(() => {
        slides[prev].style.opacity   = '0';
        slides[prev].style.zIndex    = '0';
        slides[current].style.zIndex = '1';
      }, FADE_MS);
    }

    fadeType = fadeType === 'out' ? 'in' : 'out';
  }

  function next() { goTo(current + 1); }

  function startTimer() { timer = setInterval(next, HOLD_MS); }
  function stopTimer()  { clearInterval(timer); }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { stopTimer(); goTo(i); startTimer(); });
  });

  const container = document.getElementById('beachhub-slideshow');
  container.addEventListener('mouseenter', stopTimer);
  container.addEventListener('mouseleave', startTimer);

  startTimer();
}

/* ── Story read-more accordion ──────────────── */
function initStoryReadMore() {
  const btn     = document.getElementById('story-read-more-btn');
  const content = document.getElementById('story-read-more-content');
  if (!btn || !content) return;

  btn.addEventListener('click', () => {
    const isOpen = content.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', isOpen);
    btn.textContent = isOpen ? 'סגור ↑' : 'לקרוא עוד ↓';
  });
}

/* ── Volume toggle ───────────────────────────── */
function initVolumeToggle() {
  const video = document.getElementById('hero-video');
  const btn   = document.getElementById('volume-btn');
  if (!video || !btn) return;

  // Browsers block autoplay with audio — video must start muted.
  // We unmute on the very first user interaction with the page (click or touch).
  // The volume button also toggles mute/unmute directly.
  let unmuteHandled = false;

  const unmuteOnFirstInteraction = () => {
    if (unmuteHandled) return;
    unmuteHandled = true;
    video.muted = false;
    video.volume = 1;
    setUnmuted();
    document.removeEventListener('click',      unmuteOnFirstInteraction);
    document.removeEventListener('touchstart', unmuteOnFirstInteraction);
  };

  document.addEventListener('click',      unmuteOnFirstInteraction);
  document.addEventListener('touchstart', unmuteOnFirstInteraction);

  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // handled separately — don't double-fire the global listener
    if (video.muted) {
      unmuteHandled = true;
      video.muted = false;
      video.volume = 1;
      document.removeEventListener('click',      unmuteOnFirstInteraction);
      document.removeEventListener('touchstart', unmuteOnFirstInteraction);
      setUnmuted();
    } else {
      video.muted = true;
      setMuted();
    }
  });

  function setUnmuted() {
    btn.classList.add('unmuted');
    btn.setAttribute('aria-label', 'השתק');
  }

  function setMuted() {
    btn.classList.remove('unmuted');
    btn.setAttribute('aria-label', 'הפעל שמע');
  }
}

/* ── Package Accordions ──────────────────────── */
function initPackageAccordions() {
  const allToggles    = document.querySelectorAll('.pkg-accordion-toggle');
  const allAccordions = document.querySelectorAll('.pkg-accordion');

  allToggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const anyOpen = document.querySelector('.pkg-accordion.open') !== null;
      // If any is open → close all; otherwise open all
      allAccordions.forEach((acc) => acc.classList.toggle('open', !anyOpen));
      allToggles.forEach((b) => {
        b.textContent = anyOpen ? 'מידע נוסף ↓' : 'סגור ↑';
        b.setAttribute('aria-expanded', String(!anyOpen));
      });
    });
  });
}

/* ── Wire Grow CTA buttons ───────────────────── */
function wireGrowButtons() {
  document.querySelectorAll('[data-grow]').forEach((btn) => {
    const key = btn.getAttribute('data-grow');
    const url = GROW_URLS[key];
    if (url && !url.startsWith('REPLACE')) {
      btn.href = url;
    } else {
      // Placeholder — show alert if credentials not set
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('קישור התשלום עדיין לא הוגדר — יש לעדכן את כתובות Grow ב-main.js');
      });
    }
  });
}

/* ── Fetch purchases from Supabase ───────────── */
async function fetchPurchases() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/levyam-b2b?select=full_name,package,payment_sum,created_at&order=created_at.desc&limit=10`,
      { headers: { 'apikey': SUPABASE_ANON_KEY } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

/* ── Update live feed + progress bar ─────────── */
async function updateFeed() {
  const purchases = await fetchPurchases();

  // Progress bar — count-based (0 to 50 teams)
  const count = purchases.length;
  const pct = Math.min((count / PROGRESS_GOAL) * 100, 100);
  const pctRounded = Math.round(pct);

  const barFill = document.getElementById('progress-bar-fill');
  if (barFill) barFill.style.width = pct + '%';

  // Live stat number
  const statJoined = document.getElementById('stat-joined');
  if (statJoined) statJoined.textContent = count;

  // CTA counter text
  const counter = document.getElementById('spots-counter');
  if (counter) {
    const next = count + 1;
    counter.textContent = count > 0
      ? `היו החברה ה־${next} שבוחרת בשינוי`
      : 'היו הראשונים להצטרף';
  }

  // Sun marker position
  const sun = document.getElementById('progress-sun');
  if (sun) {
    sun.style.left = pct + '%';
    sun.style.display = pct > 0 ? '' : 'none';
  }

  // Live feed
  const feed = document.getElementById('purchase-feed');
  if (feed) {
    if (purchases.length === 0) {
      feed.innerHTML = '<p class="feed-empty">היו הראשונים להצטרף!</p>';
    } else {
      feed.innerHTML = purchases.map((p) => {
        return `<div class="purchase-item">
          <img src="content/brand/icons-16.png" class="purchase-icon" alt="">
          <span class="purchase-name">${p.package || 'חבילה'}</span>
        </div>`;
      }).join('');
    }
  }
}

/* ── Smooth scroll for nav CTA ───────────────── */
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  const target = document.querySelector(anchor.getAttribute('href'));
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
