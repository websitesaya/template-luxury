/* ============================================
   LUXURY WEDDING INVITATION - SCRIPT.JS
   Design by Zhald_Design
   ============================================ */

// ============ CONFIG ============
const CONFIG = {
  JSONBIN_BIN_ID: 'YOUR_BIN_ID_HERE',
  JSONBIN_ACCESS_KEY: 'YOUR_X-ACCESS-KEY_HERE',
  JSONBIN_API: 'https://api.jsonbin.io/v3/b'
};

// ============ DOM READY ============
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initStars();
  initPetals();
  checkGuestName();
  initMusicPlayer();
  initScrollReveal();
  initGallery();
  initWishes();
  initCopyButtons();
  generateSideOrnaments();
});

// ============ OPENING SCREEN ============
function openInvitation() {
  const openingScreen = document.getElementById('opening-screen');
  const curtain = document.getElementById('curtain');
  const mainInvitation = document.getElementById('main-invitation');
  const guestBanner = document.querySelector('.guest-banner');

  // Fade out opening screen
  openingScreen.style.transition = 'opacity 0.8s ease';
  openingScreen.style.opacity = '0';

  setTimeout(() => {
    openingScreen.style.display = 'none';
    mainInvitation.classList.add('visible');
    curtain.style.display = 'flex';

    // Trigger curtain open
    setTimeout(() => {
      curtain.classList.add('curtain-open');
    }, 100);

    // Hide curtain after animation
    setTimeout(() => {
      curtain.style.opacity = '0';
      curtain.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        curtain.style.display = 'none';
      }, 500);
    }, 2000);

    // Show guest banner
    if (guestBanner) {
      setTimeout(() => {
        guestBanner.classList.add('show');
      }, 2500);
    }

    // Auto play music
    setTimeout(() => {
      const audio = document.getElementById('bg-music');
      if (audio) {
        audio.play().catch(() => {});
        document.querySelector('.music-bars')?.classList.remove('paused');
        document.getElementById('music-icon').textContent = '♪';
      }
    }, 2600);

    // Trigger reveal for first section
    setTimeout(() => {
      triggerReveal();
    }, 2200);

  }, 800);
}

// ============ GUEST NAME ============
function checkGuestName() {
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('to') || urlParams.get('nama');

  if (guestName) {
    const decoded = decodeURIComponent(guestName);
    const banner = document.querySelector('.guest-banner');
    const nameEl = document.querySelector('.guest-name-display');
    if (banner && nameEl) {
      nameEl.textContent = decoded;
    }
  }
}

// ============ PARTICLES ============
function initParticles() {
  const container = document.querySelector('.opening-particles');
  if (!container) return;

  const colors = ['#c9a84c', '#e8c97a', '#a8c4e8', '#ffffff'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.width = p.style.height = (Math.random() * 4 + 2) + 'px';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDuration = (Math.random() * 8 + 6) + 's';
    p.style.animationDelay = (Math.random() * 8) + 's';
    p.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    container.appendChild(p);
  }
}

// ============ STARS ============
function initStars() {
  const container = document.querySelector('.cover-stars');
  if (!container) return;

  for (let i = 0; i < 80; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    s.style.animationDuration = (Math.random() * 4 + 2) + 's';
    s.style.animationDelay = (Math.random() * 4) + 's';
    const size = Math.random() * 3 + 1;
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    container.appendChild(s);
  }
}

// ============ PETALS ============
function initPetals() {
  const container = document.querySelector('.petal-layer');
  if (!container) return;

  const symbols = ['✦', '✧', '❋', '✿', '◆', '◇', '❖'];
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.left = Math.random() * 100 + '%';
    p.style.color = Math.random() > 0.5 ? '#c9a84c' : '#a8c4e8';
    p.style.fontSize = (Math.random() * 10 + 8) + 'px';
    p.style.animationDuration = (Math.random() * 12 + 10) + 's';
    p.style.animationDelay = (Math.random() * 15) + 's';
    p.style.opacity = 0;
    container.appendChild(p);
  }
}

