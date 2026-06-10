/* ============================================
   LUXURY WEDDING INVITATION - SCRIPT.JS
   Design by Zhald_Design
   ============================================ */

const CONFIG = {
  JSONBIN_BIN_ID: 'YOUR_BIN_ID_HERE',
  JSONBIN_ACCESS_KEY: 'YOUR_X-ACCESS-KEY_HERE',
  JSONBIN_API: 'https://api.jsonbin.io/v3/b'
};

/* ── DOM READY ── */
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initStars();
  initPetals();
  checkGuestName();
  initMusicPlayer();
  initGallery();
  initWishes();
  initCopyButtons();
  generateSideOrnaments();
});

/* ── OPENING ── */
function openInvitation() {
  const openingScreen = document.getElementById('opening-screen');
  const curtain       = document.getElementById('curtain');
  const mainInv       = document.getElementById('main-invitation');
  const guestBanner   = document.querySelector('.guest-banner');

  openingScreen.style.transition = 'opacity 0.7s ease';
  openingScreen.style.opacity    = '0';

  setTimeout(() => {
    openingScreen.style.display = 'none';
    mainInv.classList.add('visible');

    curtain.style.display = 'flex';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        curtain.classList.add('curtain-open');
      });
    });

    setTimeout(() => {
      curtain.style.transition = 'opacity 0.5s ease';
      curtain.style.opacity    = '0';
      setTimeout(() => { curtain.style.display = 'none'; }, 500);
    }, 1800);

    if (guestBanner) {
      setTimeout(() => guestBanner.classList.add('show'), 2200);
    }

    /* auto play music */
    setTimeout(() => {
      const audio = document.getElementById('bg-music');
      if (audio) {
        audio.play().catch(() => {});
        document.querySelector('.music-bars')?.classList.remove('paused');
        const icon = document.getElementById('music-icon');
        if (icon) icon.textContent = '♪';
      }
    }, 2300);

    /* init scroll reveal setelah masuk */
    setTimeout(() => initScrollReveal(), 2000);

  }, 700);
}

/* ── GUEST NAME ── */
function checkGuestName() {
  const params    = new URLSearchParams(window.location.search);
  const guestName = params.get('to') || params.get('nama');
  if (guestName) {
    const decoded = decodeURIComponent(guestName);
    const el = document.querySelector('.guest-name-display');
    if (el) el.textContent = decoded;
  }
}

