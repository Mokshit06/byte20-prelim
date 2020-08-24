const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');
const hamburger = document.querySelector('.hamburger');
const searchMap = document.querySelector('#map');
const searchForm = document.querySelector('.form');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  if (searchMap) {
    searchMap.classList.toggle('behind');
    searchForm.classList.toggle('behind');
  }
  links.forEach(link => {
    link.classList.toggle('fade');
  });
  hamburger.classList.toggle('toggle');
});
