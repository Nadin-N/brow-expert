import Swiper, { Pagination } from 'swiper';

const windowWidth = window.screen.width;

new Swiper('.hero-swiper', {
  modules: [Pagination],
  direction: `${windowWidth < 768 ? 'horizontal' : 'vertical'}`,
  loop: true,

  pagination: {
    el: '.hero-pagination',
    clickable: true,
  },

  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
});
