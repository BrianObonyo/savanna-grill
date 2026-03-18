'use strict';

/* ═══════════════════════════════════════════
   PRELOADER
   Hides once the document has fully loaded
═══════════════════════════════════════════ */

const preloader = document.querySelector('[data-preaload]');

window.addEventListener('load', function () {
  preloader.classList.add('loaded');
  document.body.classList.add('loaded');
});


/* ═══════════════════════════════════════════
   UTILITY — attach the same listener to
   multiple elements without a loop every time
═══════════════════════════════════════════ */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};


/* ═══════════════════════════════════════════
   NAVBAR — mobile open/close
═══════════════════════════════════════════ */

const navbar      = document.querySelector('[data-navbar]');
const navTogglers = document.querySelectorAll('[data-nav-toggler]');
const overlay     = document.querySelector('[data-overlay]');

const toggleNavbar = function () {
  navbar.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.classList.toggle('nav-active');
};

addEventOnElements(navTogglers, 'click', toggleNavbar);


/* ═══════════════════════════════════════════
   HEADER — scroll hide/show + active state
═══════════════════════════════════════════ */

const header      = document.querySelector('[data-header]');
const backTopBtn  = document.querySelector('[data-back-top-btn]');
const navLinks    = document.querySelectorAll('.navbar-link');

let lastScrollPos = 0;

window.addEventListener('scroll', function () {
  const scrolled = window.scrollY >= 50;

  // active / shadow state
  header.classList.toggle('active', scrolled);
  backTopBtn.classList.toggle('active', scrolled);

  // hide on scroll down, reveal on scroll up
  const isScrollDown = lastScrollPos < window.scrollY;
  header.classList.toggle('hide', isScrollDown && scrolled);

  lastScrollPos = window.scrollY;
});


/* ═══════════════════════════════════════════
   ACTIVE NAV LINK on scroll
   Highlights the nav item whose section is
   currently in view
═══════════════════════════════════════════ */

const sections = document.querySelectorAll('section[id], div[id]');

const sectionObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      const id  = entry.target.getAttribute('id');
      const activeLink = document.querySelector(`.navbar-link[href="#${id}"]`);

      navLinks.forEach(l => l.classList.remove('active'));
      if (activeLink) activeLink.classList.add('active');
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));


/* ═══════════════════════════════════════════
   HERO SLIDER
═══════════════════════════════════════════ */

const heroSlider     = document.querySelector('[data-hero-slider]');
const heroSliderItems = document.querySelectorAll('[data-hero-slider-item]');
const prevBtn        = document.querySelector('[data-prev-btn]');
const nextBtn        = document.querySelector('[data-next-btn]');

let currentSlide       = 0;
let lastActiveSlide    = heroSliderItems[0];
let autoSlideInterval;

const goToSlide = function (index) {
  lastActiveSlide.classList.remove('active');
  heroSliderItems[index].classList.add('active');
  lastActiveSlide = heroSliderItems[index];
  currentSlide    = index;
};

const slideNext = function () {
  const next = currentSlide >= heroSliderItems.length - 1 ? 0 : currentSlide + 1;
  goToSlide(next);
};

const slidePrev = function () {
  const prev = currentSlide <= 0 ? heroSliderItems.length - 1 : currentSlide - 1;
  goToSlide(prev);
};

nextBtn.addEventListener('click', slideNext);
prevBtn.addEventListener('click', slidePrev);

/* Auto-advance every 7 s; pause while hovering controls */
const startAutoSlide = function () {
  autoSlideInterval = setInterval(slideNext, 7000);
};

const stopAutoSlide = function () {
  clearInterval(autoSlideInterval);
};

addEventOnElements([prevBtn, nextBtn], 'mouseover',  stopAutoSlide);
addEventOnElements([prevBtn, nextBtn], 'mouseout',   startAutoSlide);
addEventOnElements([prevBtn, nextBtn], 'focusin',    stopAutoSlide);
addEventOnElements([prevBtn, nextBtn], 'focusout',   startAutoSlide);

window.addEventListener('load', startAutoSlide);


