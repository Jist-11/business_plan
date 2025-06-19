const confetti = {
  start: () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      window.confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      window.confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  },
  stop: () => { /* nothing to stop */ }
};

(function() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
  document.head.appendChild(script);
})();