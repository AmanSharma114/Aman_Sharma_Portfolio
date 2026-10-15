'use strict';

/* Hero effects respond immediately to motion preferences and tab visibility. */
(function heroInteractions() {
  var hero = document.getElementById('top');
  if (!hero) return;
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  var photo = hero.querySelector('.hero-v2-photo-wrap');
  var spot = document.getElementById('heroSpotlight');
  var quote = document.getElementById('heroQuoteType');
  var lines = [
    'Pipelines that don’t break at 3am are features, not coincidences.',
    'Great AI starts with reliable data — I can work on both sides of that boundary.',
    'LLMs that make things up are a liability. I build the retrieval layer that makes them trustworthy.'
  ];
  var timer = null;
  var line = 0;
  var character = 0;
  var frame = null;
  var tx = 50, ty = 50, cx = 50, cy = 50;
  function canAnimate() { return !motion.matches && !document.hidden; }
  function nextQuote() {
    if (!quote || !canAnimate()) return;
    quote.style.opacity = '0';
    timer = setTimeout(function () {
      line = (line + 1) % lines.length;
      character = 0;
      quote.textContent = '';
      quote.style.opacity = '1';
      typeQuote();
    }, 240);
  }
  function typeQuote() {
    if (!canAnimate()) return;
    character++;
    quote.textContent = lines[line].slice(0, character);
    timer = setTimeout(character < lines[line].length ? typeQuote : nextQuote,
      character < lines[line].length ? 26 : 6000);
  }
  function settleSpotlight() {
    cx += (tx - cx) * .18;
    cy += (ty - cy) * .18;
    spot.style.setProperty('--sx', cx + '%');
    spot.style.setProperty('--sy', cy + '%');
    frame = Math.abs(tx - cx) + Math.abs(ty - cy) > .1 ? requestAnimationFrame(settleSpotlight) : null;
  }
  function resetPointer() {
    if (photo) photo.style.transform = '';
    if (spot) spot.classList.remove('is-active');
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
  }
  function reset() {
    clearTimeout(timer);
    resetPointer();
    if (!quote) return;
    if (motion.matches) line = 0;
    quote.textContent = lines[line];
    quote.style.opacity = '1';
    quote.style.transition = 'opacity .24s ease';
    if (canAnimate()) timer = setTimeout(nextQuote, 6000);
  }
  if (photo) photo.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
  hero.addEventListener('mousemove', function (event) {
    if (!canAnimate() || !pointer.matches) return;
    var bounds = hero.getBoundingClientRect();
    tx = (event.clientX - bounds.left) / bounds.width * 100;
    ty = (event.clientY - bounds.top) / bounds.height * 100;
    if (photo) photo.style.transform = 'translate(' + ((tx / 100 - .5) * -14) + 'px,' + ((ty / 100 - .5) * -10) + 'px)';
    if (spot) {
      spot.classList.add('is-active');
      if (frame === null) frame = requestAnimationFrame(settleSpotlight);
    }
  });
  hero.addEventListener('mouseleave', resetPointer);
  motion.addEventListener('change', reset);
  pointer.addEventListener('change', resetPointer);
  document.addEventListener('visibilitychange', reset);
  reset();
})();

