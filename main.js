'use strict';

const toggleBtn = document.querySelector('.toggle-btn');
const sidebar = document.querySelector('.sidebar');
const removeSidebar = document.querySelector('.remove-sidebar');
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const body = document.querySelector('.webpage-body');
const nav = document.querySelector('.nav');
const topLink = document.querySelector('.top-link');
const scrollLink = document.querySelectorAll('.scroll-link');

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

window.addEventListener('scroll', () => {
  const scrollHeight = window.pageYOffset;
  const navHeight = nav.getBoundingClientRect().height;

  if (scrollHeight > navHeight) {
    nav.classList.add('fixed-nav');
  } else {
    nav.classList.remove('fixed-nav');
  }

  if (scrollHeight > 500) {
    topLink.classList.add('show-top-link');
  } else {
    topLink.classList.remove('show-top-link');
  }
});

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