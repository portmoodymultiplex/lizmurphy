document.documentElement.classList.add('js');
// Randy Quach · Burnaby Realtor — site interactions

document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('open'));
  }

  // Transparent nav goes solid after scrolling past hero
  const nav = document.querySelector('.nav');
  if (nav && !nav.classList.contains('solid')) {
    const onScroll = () => {
      if (window.scrollY > 60) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Reveal-on-scroll
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  // Full-bleed imagery: copy rises in, picture eases from 108% to 100% as it crosses the screen
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const drifters = [...document.querySelectorAll('.coast-band video, .mx-plate img')];
  document.querySelectorAll('.coast-band').forEach(band => {
    if (!('IntersectionObserver' in window) || reduce) { band.classList.add('in-view'); return; }
    new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { band.classList.add('in-view'); o.disconnect(); } }), { threshold: 0.35 }).observe(band);
  });
  if (drifters.length && !reduce) {
    let ticking = false;
    const drift = () => {
      const vh = window.innerHeight;
      drifters.forEach(el => {
        const r = el.parentElement.getBoundingClientRect();
        const t = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
        el.style.setProperty('--zoom', (1.08 - t * 0.08).toFixed(4));
      });
      ticking = false;
    };
    drift();
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(drift); } }, { passive: true });
    window.addEventListener('resize', drift);
  }
});
