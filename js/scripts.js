/* ==========================================================
   Portfolio — c0d3g33k.github.io
   Vanilla JS — no jQuery dependency
   ========================================================== */
(function () {
  'use strict';

  // --- Sticky nav background on scroll ---
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial check

  // --- Mobile menu toggle ---
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  var overlay = document.querySelector('.nav-overlay');

  function closeMenu() {
    toggle.classList.remove('open');
    links.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function openMenu() {
    toggle.classList.add('open');
    links.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  toggle.addEventListener('click', function () {
    if (toggle.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu on link click
  var navAnchors = links.querySelectorAll('a');
  navAnchors.forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  // Close menu on overlay click
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.classList.contains('open')) {
      closeMenu();
    }
  });

  // --- Active nav link via IntersectionObserver ---
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -75% 0px'
  });

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  // --- Scroll reveal animations ---
  var reveals = document.querySelectorAll('.reveal');

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(function (el) {
    revealObserver.observe(el);
  });

})();
