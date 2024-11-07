// All Elements
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const navLinks = document.querySelector(".nav-links");
const btnScrollTo = document.querySelector(".btn-scroll-to");
const allSections = document.querySelectorAll(".section");
const features = document.querySelector("#features");
const imageTargets = document.querySelectorAll("img[data-src");
const tabContainer = document.querySelector(".operation-tab-container");
const tabs = document.querySelectorAll(".operation-tab");
const tabsContent = document.querySelectorAll(".operation-content");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnOpenModal = document.querySelectorAll(".btn-show-modal");
const btnCloseModal = document.querySelector(".btn-close-modal");
const cookieBody = document.querySelector(".cookie");
const cookieCloseBtn = document.querySelector(".cookie-close");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector("slider-btn-left");
const btnright = document.querySelector("slider-btn-right");
const dotContainer = document.querySelector("dots");

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
