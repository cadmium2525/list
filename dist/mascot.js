(() => {
  'use strict';
  const peek = document.querySelector('.mascot-peek');
  const filters = document.querySelector('.discovery-panel');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const edges = ['left', 'right', 'top', 'bottom'];
  let lastPeekAt = -Infinity;
  let lastPeekY = null;

  const hidePeek = () => peek.classList.remove('is-peeking');

  function peekOnScroll() {
    if (document.hidden || motion.matches) return;
    if (scrollY < 120 || filters.getBoundingClientRect().bottom > innerHeight / 3) {
      hidePeek();
      lastPeekY = null;
      return;
    }
    const now = performance.now();
    if (now - lastPeekAt < 7000) return;
    if (lastPeekY !== null && Math.abs(scrollY - lastPeekY) < innerHeight * .55) return;
    lastPeekY = scrollY;
    lastPeekAt = now;
    const choices = edges.filter(edge => edge !== peek.dataset.edge);
    peek.dataset.edge = choices[Math.floor(Math.random() * choices.length)];
    peek.style.setProperty('--peek-position', (12 + Math.random() * 62) + '%');
    peek.classList.add('is-peeking');
  }

  window.addEventListener('scroll', peekOnScroll, { passive: true });
  peek.addEventListener('animationend', hidePeek);
  document.addEventListener('visibilitychange', hidePeek);
  motion.addEventListener('change', hidePeek);
})();
