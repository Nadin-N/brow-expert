import Swiper, { Pagination } from 'swiper';

const windowWidth = window.screen.width;

const swiper = new Swiper('.swiper', {
  modules: [Pagination],
  direction: `${windowWidth < 768 ? 'horizontal' : 'vertical'}`,
  loop: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  scrollbar: {
    el: '.swiper-scrollbar',
  },
});