// ============ SIDE ORNAMENTS ============
function generateSideOrnaments() {
  const border = document.querySelector('.page-border-wrapper');
  if (!border) return;

  const ornaments = ['✦', '◆', '❖', '✧', '◇'];
  const positions = [20, 35, 50, 65, 80];

  positions.forEach((pos, i) => {
    ['left', 'right'].forEach(side => {
      const el = document.createElement('div');
      el.className = `side-ornament ${side}`;
      el.textContent = ornaments[i % ornaments.length];
      el.style.top = pos + '%';
      el.style.animationDelay = (i * 0.5) + 's';
      border.appendChild(el);
    });
  });
}

// ============ MUSIC PLAYER ============
function initMusicPlayer() {
  const audio = document.getElementById('bg-music');
  const toggleBtn = document.getElementById('music-toggle');
  const icon = document.getElementById('music-icon');
  const bars = document.querySelector('.music-bars');

  if (!toggleBtn || !audio) return;

  let isPlaying = false;

  toggleBtn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      icon.textContent = '♫';
      bars?.classList.add('paused');
    } else {
      audio.play().catch(() => {});
      icon.textContent = '♪';
      bars?.classList.remove('paused');
    }
    isPlaying = !isPlaying;
  });

  audio.addEventListener('ended', () => {
    audio.currentTime = 0;
    audio.play();
  });
}

// ============ SCROLL REVEAL ============
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function triggerReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.05 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============ NAVIGATE TO SECTION ============
function navigateTo(sectionId) {
  const target = document.getElementById(sectionId);
  if (target) {
    const offset = 20;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

// ============ GALLERY ============
let currentLightboxIndex = 0;
const totalPhotos = 20;

function initGallery() {
  const items = document.querySelectorAll('.gallery-item');
  items.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (!lb || !lb.classList.contains('open')) return;
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') prevPhoto();
    if (e.key === 'Escape') closeLightbox();
  });
}

function openLightbox(index) {
  currentLightboxIndex = index;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  if (!lb || !img) return;

  img.src = `Foto${index + 1}.jpg`;
  img.alt = `Foto Prewedding ${index + 1}`;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}

function nextPhoto() {
  currentLightboxIndex = (currentLightboxIndex + 1) % totalPhotos;
  const img = document.getElementById('lightbox-img');
  if (img) {
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = `Foto${currentLightboxIndex + 1}.jpg`;
      img.style.opacity = '1';
    }, 200);
  }
}

function prevPhoto() {
  currentLightboxIndex = (currentLightboxIndex - 1 + totalPhotos) % totalPhotos;
  const img = document.getElementById('lightbox-img');
  if (img) {
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = `Foto${currentLightboxIndex + 1}.jpg`;
      img.style.opacity = '1';
    }, 200);
  }
}

// ============ COPY BUTTONS ============
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('Nomor rekening berhasil disalin ✦');
        const originalText = btn.innerHTML;
        btn.innerHTML = '✓ Tersalin';
        setTimeout(() => { btn.innerHTML = originalText; }, 2000);
      }).catch(() => {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = textToCopy;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('Nomor rekening berhasil disalin ✦');
      });
    });
  });
}

// ============ TOAST ============
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============ WISHES (JSONBin) ============
async function initWishes() {
  await loadWishes();
}

