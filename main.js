'use strict';

const toggleBtn = document.querySelector('.toggle-btn');
const sidebar = document.querySelector('.sidebar');
const removeSidebar = document.querySelector('.remove-sidebar');
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const body = document.querySelector('.webpage-body');
const nav = document.querySelector('.nav');
const header = document.querySelector('header');
const topLink = document.querySelector('.top-link');
const scrollLink = document.querySelectorAll('.scroll-link');
const navHeight = nav.getBoundingClientRect().height;

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('show-sidebar');
});

removeSidebar.addEventListener('click', () => {
  sidebar.classList.remove('show-sidebar');
});

sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('show-sidebar');
  });
});

body.addEventListener('click', () => {
  sidebar.classList.remove('show-sidebar');
});

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('fixed-nav');
    topLink.classList.add('show-top-link');
  } else {
    nav.classList.remove('fixed-nav');
    topLink.classList.remove('show-top-link');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

scrollLink.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = e.currentTarget.getAttribute('href').slice(1);
    const element = document.getElementById(id);
    const navHeight = nav.getBoundingClientRect().height;
    const fixedNav = nav.classList.contains('fixed-nav');
    let position = element.offsetTop - navHeight;

    if (!fixedNav) {
      position = position - navHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
  });
});

// reveal sections
const allSections = document.querySelectorAll('section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// lazy loading
const imgTargets = document.querySelectorAll('img.lazy-img');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('lazy-img');

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '300px',
});

imgTargets.forEach(img => {
  imgObserver.observe(img);
});
