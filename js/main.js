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
  if (SUPABASE_URL !== 'REPLACE_WITH_SUPABASE_URL') {
    updateFeed();
    setInterval(updateFeed, 5000);
  }
});

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
