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
const PROGRESS_GOAL = 100000; // 100,000 NIS target

/* ── Initialize ──────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  wireGrowButtons();
  initStoryAccordion();
  if (SUPABASE_URL !== 'REPLACE_WITH_SUPABASE_URL') {
    updateFeed();
    setInterval(updateFeed, 5000);
  }
});

/* ── Story Accordion ─────────────────────────── */
function initStoryAccordion() {
  const toggle = document.getElementById('story-toggle');
  const expandable = document.getElementById('story-expandable');
  if (!toggle || !expandable) return;

  toggle.addEventListener('click', () => {
    const isOpen = expandable.classList.contains('open');
    expandable.classList.toggle('open');
    toggle.textContent = isOpen ? 'קראו עוד ↓' : 'קראו פחות ↑';
    toggle.setAttribute('aria-expanded', String(!isOpen));
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

  // Progress bar
  const totalRaised = purchases.reduce((sum, p) => sum + (Number(p.payment_sum) || 0), 0);
  const pct = Math.min((totalRaised / PROGRESS_GOAL) * 100, 100);

  const barFill = document.getElementById('progress-bar-fill');
  if (barFill) {
    barFill.style.width = pct + '%';
  }

  const label = document.getElementById('progress-label');
  if (label) {
    label.textContent = `${totalRaised.toLocaleString('he-IL')} ₪ מתוך ${PROGRESS_GOAL.toLocaleString('he-IL')} ₪`;
  }

  const counter = document.getElementById('spots-counter');
  if (counter) {
    counter.textContent = `${purchases.length} צוותים וארגונים כבר הצטרפו`;
  }

  // Live feed
  const feed = document.getElementById('purchase-feed');
  if (feed) {
    if (purchases.length === 0) {
      feed.innerHTML = '<p class="feed-empty">היו הראשונים להצטרף!</p>';
    } else {
      feed.innerHTML = purchases.map((p) => {
        return `<div class="purchase-item">
          <span class="purchase-dot"></span>
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
