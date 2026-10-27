// Olasushi · «Makisu»: la esterilla enrolla el maki, el cuchillo lo corta en 8 piezas y cada pieza abre una parte de la carta
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const LI = () => ({ es: 0, ca: 1, en: 2 }[document.documentElement.lang] || 0);
  const T = (es, ca, en) => [es, ca, en][LI()];
  const eur = (n) => n.toFixed(2).replace('.', LI() === 2 ? '.' : ',') + ' €';
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  let current = 0;

  // ---------- carta ----------
  function pieces() {
    const box = document.getElementById('pieces');
    box.innerHTML = MENU.map((c, i) => `<button type="button" class="pc" role="tab" id="pc-${c.k}" aria-controls="menu" aria-selected="${i === current}" data-i="${i}" style="--f1:${c.fill[0]};--f2:${c.fill[1]}"><i aria-hidden="true"></i><span>${c.n[LI()]}</span></button>`).join('');
  }
  function menu(i, anim) {
    current = i;
    const c = MENU[i], L = LI();
    document.querySelectorAll('.pc').forEach((b) => b.setAttribute('aria-selected', String(+b.dataset.i === i)));
    const desc = (d) => Array.isArray(d) ? d[L] : d ? d.split(' ').map((k) => (ING[k] ? ING[k][L] : k)).join(', ') : '';
    const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    const m = document.getElementById('menu');
    m.setAttribute('aria-labelledby', 'pc-' + c.k);
    m.innerHTML = `<div class="menu-h"><h3>${c.n[L]}</h3><span>${c.items.length} ${T('platos', 'plats', 'dishes')}</span></div>
      <ul class="items" style="--f1:${c.fill[0]}">${c.items.map(([n, d, p, img]) => `<li class="it">${img ? `<img src="assets/img/${img}.jpg" alt="" width="64" height="64" loading="lazy">` : '<span class="ph" aria-hidden="true"></span>'}<div><b>${n}</b>${desc(d) ? `<small>${cap(desc(d))}</small>` : ''}</div><em>${eur(p)}</em></li>`).join('')}</ul>`;
    if (anim && !reduce && typeof gsap !== 'undefined') gsap.from('.it', { opacity: 0, y: 18, duration: .6, stagger: .025, ease: 'expo.out' });
  }
  function carta() {
    pieces(); menu(0);
    document.getElementById('pieces').addEventListener('click', (e) => { const b = e.target.closest('.pc'); if (b) menu(+b.dataset.i, true); });
    document.getElementById('pieces').addEventListener('keydown', (e) => {
      if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
      const n = (current + (e.key === 'ArrowRight' ? 1 : -1) + MENU.length) % MENU.length;
      menu(n, true); document.getElementById('pc-' + MENU[n].k).focus();
    });
    document.addEventListener('langchange', () => { pieces(); menu(current); });
  }

  // ---------- makisu ----------
  function makisu() {
    const box = document.getElementById('maki'), cv = document.getElementById('makiCv'), g = cv.getContext('2d');
    const hint = document.getElementById('makiHint'), again = document.getElementById('makiAgain');
    let S = 400, d = 1, p = 0, q = 0, mode = 'auto', drag = null, raf = 0;
    const size = () => { const r = cv.getBoundingClientRect(); d = Math.min(2, devicePixelRatio || 1); S = r.width; cv.width = S * d; cv.height = S * d; g.setTransform(d, 0, 0, d, 0, 0); draw(); };
    // granos de arroz y tonos de las cañas, fijos
    const grains = Array.from({ length: 420 }, () => [Math.random(), Math.random(), Math.random() * 3]);
    const slats = Array.from({ length: 26 }, () => 0.85 + Math.random() * .25);
    const X0 = .16, X1 = .84, NT = .14, RT = .3, NB = .86, M0 = .07, M1 = .93;

    function bamboo(y, h, k, alpha) {
      const n = slats.length, sh = (M1 - M0) / n;
      for (let i = 0; i < n; i++) {
        const sy = M0 + i * sh; if (sy + sh < y || sy > y + h) continue;
        const tone = slats[i] * k;
        g.fillStyle = `rgba(${201 * tone | 0},${166 * tone | 0},${107 * tone | 0},${alpha})`;
        g.fillRect(S * .11, S * sy, S * .78, S * sh - 1.2);
        g.fillStyle = `rgba(255,240,200,${.18 * alpha})`; g.fillRect(S * .11, S * sy, S * .78, 1);
      }
      g.strokeStyle = `rgba(245,241,230,${.5 * alpha})`; g.lineWidth = 1.2;
      [.3, .7].forEach((x) => { g.beginPath(); g.moveTo(S * x, S * Math.max(M0, y)); g.lineTo(S * x, S * Math.min(M1, y + h)); g.stroke(); });
    }
    function sheet(yMax) {
      // nori
      g.fillStyle = '#1d2a1c'; g.fillRect(S * X0, S * NT, S * (X1 - X0), S * (Math.min(NB, yMax) - NT));
      // arroz
      if (yMax > RT) {
        g.fillStyle = '#f7f3e8'; g.fillRect(S * X0, S * RT, S * (X1 - X0), S * (Math.min(NB, yMax) - RT));
        g.fillStyle = '#e4ddcb';
        grains.forEach(([gx, gy, a]) => { const y = RT + gy * (NB - RT); if (y > yMax) return; g.beginPath(); g.ellipse(S * (X0 + gx * (X1 - X0)), S * y, 2.4, 1.1, a, 0, 7); g.fill(); });
      }
      // relleno: salmón, aguacate y queso
      [[.7, '#f2804a'], [.74, '#7bbf6a'], [.78, '#fbf8ef']].forEach(([y, c]) => { if (y + .028 > yMax) return; g.fillStyle = c; g.fillRect(S * (X0 + .03), S * y, S * (X1 - X0 - .06), S * .026); });
    }
    function cylinder(cy, r, surf, a) {
      // banda vista desde arriba: cortes finos con la luz de frente
      const n = 28;
      for (let i = 0; i < n; i++) {
        const t0 = -Math.PI / 2 + Math.PI * i / n, t1 = t0 + Math.PI / n;
        const y0 = cy + r * Math.sin(t0), y1 = cy + r * Math.sin(t1), l = .45 + .55 * Math.cos((t0 + t1) / 2 + .35);
        if (surf === 'bamboo') { const s = slats[(i + Math.floor(p * 40)) % slats.length] * l; g.fillStyle = `rgba(${201 * s | 0},${166 * s | 0},${107 * s | 0},${a})`; }
        else g.fillStyle = `rgba(${29 + 40 * l | 0},${42 + 46 * l | 0},${28 + 30 * l | 0},${a})`;
        g.fillRect(S * (surf === 'bamboo' ? .11 : X0), S * y0, S * (surf === 'bamboo' ? .78 : X1 - X0), S * (y1 - y0) + .8);
      }
    }
    function piece(cx, cy, w, h, t, c) {
      // t=0: pieza de lado (rectángulo de nori), t=1: corte visto de frente (círculo)
      const m = Math.min(w, h);
      g.save(); g.translate(S * cx, S * cy);
      g.fillStyle = "#1d2a1c"; g.beginPath(); g.roundRect(-S * w / 2, -S * h / 2, S * w, S * h, S * m / 2 * (.3 + .7 * t)); g.fill();
      if (t < 1) { g.fillStyle = `rgba(255,255,255,${.1 * (1 - t)})`; g.fillRect(-S * w / 2 + 2, -S * h * .32, S * w - 4, S * h * .1); }
      if (t > 0) {
        g.globalAlpha = t;
        g.fillStyle = "#fbf8ef"; g.beginPath(); g.arc(0, 0, S * m / 2 * .86, 0, 7); g.fill();
        g.fillStyle = c[1]; g.beginPath(); g.arc(0, 0, S * m / 2 * .44, 0, 7); g.fill();
        g.fillStyle = c[0]; g.beginPath(); g.arc(0, 0, S * m / 2 * .26, 0, 7); g.fill();
        g.globalAlpha = 1;
      }
      g.restore();
    }
    const spots = [];
    function draw() {
      g.clearRect(0, 0, S, S);
      const yf = NB - p * (NB - NT), r = .03 + .07 * Math.sqrt(p);
      if (q < 1) {
        const a = 1 - clamp(q);
        g.save(); g.translate(0, S * .25 * ease(clamp(q))); bamboo(M0, Math.max(0, yf - M0), 1, a);
        if (p < 1) sheet(yf);
        g.restore();
        const cy = (yf + r) * (1 - ease(clamp(q))) + .5 * ease(clamp(q));
        if (p > 0) {
          cylinder(cy, r, 'nori', 1);
          if (a > 0) cylinder(cy, r * 1.04, 'bamboo', a * (q > 0 ? 1 - clamp(q * 2) : 1));
        }
      } else if (q < 2) {
        const s = ease(q - 1), w = (X1 - X0) / 8;
        for (let i = 0; i < 8; i++) piece(.5 + (i - 3.5) * (w + .012 * s), .5, w * (1 - .1 * s), .2, 0, MENU[i].fill);
        if (s < .9) { g.fillStyle = `rgba(255,255,255,${.6 * (1 - s)})`; for (let i = 1; i < 8; i++) g.fillRect(S * (X0 + i * (X1 - X0) / 8) - .5, S * .38, 1, S * .24); }
      } else {
        const t = ease(clamp(q - 2)), w = (X1 - X0) / 8;
        spots.length = 0;
        for (let i = 0; i < 8; i++) {
          const row = i < 4 ? 0 : 1, col = i % 4;
          const fx = .5 + (i - 3.5) * (w + .012), fy = .5;
          const tx = .2 + col * .2, ty = .36 + row * .3;
          const cx = fx + (tx - fx) * t, cy = fy + (ty - fy) * t, D = .17;
          piece(cx, cy, w * .9 + (D - w * .9) * t, .2 + (D - .2) * t, t, MENU[i].fill);
          spots.push([cx, cy, D / 2]);
          if (t > .95) { g.fillStyle = 'rgba(245,241,230,.85)'; g.font = `500 ${Math.max(10, S * .028)}px "M PLUS 1p", sans-serif`; g.textAlign = 'center'; g.fillText(MENU[i].sn[LI()], S * cx, S * (cy + D / 2 + .045)); }
        }
      }
    }
    function tick() { raf = 0; draw(); }
    const req = () => { if (!raf) raf = requestAnimationFrame(tick); };

    function finish() {
      mode = 'finish';
      if (reduce) { q = 3; draw(); done(); return; }
      const t0 = performance.now();
      const step = (now) => { q = Math.min(3, (now - t0) / 800); draw(); if (q < 3) requestAnimationFrame(step); else done(); };
      requestAnimationFrame(step);
    }
    function done() { mode = 'done'; hint.textContent = T('Toca una pieza para ver esa parte de la carta', 'Toca una peça per veure aquesta part de la carta', 'Tap a piece to see that part of the menu'); again.classList.add('on'); }
    function auto() {
      if (reduce) { p = 1; finish(); return; }
      mode = 'auto'; const t0 = performance.now();
      const step = (now) => { p = ease(clamp((now - t0 - 500) / 2000)); draw(); if (p < 1) requestAnimationFrame(step); else finish(); };
      requestAnimationFrame(step);
    }
    again.addEventListener('click', () => {
      p = 0; q = 0; mode = 'drag'; again.classList.remove('on');
      hint.textContent = T('Arrastra hacia arriba para enrollar', 'Arrossega cap amunt per enrotllar', 'Drag upwards to roll it'); draw();
    });
    cv.addEventListener('pointerdown', (e) => {
      if (mode === 'done') {
        const r = cv.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        const i = spots.findIndex(([cx, cy, rr]) => Math.hypot(x - cx, y - cy) < rr * 1.2);
        if (i >= 0) { menu(i, true); document.getElementById('carta').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); }
        return;
      }
      if (mode !== 'drag') return;
      drag = { y: e.clientY, p }; cv.setPointerCapture(e.pointerId);
    });
    cv.addEventListener('pointermove', (e) => {
      if (mode === 'done') { const r = cv.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height; cv.style.cursor = spots.some(([cx, cy, rr]) => Math.hypot(x - cx, y - cy) < rr * 1.2) ? 'pointer' : 'default'; }
      if (!drag) return;
      p = clamp(drag.p + (drag.y - e.clientY) / (cv.getBoundingClientRect().height * .7)); req();
      if (p >= 1) { drag = null; finish(); }
    });
    cv.addEventListener('pointerup', () => { drag = null; });
    document.addEventListener('langchange', () => { if (mode === 'done') { draw(); done(); } });
    new ResizeObserver(size).observe(cv); size();
    auto();
  }

  function header() {
    const top = document.querySelector('.top'); let last = 0;
    addEventListener('scroll', () => {
      const y = scrollY; top.classList.toggle('solid', y > 40);
      if (y > 600 && y > last + 4) top.classList.add('hide'); else if (y < last - 4) top.classList.remove('hide');
      last = y;
    }, { passive: true });
  }

  function motion() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.hero-k, .hero h1 span, .hero h1 em, .hero-p, .hero-cta, .hero-rate', { opacity: 0, y: 30, duration: 1.2, stagger: .08, ease: 'expo.out', delay: .2 });
    gsap.utils.toArray('h2.rv').forEach((h) => gsap.from(h, { opacity: 0, y: 40, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 88%' } }));
    gsap.from('.pc', { opacity: 0, y: 40, rotate: -40, duration: 1, stagger: .06, ease: 'back.out(1.6)', scrollTrigger: { trigger: '.pieces', start: 'top 88%' } });
    gsap.utils.toArray('.co-imgs img, .facts li, .rs blockquote, .pe-txt dl').forEach((el, i) => gsap.from(el, { opacity: 0, y: 40, duration: 1.1, ease: 'expo.out', delay: (i % 4) * .05, scrollTrigger: { trigger: el, start: 'top 92%' } }));
  }

  function init() {
    carta(); makisu(); header();
    if (!reduce && typeof gsap !== 'undefined') motion();
    document.fonts && document.fonts.ready.then(() => typeof ScrollTrigger !== 'undefined' && ScrollTrigger.refresh());
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
