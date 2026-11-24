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
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  // Second Coast band: frame opens to full-bleed as it scrolls into view
  const bands = document.querySelectorAll('.coast-band');
  if (bands.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const tick = () => {
      bands.forEach(band => {
        const r = band.getBoundingClientRect();
        const travel = band.offsetHeight - window.innerHeight;
        const prog = Math.min(1, Math.max(0, -r.top / (travel * 0.6)));
        const frame = band.querySelector('.coast-frame');
        const copy = band.querySelector('.coast-copy');
        if (frame) frame.style.setProperty('--p', prog.toFixed(3));
        if (copy) copy.style.setProperty('--copy', Math.min(1, Math.max(0, (prog - 0.45) / 0.4)).toFixed(3));
      });
    };
    tick();
    window.addEventListener('scroll', () => requestAnimationFrame(tick), { passive: true });
    window.addEventListener('resize', tick);
  }
});