/* ═══════════════════════════════════════════
   PARALLAX EFFECT
   FIXED: original bug multiplied x/y by speed
   on every loop iteration, compounding the
   offset incorrectly. Now each item calculates
   its own offset from the base values.
═══════════════════════════════════════════ */

const parallaxItems = document.querySelectorAll('[data-parallax-item]');

window.addEventListener('mousemove', function (event) {
  /* Normalise to -5 … 5 range, inverted */
  const baseX = -((event.clientX / window.innerWidth  * 10) - 5);
  const baseY = -((event.clientY / window.innerHeight * 10) - 5);

  for (let i = 0; i < parallaxItems.length; i++) {
    const speed = Number(parallaxItems[i].dataset.parallaxSpeed);
    const x = baseX * speed;
    const y = baseY * speed;
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }
});


/* ═══════════════════════════════════════════
   SCROLL REVEAL — IntersectionObserver
   Triggers .revealed on .reveal-item elements
   as they enter the viewport
═══════════════════════════════════════════ */

const revealItems = document.querySelectorAll('.reveal-item');

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach(el => revealObserver.observe(el));


/* ═══════════════════════════════════════════
   RESERVATION FORM — basic validation &
   user feedback (mailto fallback)
═══════════════════════════════════════════ */

const reservationForm = document.getElementById('reservationForm');

if (reservationForm) {
  reservationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name  = reservationForm.querySelector('[name="name"]').value.trim();
    const phone = reservationForm.querySelector('[name="phone"]').value.trim();
    const date  = reservationForm.querySelector('[name="date"]').value;

    if (!name || !phone || !date) {
      showFormMessage(reservationForm, 'Please fill in your name, phone number, and date.', 'error');
      return;
    }

    const submitBtn = reservationForm.querySelector('[type="submit"]');
    const guests    = reservationForm.querySelector('[name="guests"]').value;
    const time      = reservationForm.querySelector('[name="time"]').value;
    const message   = reservationForm.querySelector('[name="message"]').value.trim();

    const subject = encodeURIComponent(`Table Reservation — ${name} — ${date}`);
    const body    = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nGuests: ${guests}\nDate: ${date}\nTime: ${time}\n\nRequests:\n${message}`
    );

    submitBtn.disabled = true;
    submitBtn.querySelector('.text-1').textContent = 'Sending…';

    window.location.href = `mailto:brianprofocus@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(function () {
      showFormMessage(reservationForm, '✓ Email client opened. We will confirm your reservation shortly.', 'success');
      submitBtn.querySelector('.text-1').textContent = 'Confirmed ✓';
    }, 800);
  });
}


/* ═══════════════════════════════════════════
   NEWSLETTER FORM — basic email validation
═══════════════════════════════════════════ */

const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = newsletterForm.querySelector('[type="email"]');
    const email      = emailInput.value.trim();
    const emailRe    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRe.test(email)) {
      emailInput.style.borderColor = '#e74c3c';
      emailInput.focus();
      return;
    }

    emailInput.style.borderColor = '';
    const btn = newsletterForm.querySelector('[type="submit"]');
    btn.querySelector('.text-1').textContent = 'Subscribed ✓';
    btn.disabled = true;
    emailInput.value = '';
  });
}


/* ═══════════════════════════════════════════
   UTILITY — show inline form messages
═══════════════════════════════════════════ */

function showFormMessage(form, text, type) {
  // Remove existing message if any
  const existing = form.querySelector('.form-message');
  if (existing) existing.remove();

  const msg = document.createElement('p');
  msg.className = 'form-message';
  msg.textContent = text;
  msg.style.cssText = [
    'margin-top: 14px',
    'padding: 10px 16px',
    'border-radius: 6px',
    'font-size: 1.3rem',
    'text-align: center',
    type === 'success'
      ? 'background: rgba(0,180,100,.1); color: #00b464; border: 1px solid rgba(0,180,100,.2)'
      : 'background: rgba(231,76,60,.1); color: #e74c3c; border: 1px solid rgba(231,76,60,.2)',
  ].join(';');

  form.appendChild(msg);
}