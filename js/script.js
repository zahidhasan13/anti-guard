// All Elements
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const navLinks = document.querySelector(".nav-links");
const navToggle = document.querySelector(".nav-toggle");
const btnScrollTo = document.querySelector(".btn-scroll-to");
const allSections = document.querySelectorAll(".section");
const features = document.querySelector("#features");
const imageTargets = document.querySelectorAll("img[data-src");
const tabContainer = document.querySelector(".operations-tab-container");
const tabs = document.querySelectorAll(".operation-tab");
const tabsContent = document.querySelectorAll(".operation-content");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnOpenModal = document.querySelectorAll(".btn-show-modal");
const btnCloseModal = document.querySelector(".btn-close-modal");
const cookieBody = document.querySelector(".cookie");
const cookieCloseBtn = document.querySelector(".cookie-close");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider-btn-left");
const btnRight = document.querySelector(".slider-btn-right");
const dotContainer = document.querySelector(".dots");
const dotActive = document.querySelector(".dots-dot-active");

// Cookie Script
cookieCloseBtn.addEventListener("click", () => {
  cookieBody.classList.add("hidden");
  cookieBody.style.bottom = "-12rem";
});

// Navbar Sticky
// nav height
const navHeight = nav.getBoundingClientRect().height;

const sticky = (entries) => {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const observeHero = new IntersectionObserver(sticky, {
  root: null,
  threshold: 0.5,
  rootMargin: `${navHeight}px`,
});

observeHero.observe(header);

// Reveal Section
const revealSection = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};

const sectionObs = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach((section) => {
  sectionObs.observe(section);
  section.classList.add("section-hidden");
});

// Open Modal

const openModal = (e) => {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
btnOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

// Close Modal

const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// key press close modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Smooth behavior
navLinks.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("nav-link")) {
    const attr = e.target.getAttribute("href");
    document.querySelector(attr).scrollIntoView({ behavior: "smooth" });
  }
});

// Nav Toggle
navToggle.addEventListener("click", () => {
  if (navLinks.classList.contains("nav-open")) {
    navLinks.classList.remove("nav-open");
    document.querySelector("html").style.overflow = "visible";
  } else {
    navLinks.classList.add("nav-open");
    document.querySelector("html").style.overflow = "hidden";
  }
});

navLinks.addEventListener("click", () => {
  navLinks.classList.contains("nav-open") &&
    navLinks.classList.remove("nav-open");
  document.querySelector("html").style.overflow = "visible";
});

// Learn more scroll
btnScrollTo.addEventListener("click", () => {
  features.scrollIntoView({ behavior: "smooth" });
});

// Lazy Images
const lazyImage = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  });
};

const imageObs = new IntersectionObserver(lazyImage, {
  root: null,
  threshold: 0.1,
});
imageTargets.forEach((img) => imageObs.observe(img));

// Testimonial Slide
let currentSilde = 0;
const maxSlide = slides.length - 1;

// create dots
const cratingDots = () => {
  slides.forEach((_, i) => {
    const dot = `<button class="dots-dot" data-slide="${i}"></button>`;

    dotContainer.insertAdjacentHTML("beforeend", dot);
  });
};
cratingDots();

// Active dots
const activateDots = (sl) => {
  document
    .querySelectorAll(".dots-dot")
    .forEach((dot) => dot.classList.remove("dots-dot-active"));
  document
    .querySelector(`.dots-dot[data-slide="${sl}"]`)
    .classList.add("dots-dot-active");
};
activateDots(0);
// Change Slide
const changeSlide = (currSlide) => {
  slides.forEach((sl, i) => {
    sl.style.transform = `translateX(${100 * (i - currSlide)}%`;
  });
};
changeSlide(0);
const prevSlide = () => {
  currentSilde === 0 ? (currentSilde = maxSlide) : currentSilde--;
  changeSlide(currentSilde);
  activateDots(currentSilde);
};
const nextSlide = () => {
  currentSilde === maxSlide ? (currentSilde = 0) : currentSilde++;
  changeSlide(currentSilde);
  activateDots(currentSilde);
};

// dot event
dotContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("dots-dot")) {
    activateDots(e.target.dataset.slide);
    changeSlide(e.target.dataset.slide);
  }
});

btnLeft.addEventListener("click", prevSlide);
btnRight.addEventListener("click", nextSlide);

// keyboard
document.addEventListener("keydown", (e) => {
  e.key == "ArrowLeft" && prevSlide();
  e.key == "ArrowRight" && nextSlide();
});

// Tab Operation
tabContainer.addEventListener("click", (e) => {
  console.log(e.target);

  const btn = e.target.closest(".operation-tab");

  if (!btn) return;

  tabs.forEach((tab) => tab.classList.remove("operation-tab-active"));
  tabsContent.forEach((content) =>
    content.classList.remove("operation-content-active")
  );

  btn.classList.add("operation-tab-active");
  document
    .querySelector(`.operation-content-${btn.dataset.tab}`)
    .classList.add("operation-content-active");
});