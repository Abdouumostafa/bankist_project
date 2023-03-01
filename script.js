"use strict";

// Elements
const btnShowModal = document.querySelectorAll(".btn--show-modal");
const btnCloseModal = document.querySelector(".btn--close-modal");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const navMainLink = document.querySelectorAll(".nav__link");
const tab = document.querySelectorAll(".operations__tab");
const tabContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");

// open and close modal functions
const openModal = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
for (let i = 0; i < btnShowModal.length; i++) {
  btnShowModal[i].addEventListener("click", openModal);
}
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// Scrolling btn
btnScrollTo.addEventListener("click", () => {
  section1.scrollIntoView({ behavior: "smooth" });
});

// Scrolling navs
/* 
1- loop of each element in nav
2- add event to make a fuction when clicking on the element
3- make a variable which containes the href 
4- variable.scrollIntoView({behavior: 'smooth'}) 
*/
navMainLink.forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    const id = document.querySelector(this.getAttribute("href"));
    id.scrollIntoView({ behavior: "smooth" });
  });
});

// IMPORTANTTTTTTTTTTTTTTT

tab.forEach(function (e) {
  e.addEventListener("click", function (el) {
    tab.forEach(function (elm) {
      elm.classList.remove("operations__tab--active");
    });

    tabContent.forEach(function (elm) {
      elm.classList.remove("operations__content--active");
    });

    const clicked = el.target;

    clicked.classList.add("operations__tab--active");
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add("operations__content--active");
  });
});

// importantttttttttt
// nav opacity

// first method
/*
nav.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("nav__link")) {
    const currentLink = e.target;
    const siblings = currentLink.closest(".nav").querySelectorAll(".nav__link");

    // to hide any element except the element which the mouse on
    siblings.forEach((el) => {
      if (el !== currentLink) el.style.opacity = 0.5;
    });
  }
});

nav.addEventListener("mouseout", (e) => {
  if (e.target.classList.contains("nav__link")) {
    const currentLink = e.target;
    const siblings = currentLink.closest(".nav").querySelectorAll(".nav__link");

    // to hide any element except the element which the mouse on
    siblings.forEach((el) => {
      if (el !== currentLink) el.style.opacity = 1;
    });
  }
});
*/
// another better method
const handleHover = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const currentLink = e.target;
    const siblings = currentLink.closest(".nav").querySelectorAll(".nav__link");

    // to hide any element except the element which the mouse on
    siblings.forEach((el) => {
      if (el !== currentLink) el.style.opacity = opacity;
    });
  }
};
nav.addEventListener("mouseover", (e) => handleHover(e, 0.5));
nav.addEventListener("mouseout", (e) => handleHover(e, 1));

// sticky nav

// first method
// window.addEventListener("scroll", function (e) {
//   if (window.scrollY > 700) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// });

// second better method
//IMPORTANTTTTTTTTTTTTTTTTT
const navHieght = nav.getBoundingClientRect().height;

const stickyNav = (entries) => {
  const [entry] = entries;
  // to get the first element
  // console.log(entry, entries);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const stickyNavObj = {
  root: null,
  threshold: 0,
  rootMargin: `${-navHieght}px`,
};

const headerObserver = new IntersectionObserver(stickyNav, stickyNavObj);
headerObserver.observe(header);

// Revealing sections
const allSections = document.querySelectorAll(".section");

const revealSection = (entries, observer) => {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Lazy loading images
// >>> replace low sized imgs with larger one
const imgTargets = document.querySelectorAll("img[data-src]");
// console.log(imgTargets);
const loadImg = function (enteries, observer) {
  const [entry] = enteries;

  if (!entry.isIntersecting) return;

  //Replace them
  entry.target.src = entry.target.dataset.src;

  // after loading
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "-200px",
});
imgTargets.forEach((img) => imgObserver.observe(img));

// Slider
const slides = document.querySelectorAll(".slide");

const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
// Next slide
let currentSlide = 0;
const maxSlide = slides.length;

const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
    console.log(currentSlide);
  }
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - currentSlide)}%)`)
  );
};

const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - currentSlide)}%)`)
  );
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
