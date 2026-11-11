"use strict";

const addEventOnElements = function (elements, eventType, callback) {
  if (!elements || !elements.length) return;

  Array.from(elements).forEach(function (element) {
    if (element) {
      element.addEventListener(eventType, callback);
    }
  });
};

const preloader = document.querySelector("[data-preaload]");

if (preloader) {
  window.addEventListener("load", function () {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
  });
}

const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navOpenButton = document.querySelector(".nav-open-btn");

const closeNavbar = function () {
  if (!navbar || !overlay) return;

  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("nav-active");
  if (navOpenButton) navOpenButton.setAttribute("aria-expanded", "false");
};

const toggleNavbar = function () {
  if (!navbar || !overlay) return;

  const isOpen = navbar.classList.toggle("active");
  overlay.classList.toggle("active", isOpen);
  document.body.classList.toggle("nav-active", isOpen);
  if (navOpenButton) navOpenButton.setAttribute("aria-expanded", String(isOpen));
};

addEventOnElements(navTogglers, "click", toggleNavbar);
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeNavbar();
});

const navLinks = document.querySelectorAll(".navbar-link");
Array.from(navLinks).forEach(function (link) {
  link.addEventListener("click", closeNavbar);
});

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");
let lastScrollPos = 0;

const updateHeaderState = function () {
  if (!header || !backTopBtn) return;

  const scrolled = window.scrollY >= 50;
  const isScrollDown = lastScrollPos < window.scrollY;

  header.classList.toggle("active", scrolled);
  header.classList.toggle("hide", isScrollDown && scrolled);
  backTopBtn.classList.toggle("active", scrolled);

  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", updateHeaderState, { passive: true });

const sections = document.querySelectorAll("section[id], div[id]");
const quickNavLinks = document.querySelectorAll(".quick-nav-link");

if (sections.length) {
  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute("id");
        const activeLink = document.querySelector(`.navbar-link[href="#${id}"]`);

        navLinks.forEach(function (link) {
          link.classList.remove("active");
        });

        if (activeLink) {
          activeLink.classList.add("active");
        }

        quickNavLinks.forEach(function (link) {
          const isCurrent = link.getAttribute("href") === `#${id}`;
          link.classList.toggle("active", isCurrent);
          if (isCurrent) {
            link.setAttribute("aria-current", "page");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });
}

const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const prevBtn = document.querySelector("[data-prev-btn]");
const nextBtn = document.querySelector("[data-next-btn]");

if (heroSliderItems.length) {
  let currentSlide = 0;
  let lastActiveSlide = heroSliderItems[0];
  let autoSlideTimer;

  const goToSlide = function (index) {
    if (!heroSliderItems[index]) return;

    lastActiveSlide.classList.remove("active");
    heroSliderItems[index].classList.add("active");
    lastActiveSlide = heroSliderItems[index];
    currentSlide = index;
  };

  const slideNext = function () {
    const nextIndex = currentSlide >= heroSliderItems.length - 1 ? 0 : currentSlide + 1;
    goToSlide(nextIndex);
  };

  const slidePrev = function () {
    const prevIndex = currentSlide <= 0 ? heroSliderItems.length - 1 : currentSlide - 1;
    goToSlide(prevIndex);
  };

  const startAutoSlide = function () {
    autoSlideTimer = setInterval(slideNext, 7000);
  };

  const stopAutoSlide = function () {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
    }
  };

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      stopAutoSlide();
      slideNext();
      startAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      stopAutoSlide();
      slidePrev();
      startAutoSlide();
    });
  }

  addEventOnElements([prevBtn, nextBtn], "mouseenter", stopAutoSlide);
  addEventOnElements([prevBtn, nextBtn], "mouseleave", startAutoSlide);
  addEventOnElements([prevBtn, nextBtn], "focusin", stopAutoSlide);
  addEventOnElements([prevBtn, nextBtn], "focusout", startAutoSlide);

  window.addEventListener("load", startAutoSlide);
}

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

if (parallaxItems.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener("mousemove", function (event) {
    const moveX = -((event.clientX / window.innerWidth) * 10 - 5);
    const moveY = -((event.clientY / window.innerHeight) * 10 - 5);

    Array.from(parallaxItems).forEach(function (item) {
      const speed = Number(item.dataset.parallaxSpeed || 1);
      item.style.transform = `translate3d(${moveX * speed}px, ${moveY * speed}px, 0)`;
    });
  });
}

const revealItems = document.querySelectorAll(".reveal-item");

if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach(function (item) {
    revealObserver.observe(item);
  });
}

const reservationForm = document.getElementById("reservationForm");

if (reservationForm) {
  reservationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = reservationForm.querySelector('[name="name"]').value.trim();
    const phone = reservationForm.querySelector('[name="phone"]').value.trim();
    const date = reservationForm.querySelector('[name="date"]').value;

    if (!name || !phone || !date) {
      showFormMessage(reservationForm, "Please fill in your name, phone number, and date.", "error");
      return;
    }

    const submitBtn = reservationForm.querySelector('[type="submit"]');
    const guests = reservationForm.querySelector('[name="guests"]').value;
    const time = reservationForm.querySelector('[name="time"]').value;
    const message = reservationForm.querySelector('[name="message"]').value.trim();

    const subject = encodeURIComponent(`Table Reservation — ${name} — ${date}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nGuests: ${guests}\nDate: ${date}\nTime: ${time}\n\nRequests:\n${message}`
    );

    submitBtn.disabled = true;
    submitBtn.querySelector(".text-1").textContent = "Sending…";

    window.location.href = `mailto:brianprofocus@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(function () {
      showFormMessage(
        reservationForm,
        "✓ Email client opened. We will confirm your reservation shortly.",
        "success"
      );
      submitBtn.querySelector(".text-1").textContent = "Confirmed ✓";
    }, 900);
  });
}

const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailInput = newsletterForm.querySelector("[type='email']");
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
      emailInput.style.borderColor = "#e74c3c";
      emailInput.focus();
      return;
    }

    emailInput.style.borderColor = "";

    const button = newsletterForm.querySelector("[type='submit']");
    const buttonText = button.querySelector(".text-1");
    buttonText.textContent = "Subscribed ✓";
    button.disabled = true;
    emailInput.value = "";
  });
}

function showFormMessage(form, text, type) {
  const existingMessage = form.querySelector(".form-message");
  if (existingMessage) existingMessage.remove();

  const message = document.createElement("p");
  message.className = "form-message";
  message.textContent = text;
  message.style.cssText = [
    "margin-top: 14px",
    "padding: 10px 16px",
    "border-radius: 6px",
    "font-size: 1.3rem",
    "text-align: center",
    type === "success"
      ? "background: rgba(0,180,100,.1); color: #00b464; border: 1px solid rgba(0,180,100,.2)"
      : "background: rgba(231,76,60,.1); color: #e74c3c; border: 1px solid rgba(231,76,60,.2)"
  ].join(";");

  form.appendChild(message);
}
