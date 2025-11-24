const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const gifImage = document.getElementById('gifImage');
const message = document.getElementById('message');
const stickerWrap = document.getElementById('stickerWrap');
const bgMusic = document.getElementById('bgMusic');

window.addEventListener('load', () => {
  bgMusic.volume = 0;
  bgMusic.play().catch(() => {
    bgMusic.muted = true;
    bgMusic.play().then(() => {
      document.body.addEventListener('click', () => {
        bgMusic.muted = false;
        fadeInMusic();
      }, { once: true });
    });
  }).then(() => {
    fadeInMusic();
  });
});

function fadeInMusic() {
  let vol = 0;
  const targetVolume = 0.66;
  const step = 0.02;
  const interval = setInterval(() => {
    vol += step;
    if (vol >= targetVolume) {
      vol = targetVolume;
      clearInterval(interval);
    }
    bgMusic.volume = vol;
  }, 100);
}

function moveNo(btn) {
  const padding = 16;
  const bw = btn.offsetWidth;
  const bh = btn.offsetHeight;
  const safeWidth = Math.max(window.innerWidth - bw - padding * 2, 0);
  const safeHeight = Math.max(window.innerHeight - bh - padding * 2, 0);

  let x, y, tries = 0;
  do {
    x = Math.random() * safeWidth + padding;
    y = Math.random() * safeHeight + padding;
    tries++;
    if (tries > 60) break;

    const yesRect = yesBtn.getBoundingClientRect();
    const cx = x + bw / 2;
    const cy = y + bh / 2;
    if (
      Math.abs(cx - (yesRect.left + yesRect.right) / 2) < 160 &&
      Math.abs(cy - (yesRect.top + yesRect.bottom) / 2) < 120
    ) continue;

    break;
  } while (true);

  btn.style.position = 'fixed';
  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;
}

noBtn.addEventListener('mouseenter', () => moveNo(noBtn));

function spawnFallingHeart() {
  const h = document.createElement('div');
  h.className = 'falling-heart';
  h.textContent = ['💗','💖','💕','❤️'][Math.floor(Math.random()*4)];
  h.style.left = Math.random() * 100 + 'vw';
  h.style.fontSize = (14 + Math.random() * 18) + 'px';
  h.style.animationDuration = (2.8 + Math.random() * 2.8) + 's';
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 7000);
}

yesBtn.addEventListener('click', () => {
  document.body.style.background = 'linear-gradient(135deg,#ff758c,#ff7eb3,#fceabb)';
  gifImage.src = 'bunny2.gif';
  gifImage.classList.add('bounce');
  setTimeout(() => message.classList.add('show'), 300);
  setTimeout(() => {
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
  }, 300);
  const heartsCount = 14;
  for (let i = 0; i < heartsCount; i++) {
    setTimeout(spawnFallingHeart, i * 120);
  }
  stickerWrap.style.transform = 'scale(1.03)';
});

function isTouchDevice() {
  return ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
}
if (isTouchDevice()) {
  noBtn.removeEventListener('mouseenter', () => moveNo(noBtn));
  noBtn.addEventListener('click', () => alert('Хмм... а если всё-таки плед и кино? 😉'));
}

setInterval(() => {
  yesBtn.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.04)' }, { transform: 'scale(1)' }], { duration: 2500, iterations: 1 });
}, 2800);