/* ── PARTICLES ── */
function initParticles() {
  const container = document.querySelector('.opening-particles');
  if (!container) return;
  const colors = ['#c9963a','#e2b85a','#e8bfc8','#ffffff'];
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left:${Math.random()*100}%;
      width:${Math.random()*4+2}px;
      height:${Math.random()*4+2}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${Math.random()*8+6}s;
      animation-delay:${Math.random()*8}s;
      border-radius:${Math.random()>.5?'50%':'0'};
    `;
    container.appendChild(p);
  }
}

/* ── STARS ── */
function initStars() {
  ['cover-stars','closing-stars'].forEach(id => {
    const c = document.getElementById(id);
    if (!c) return;
    for (let i = 0; i < 70; i++) {
      const s = document.createElement('div');
      const sz = Math.random()*2.5+1;
      s.className = 'star';
      s.style.cssText = `
        left:${Math.random()*100}%;
        top:${Math.random()*100}%;
        width:${sz}px;height:${sz}px;
        animation-duration:${Math.random()*4+2}s;
        animation-delay:${Math.random()*4}s;
      `;
      c.appendChild(s);
    }
  });
}

/* ── PETALS ── */
function initPetals() {
  const container = document.querySelector('.petal-layer');
  if (!container) return;
  const symbols = ['✦','✧','❋','◆','◇','❖'];
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    p.style.cssText = `
      left:${Math.random()*100}%;
      color:${Math.random()>.5?'#c9963a':'#e8bfc8'};
      font-size:${Math.random()*10+7}px;
      animation-duration:${Math.random()*12+10}s;
      animation-delay:${Math.random()*15}s;
    `;
    container.appendChild(p);
  }
}

/* ── SIDE ORNAMENTS ── */
function generateSideOrnaments() {
  const border = document.querySelector('.page-border-wrapper');
  if (!border) return;
  const syms = ['✦','◆','❖','✧','◇'];
  [22,38,54,70,86].forEach((pct, i) => {
    ['left','right'].forEach(side => {
      const el = document.createElement('div');
      el.className = `side-gem ${side}`;
      el.textContent = syms[i % syms.length];
      el.style.top   = pct + '%';
      el.style.animationDelay = (i * 0.4) + 's';
      border.appendChild(el);
    });
  });
}

/* ── MUSIC PLAYER ── */
function initMusicPlayer() {
  const audio     = document.getElementById('bg-music');
  const toggleBtn = document.getElementById('music-toggle');
  const icon      = document.getElementById('music-icon');
  const bars      = document.querySelector('.music-bars');
  if (!toggleBtn || !audio) return;

  let playing = false;

  toggleBtn.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      if (icon)  icon.textContent = '♫';
      bars?.classList.add('paused');
    } else {
      audio.play().catch(() => {});
      if (icon)  icon.textContent = '♪';
      bars?.classList.remove('paused');
    }
    playing = !playing;
  });

  audio.addEventListener('ended', () => {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  });
}

/* ── SCROLL REVEAL ── */
function initScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target); /* stop watching once revealed */
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ── NAVIGATE ── */
function navigateTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - 16;
  window.scrollTo({ top, behavior: 'smooth' });
}

/* ── GALLERY ── */
let currentIdx = 0;
const TOTAL    = 20;

function initGallery() {
  /* Use event delegation — satu listener di parent, tidak per-item */
  const grid = document.querySelector('.gallery-grid');
  if (!grid) return;

  grid.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    const items = [...grid.querySelectorAll('.gallery-item')];
    currentIdx = items.indexOf(item);
    openLightbox(currentIdx);
  });

  /* Keyboard nav */
  document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (!lb?.classList.contains('open')) return;
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft')  prevPhoto();
    if (e.key === 'Escape')     closeLightbox();
  });

  /* Preload gallery images only when section is visible */
  const gallerySection = document.getElementById('gallery');
  if (gallerySection) {
    const sectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        preloadGalleryImages();
        sectionObserver.disconnect();
      }
    }, { threshold: 0.1 });
    sectionObserver.observe(gallerySection);
  }
}

/* Preload semua foto gallery saat section mulai terlihat */
function preloadGalleryImages() {
  for (let i = 1; i <= TOTAL; i++) {
    const img = new Image();
    img.src = `Foto${i}.jpg`;
  }
}

function openLightbox(idx) {
  currentIdx = idx;
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  if (!lb || !img) return;
  img.src = `Foto${idx + 1}.jpg`;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}

function nextPhoto() {
  currentIdx = (currentIdx + 1) % TOTAL;
  const img = document.getElementById('lightbox-img');
  if (!img) return;
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = `Foto${currentIdx + 1}.jpg`;
    img.style.opacity = '1';
  }, 180);
}

function prevPhoto() {
  currentIdx = (currentIdx - 1 + TOTAL) % TOTAL;
  const img = document.getElementById('lightbox-img');
  if (!img) return;
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = `Foto${currentIdx + 1}.jpg`;
    img.style.opacity = '1';
  }, 180);
}

/* ── COPY BUTTONS (no jQuery, pure delegation) ── */
function initCopyButtons() {
  /* Event delegation di document level — tidak peduli z-index */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;
    e.stopPropagation();

    const text = btn.getAttribute('data-copy');
    if (!text) return;

    const doкопy = () => {
      showToast('Nomor rekening berhasil disalin ✦');
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Tersalin!';
      setTimeout(() => { btn.innerHTML = orig; }, 2000);
    };

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(doкопy).catch(() => fallbackCopy(text, doкопy));
    } else {
      fallbackCopy(text, doкопy);
    }
  });
}

function fallbackCopy(text, cb) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;top:-9999px;opacity:0';
  document.body.appendChild(ta);
  ta.focus(); ta.select();
  try { document.execCommand('copy'); cb(); } catch(e) {}
  document.body.removeChild(ta);
}

// Fix typo alias
const doкопy = () => {};

/* ── TOAST ── */
function showToast(msg) {
  let t = document.getElementById('global-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'global-toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3000);
}

/* ── WISHES ── */
async function initWishes() {
  await loadWishes();
}

async function loadWishes() {
  const container = document.getElementById('wishes-list');
  if (!container) return;
  container.innerHTML = '<div class="loading-spinner">Memuat ucapan</div>';

  try {
    const res = await fetch(
      `${CONFIG.JSONBIN_API}/${CONFIG.JSONBIN_BIN_ID}/latest`,
      { headers: { 'X-Access-Key': CONFIG.JSONBIN_ACCESS_KEY } }
    );
    if (!res.ok) throw new Error('Failed');
    const data = await res.json();
    renderWishes(data.record?.wishes || [], container);
  } catch {
    container.innerHTML = `
      <div style="text-align:center;padding:20px;color:rgba(255,255,255,.4);
        font-family:'Cormorant Garamond',serif;font-style:italic;font-size:15px;">
        Jadilah yang pertama memberikan ucapan ✦
      </div>`;
  }
}

function renderWishes(wishes, container) {
  if (!wishes.length) {
    container.innerHTML = `
      <div style="text-align:center;padding:20px;color:rgba(255,255,255,.4);
        font-family:'Cormorant Garamond',serif;font-style:italic;font-size:15px;">
        Jadilah yang pertama memberikan ucapan ✦
      </div>`;
    return;
  }
  container.innerHTML = '';
  const labels = { hadir:'✓ Hadir', tidak:'✗ Tidak Hadir', mungkin:'◎ Mungkin Hadir' };
  [...wishes].reverse().forEach(w => {
    const card = document.createElement('div');
    card.className = 'wish-card';
    card.innerHTML = `
      <div class="wish-name">${escapeHtml(w.name)}</div>
      <div class="wish-attendance">${labels[w.attendance] || ''}</div>
      <div class="wish-message">${escapeHtml(w.message)}</div>
      <div class="wish-time">${formatDate(w.time)}</div>`;
    container.appendChild(card);
  });
}

async function submitWish() {
  const nameEl  = document.getElementById('wish-name');
  const msgEl   = document.getElementById('wish-message');
  const attEl   = document.getElementById('wish-attendance');
  const btn     = document.getElementById('wish-submit');
  const name    = nameEl?.value?.trim();
  const message = msgEl?.value?.trim();

  if (!name || !message) { showToast('Mohon isi nama dan ucapan ✦'); return; }

  if (btn) { btn.disabled = true; btn.textContent = 'Mengirim...'; }

  try {
    const getRes = await fetch(
      `${CONFIG.JSONBIN_API}/${CONFIG.JSONBIN_BIN_ID}/latest`,
      { headers: { 'X-Access-Key': CONFIG.JSONBIN_ACCESS_KEY } }
    );
    let wishes = [];
    if (getRes.ok) { const d = await getRes.json(); wishes = d.record?.wishes || []; }

    wishes.push({ name, message, attendance: attEl?.value || 'hadir', time: new Date().toISOString() });

    const putRes = await fetch(`${CONFIG.JSONBIN_API}/${CONFIG.JSONBIN_BIN_ID}`, {
      method: 'PUT',
      headers: { 'Content-Type':'application/json', 'X-Access-Key': CONFIG.JSONBIN_ACCESS_KEY },
      body: JSON.stringify({ wishes })
    });
    if (!putRes.ok) throw new Error('Save failed');

    if (nameEl)  nameEl.value  = '';
    if (msgEl)   msgEl.value   = '';
    if (attEl)   attEl.value   = 'hadir';
    showToast('Ucapan berhasil dikirim ✦');
    await loadWishes();
  } catch {
    showToast('Gagal mengirim. Coba lagi.');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'KIRIM UCAPAN'; }
  }
}

/* ── HELPERS ── */
function escapeHtml(s) {
  const d = document.createElement('div');
  d.appendChild(document.createTextNode(s));
  return d.innerHTML;
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('id-ID', {
      day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit'
    });
  } catch { return ''; }
}

/* ── COUNTDOWN ── */
(function initCountdown() {
  const target = new Date('2025-12-12T08:00:00');
  const ids    = ['cd-days','cd-hours','cd-mins','cd-secs'];

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      document.getElementById('countdown-wrap')?.remove();
      return;
    }
    const vals = [
      Math.floor(diff / 86400000),
      Math.floor(diff / 3600000) % 24,
      Math.floor(diff / 60000)   % 60,
      Math.floor(diff / 1000)    % 60
    ];
    ids.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(vals[i]).padStart(2, '0');
    });
  }
  tick();
  setInterval(tick, 1000);
})();
