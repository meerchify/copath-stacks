/* Storefront micro-interactions. Kept dependency-free (no React here — this is a
   Liquid theme). Scroll reveals are FAIL-OPEN: content is visible by default and
   only animated in once this runs, so a JS error can never blank the page. */
(function () {
  function initReveal() {
    var els = document.querySelectorAll('.reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach(function (el) { obs.observe(el); });
    // Safety net: never leave anything hidden if the observer never fires.
    setTimeout(function () {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach(function (el) {
        el.classList.add('is-visible');
      });
    }, 2500);
  }

  // Shrink the header on scroll (sticky depth cue).
  function initHeaderShrink() {
    var header = document.querySelector('[data-sticky-header]');
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function boot() {
    initReveal();
    initHeaderShrink();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
