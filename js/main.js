// Olasushi · «Cortes»: la foto de los nigiris entra en tres franjas, como las piezas de un maki recién cortado; cada pieza de la carta abre una parte del menú
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
  // ---------- portada: la foto en tres cortes ----------
  // las franjas entran deslizando desde lados alternos y luego se desplazan un poco con el cursor, como piezas recién cortadas
  function cuts() {
    if (reduce || typeof gsap === 'undefined') return;
    const c = gsap.utils.toArray('.cut');
    gsap.fromTo(c, { xPercent: (i) => (i % 2 ? 110 : -110), opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1.5, ease: 'expo.out', stagger: .12, delay: .15 });
    gsap.fromTo('.cuts-tag', { scale: .4, opacity: 0, rotate: -20 }, { scale: 1, opacity: .92, rotate: 0, duration: 1.2, ease: 'back.out(2)', delay: .8 });
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const q = c.map((el) => gsap.quickTo(el, 'x', { duration: .9, ease: 'power3.out' }));
      document.querySelector('.hero').addEventListener('pointermove', (e) => { const d = (e.clientX / innerWidth - .5) * 2; q.forEach((f, i) => f(d * (i - 1) * 18)); });
    }
    gsap.to(c, { x: (i) => (i - 1) * 40, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
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
    carta(); cuts(); header();
    if (!reduce && typeof gsap !== 'undefined') motion();
    document.fonts && document.fonts.ready.then(() => typeof ScrollTrigger !== 'undefined' && ScrollTrigger.refresh());
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