async function loadWishes() {
  const container = document.getElementById('wishes-list');
  if (!container) return;

  container.innerHTML = '<div class="loading-spinner">Memuat ucapan</div>';

  try {
    const res = await fetch(`${CONFIG.JSONBIN_API}/${CONFIG.JSONBIN_BIN_ID}/latest`, {
      headers: {
        'X-Access-Key': CONFIG.JSONBIN_ACCESS_KEY
      }
    });

    if (!res.ok) throw new Error('Failed to load');

    const data = await res.json();
    const wishes = data.record?.wishes || [];

    renderWishes(wishes, container);
  } catch (err) {
    container.innerHTML = `
      <div style="text-align:center; padding:20px; color: rgba(255,255,255,0.4); font-family:'Cormorant Garamond',serif; font-style:italic; font-size:15px;">
        Jadilah yang pertama memberikan ucapan ✦
      </div>`;
  }
}

function renderWishes(wishes, container) {
  if (!wishes.length) {
    container.innerHTML = `
      <div style="text-align:center; padding:20px; color: rgba(255,255,255,0.4); font-family:'Cormorant Garamond',serif; font-style:italic; font-size:15px;">
        Jadilah yang pertama memberikan ucapan ✦
      </div>`;
    return;
  }

  container.innerHTML = '';
  const sorted = [...wishes].reverse();
  sorted.forEach(w => {
    const card = document.createElement('div');
    card.className = 'wish-card';
    const attendanceLabel = {
      'hadir': '✓ Hadir',
      'tidak': '✗ Tidak Hadir',
      'mungkin': '◎ Mungkin Hadir'
    }[w.attendance] || '';

    card.innerHTML = `
      <div class="wish-name">${escapeHtml(w.name)}</div>
      <div class="wish-attendance">${attendanceLabel}</div>
      <div class="wish-message">${escapeHtml(w.message)}</div>
      <div class="wish-time">${formatDate(w.time)}</div>
    `;
    container.appendChild(card);
  });
}

async function submitWish() {
  const name = document.getElementById('wish-name')?.value?.trim();
  const message = document.getElementById('wish-message')?.value?.trim();
  const attendance = document.getElementById('wish-attendance')?.value;

  if (!name || !message) {
    showToast('Mohon isi nama dan ucapan ✦');
    return;
  }

  const btn = document.getElementById('wish-submit');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Mengirim...';
  }

  try {
    // Get current data
    const getRes = await fetch(`${CONFIG.JSONBIN_API}/${CONFIG.JSONBIN_BIN_ID}/latest`, {
      headers: { 'X-Access-Key': CONFIG.JSONBIN_ACCESS_KEY }
    });

    let wishes = [];
    if (getRes.ok) {
      const data = await getRes.json();
      wishes = data.record?.wishes || [];
    }

    // Add new wish
    wishes.push({
      name,
      message,
      attendance,
      time: new Date().toISOString()
    });

    // Update bin
    const putRes = await fetch(`${CONFIG.JSONBIN_API}/${CONFIG.JSONBIN_BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Key': CONFIG.JSONBIN_ACCESS_KEY
      },
      body: JSON.stringify({ wishes })
    });

    if (!putRes.ok) throw new Error('Failed to save');

    // Clear form
    document.getElementById('wish-name').value = '';
    document.getElementById('wish-message').value = '';
    document.getElementById('wish-attendance').value = 'hadir';

    showToast('Ucapan berhasil dikirim ✦');

    // Reload
    await loadWishes();

  } catch (err) {
    showToast('Gagal mengirim ucapan. Coba lagi.');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'KIRIM UCAPAN';
    }
  }
}

// ============ HELPERS ============
function escapeHtml(text) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  } catch {
    return '';
  }
}

// ============ COUNTDOWN ============
function initCountdown() {
  const weddingDate = new Date('2025-12-12T08:00:00');

  function update() {
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      document.getElementById('countdown-wrap')?.remove();
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const el = (id, val) => {
      const e = document.getElementById(id);
      if (e) e.textContent = String(val).padStart(2, '0');
    };
    el('cd-days', days);
    el('cd-hours', hours);
    el('cd-mins', mins);
    el('cd-secs', secs);
  }

  update();
  setInterval(update, 1000);
}

document.addEventListener('DOMContentLoaded', initCountdown);
