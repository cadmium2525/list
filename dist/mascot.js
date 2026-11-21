(() => {
  'use strict';
  const mascot = document.getElementById('mascot');
  if (!mascot) return;

  const nudge = mascot.querySelector('[data-mascot-nudge]');
  const pause = mascot.querySelector('[data-mascot-pause]');
  const caption = mascot.querySelector('[data-mascot-caption]');
  const status = mascot.querySelector('[data-mascot-status]');
  const idleCaption = caption.textContent;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const peek = document.querySelector('.mascot-peek');
  const scenes = [
    { action: 'draw', text: 'ひと筆、くるり。なにができるかな？', duration: 3100 },
    { action: 'bounce', text: 'ぴょん。……もう一回！', duration: 2500 },
    { action: 'star', text: 'いいこと、ひとつ思いついた！', duration: 2700 },
    { action: 'doze', text: 'まぶたが、ちょっとだけ重たい。', duration: 5200 },
  ];
  let visible = !('IntersectionObserver' in window);
  let paused = false;
  let next = 0;
  let timer;
  let lastPeekAt = -Infinity;
  let lastPeekY = null;

  function peekOnScroll() {
    if (document.hidden || motion.matches || paused) return;
    if (mascot.getBoundingClientRect().bottom > 0) {
      peek.classList.remove('is-peeking');
      lastPeekY = null;
      return;
    }
    const now = performance.now();
    if (now - lastPeekAt < 7000) return;
    if (lastPeekY !== null && Math.abs(scrollY - lastPeekY) < innerHeight * .55) return;
    lastPeekY = scrollY;
    lastPeekAt = now;
    peek.classList.add('is-peeking');
  }

  const canAutoplay = () => visible && !document.hidden && !motion.matches && !paused;

  function rest() {
    mascot.dataset.action = 'idle';
    caption.textContent = idleCaption;
  }

  function schedule(delay) {
    clearTimeout(timer);
    if (canAutoplay()) timer = setTimeout(() => play(false), delay);
  }

  function play(manual) {
    clearTimeout(timer);
    const scene = scenes[next];
    next = (next + 1) % scenes.length;
    mascot.dataset.action = scene.action;
    caption.textContent = scene.text;
    if (manual) status.textContent = scene.text;
    timer = setTimeout(() => {
      rest();
      schedule(3400 + Math.random() * 2100);
    }, scene.duration);
  }

  function sync() {
    if (visible || paused || motion.matches || document.hidden) peek.classList.remove('is-peeking');
    mascot.classList.toggle('is-running', canAutoplay());
    pause.hidden = motion.matches;
    pause.textContent = paused ? '自動で動く' : '一時停止';
    pause.setAttribute('aria-label', paused ? 'ひらめっこの自動の動きを再開' : 'ひらめっこの自動の動きを一時停止');
    rest();
    schedule(2800);
  }

  nudge.hidden = false;
  window.addEventListener('scroll', peekOnScroll, { passive: true });
  peek.addEventListener('animationend', () => peek.classList.remove('is-peeking'));
  nudge.addEventListener('click', () => play(true));
  pause.addEventListener('click', () => { paused = !paused; sync(); });
  document.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', sync);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      if (visible === entry.isIntersecting) return;
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.1 }).observe(mascot);
  }
  sync();
})();