/* Accessible carousel: manual controls, explicit pause and stable reading space. */
(function voicesCarousel() {
  var stage = document.getElementById('voicesStage');
  var controls = document.getElementById('voicesControls');
  if (!stage || !controls) return;
  var slides = Array.from(stage.querySelectorAll('.voice-slide'));
  if (!slides.length) return;
  var dotsWrap = document.getElementById('voicesDots');
  var progress = document.getElementById('voicesProgress');
  var pause = document.getElementById('voicesPause');
  var status = document.getElementById('voicesStatus');
  var section = document.getElementById('voices');
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var duration = 18000;
  var index = 0;
  var timer = null;
  var progressFrame = null;
  var paused = false;
  var hovered = false;
  var focused = false;
  var inView = !('IntersectionObserver' in window);
  slides.forEach(function (slide, i) {
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'voices-dot' + (i === 0 ? ' is-on' : '');
    dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
    dot.setAttribute('aria-controls', slide.id);
    dot.setAttribute('aria-pressed', String(i === 0));
    dot.addEventListener('click', function () { go(i, true); });
    dotsWrap.appendChild(dot);
  });
  var dots = dotsWrap.querySelectorAll('button');
  function restart() {
    clearTimeout(timer);
    if (progressFrame !== null) cancelAnimationFrame(progressFrame);
    progress.style.transition = 'none';
    progress.style.width = '0%';
    pause.disabled = motion.matches;
    pause.textContent = motion.matches ? 'Paused' : (paused ? 'Play' : 'Pause');
    pause.setAttribute('aria-pressed', String(paused || motion.matches));
    pause.setAttribute('aria-label', motion.matches ? 'Auto-play disabled for reduced motion' : (paused ? 'Play automatic testimonials' : 'Pause automatic testimonials'));
    if (paused || hovered || focused || motion.matches || document.hidden || !inView) return;
    progressFrame = requestAnimationFrame(function () {
      progressFrame = null;
      progress.style.transition = 'width ' + duration + 'ms linear';
      progress.style.width = '100%';
    });
    timer = setTimeout(function () { go(index + 1, false); }, duration);
  }
  function go(next, manual) {
    index = (next + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      slide.hidden = i !== index;
      slide.classList.toggle('is-active', i === index);
      dots[i].classList.toggle('is-on', i === index);
      dots[i].setAttribute('aria-pressed', String(i === index));
    });
    if (manual) status.textContent = 'Testimonial ' + (index + 1) + ' of ' + slides.length;
    restart();
  }
  document.getElementById('voicesPrev').addEventListener('click', function () { go(index - 1, true); });
  document.getElementById('voicesNext').addEventListener('click', function () { go(index + 1, true); });
  pause.addEventListener('click', function () { paused = !paused; restart(); });
  section.addEventListener('mouseenter', function () { hovered = true; restart(); });
  section.addEventListener('mouseleave', function () { hovered = false; restart(); });
  section.addEventListener('focusin', function () { focused = true; restart(); });
  section.addEventListener('focusout', function (event) {
    if (!section.contains(event.relatedTarget)) { focused = false; restart(); }
  });
  motion.addEventListener('change', restart);
  document.addEventListener('visibilitychange', restart);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      restart();
    }, { threshold: .1 }).observe(section);
  }
  // Measure hidden slides without exposing them to assistive technology.
  var lastWidth = 0;
  var lastFontSize = '';
  function measure(force) {
    var style = getComputedStyle(stage);
    var width = stage.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    if (!force && width === lastWidth && style.fontSize === lastFontSize) return;
    lastWidth = width;
    lastFontSize = style.fontSize;
    var tallest = 0;
    slides.forEach(function (slide) {
      var clone = slide.cloneNode(true);
      clone.removeAttribute('id');
      clone.hidden = false;
      clone.inert = true;
      clone.setAttribute('aria-hidden', 'true');
      clone.style.cssText = 'position:absolute;inset:auto;visibility:hidden;display:block;width:' + width + 'px;height:auto;min-height:0;';
      stage.appendChild(clone);
      tallest = Math.max(tallest, clone.getBoundingClientRect().height);
      clone.remove();
    });
    stage.style.minHeight = Math.ceil(tallest) + 'px';
  }
  if ('ResizeObserver' in window) new ResizeObserver(function () { measure(false); }).observe(stage);
  else window.addEventListener('resize', function () { measure(false); });
  if (document.fonts) document.fonts.ready.then(function () { measure(true); });
  controls.hidden = false;
  measure(true);
  go(0, false);
})();

/* Compact navigation: keyboard dismissal and focus return. */
(function siteNavigation() {
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('site-menu');
  if (!toggle || !menu) return;
  toggle.hidden = false;
  document.querySelector('.site-nav').classList.add('has-menu-toggle');
  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
  }
  toggle.addEventListener('click', function () {
    var open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  });
  menu.addEventListener('click', function (event) {
    var link = event.target.closest('a');
    if (!link) return;
    closeMenu();
    var target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });
  document.addEventListener('click', function (event) {
    if (!event.target.closest('.site-nav')) closeMenu();
  });
  document.addEventListener('focusin', function (event) {
    if (!event.target.closest('.site-nav')) closeMenu();
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
})();

/* Animate visible content once; content never depends on animation to appear. */
(function sectionEntrances() {
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches) return;
  var running = new Set();
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      if (motion.matches) return;
      var animation = entry.target.animate([
        { opacity: .35, transform: 'translateY(12px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 450, easing: 'cubic-bezier(.2,.7,.2,1)' });
      running.add(animation);
      animation.onfinish = function () { running.delete(animation); };
    });
  }, { threshold: .08 });
  document.querySelectorAll('.head, .ngflow, .metric, .hire-card, .case, .tool, .job, .cred, .award, .mini, .voices-head').forEach(function (element) {
    observer.observe(element);
  });
  motion.addEventListener('change', function () {
    if (!motion.matches) return;
    running.forEach(function (animation) { animation.cancel(); });
    running.clear();
    observer.disconnect();
  });
})();

/* Mark the section being read and show progress through the portfolio. */
(function readingNavigation() {
  var links = Array.from(document.querySelectorAll('.site-links a[href^="#"]'));
  var sections = links.map(function (link) { return document.querySelector(link.getAttribute('href')); });
  var progress = document.querySelector('.reading-progress > span');
  var header = document.querySelector('.navbox');
  var scheduled = false;
  function updateHeaderOffset() {
    document.documentElement.style.setProperty('--header-offset', Math.ceil(header.getBoundingClientRect().height + 20) + 'px');
  }
  if ('ResizeObserver' in window) new ResizeObserver(updateHeaderOffset).observe(header);
  else window.addEventListener('resize', updateHeaderOffset);
  updateHeaderOffset();
  function update() {
    scheduled = false;
    var readingLine = header.getBoundingClientRect().bottom + 100;
    var active = null;
    sections.forEach(function (section, index) {
      if (!section) return;
      var bounds = section.getBoundingClientRect();
      if (bounds.top <= readingLine && bounds.bottom > readingLine) active = links[index];
    });
    links.forEach(function (link) {
      if (link === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    if (progress) {
      var distance = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = 'scaleX(' + Math.min(1, Math.max(0, distance > 0 ? window.scrollY / distance : 0)) + ')';
    }
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(update);
  }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('load', schedule);
  document.addEventListener('toggle', schedule, true);
  update();
})();
