'use strict';

/**
 * Aman Sharma — portfolio interactions
 *
 * All effects here are decorative and fully respect
 * prefers-reduced-motion. Nothing in this file is required for
 * content or navigation to work — if JS fails to load, the page
 * remains fully readable and usable.
 */

/* ============================================================
   HERO — portrait parallax on mouse move
   ============================================================ */
(function heroPhotoParallax() {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  var hero = document.getElementById('top');
  var photo = hero && hero.querySelector('.hero-v2-photo-wrap');
  if (!hero || !photo) return;

  photo.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';

  hero.addEventListener('mousemove', function (e) {
    var r = hero.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width - 0.5;
    var y = (e.clientY - r.top) / r.height - 0.5;
    photo.style.transform = 'translate(' + (x * -14) + 'px,' + (y * -10) + 'px)';
  });

  hero.addEventListener('mouseleave', function () {
    photo.style.transform = '';
  });
})();

/* ============================================================
   HERO — typing quote rotation + cursor-tracked spotlight glow
   ============================================================ */
(function heroQuoteAndSpotlight() {
  var hero = document.getElementById('top');
  if (!hero) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var quoteEl = document.getElementById('heroQuoteType');
  var lines = [
    'Pipelines that don\u2019t break at 3am are features, not coincidences.',
    'Great AI starts with reliable data \u2014 I can work on both sides of that boundary.',
    'LLMs that make things up are a liability. I build the retrieval layer that makes them trustworthy.'
  ];

  if (quoteEl) {
    if (reduced) {
      // Reduced motion: show the first line statically, no typing animation.
      quoteEl.textContent = lines[0];
    } else {
      var li = 0;
      var ci = 0;
      var typing = true;
      var pauseUntil = 0;
      var TYPE_MS = 26;
      var PAUSE_MS = 2200;
      var FADE_MS = 260;

      function tick() {
        var now = Date.now();

        if (!typing) {
          if (now < pauseUntil) {
            requestAnimationFrame(tick);
            return;
          }
          quoteEl.style.transition = 'opacity ' + FADE_MS + 'ms ease';
          quoteEl.style.opacity = '0';
          setTimeout(function () {
            li = (li + 1) % lines.length;
            ci = 0;
            typing = true;
            quoteEl.textContent = '';
            quoteEl.style.opacity = '1';
            requestAnimationFrame(tick);
          }, FADE_MS);
          return;
        }

        var line = lines[li];
        if (ci <= line.length) {
          quoteEl.textContent = line.slice(0, ci);
          ci++;
          setTimeout(function () {
            requestAnimationFrame(tick);
          }, TYPE_MS);
        } else {
          typing = false;
          pauseUntil = Date.now() + PAUSE_MS;
          requestAnimationFrame(tick);
        }
      }

      setTimeout(function () {
        requestAnimationFrame(tick);
      }, 1350);
    }
  }

  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var spot = document.getElementById('heroSpotlight');

  if (spot && canHover && !reduced) {
    var tx = 50;
    var ty = 50;
    var cx = 50;
    var cy = 50;
    var raf = null;

    function loop() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      spot.style.setProperty('--sx', cx + '%');
      spot.style.setProperty('--sy', cy + '%');
      raf = requestAnimationFrame(loop);
    }

    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 100;
      ty = ((e.clientY - r.top) / r.height) * 100;
      spot.classList.add('is-active');
      if (!raf) loop();
    });

    hero.addEventListener('mouseleave', function () {
      spot.classList.remove('is-active');
      if (raf) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    });
  }
})();

/* ============================================================
   TESTIMONIALS — "Voices" auto-advancing carousel
   Dots + arrows are real <button> elements, so keyboard/tab
   navigation works without extra handling. Auto-advance pauses
   on hover, on tab-hidden, and is skipped entirely under
   prefers-reduced-motion (the reader must navigate manually).
   ============================================================ */
(function voicesCarousel() {
  var stage = document.getElementById('voicesStage');
  var controls = document.getElementById('voicesControls');
  if (!stage || !controls) return;

  var slides = stage.querySelectorAll('.voice-slide');
  var dotsWrap = document.getElementById('voicesDots');
  var progress = document.getElementById('voicesProgress');
  var prevBtn = document.getElementById('voicesPrev');
  var nextBtn = document.getElementById('voicesNext');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DURATION = 5000;
  var idx = 0;
  var timer = null;
  var paused = false;

  slides.forEach(function (_, i) {
    var b = document.createElement('button');
    b.className = 'voices-dot' + (i === 0 ? ' is-on' : '');
    b.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
    b.addEventListener('click', function () {
      go(i);
    });
    dotsWrap.appendChild(b);
  });

  var dots = dotsWrap.querySelectorAll('.voices-dot');

  function go(i) {
    slides[idx].classList.remove('is-active');
    dots[idx].classList.remove('is-on');
    idx = (i + slides.length) % slides.length;
    slides[idx].classList.add('is-active');
    dots[idx].classList.add('is-on');
    restart();
  }

  function restart() {
    clearInterval(timer);

    if (reduced) {
      progress.style.width = '0%';
      return;
    }

    progress.style.transition = 'none';
    progress.style.width = '0%';
    requestAnimationFrame(function () {
      progress.style.transition = 'width ' + DURATION + 'ms linear';
      progress.style.width = paused ? '0%' : '100%';
    });

    if (!paused) {
      timer = setInterval(function () {
        go(idx + 1);
      }, DURATION);
    }
  }

  prevBtn.addEventListener('click', function () {
    go(idx - 1);
  });

  nextBtn.addEventListener('click', function () {
    go(idx + 1);
  });

  if (!reduced) {
    controls.parentElement.addEventListener('mouseenter', function () {
      paused = true;
      clearInterval(timer);
      progress.style.transition = 'none';
    });

    controls.parentElement.addEventListener('mouseleave', function () {
      paused = false;
      restart();
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        paused = true;
        clearInterval(timer);
      } else {
        paused = false;
        restart();
      }
    });
  }

  restart();
})();