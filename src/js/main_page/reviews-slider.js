import Swiper, { Pagination } from 'swiper';

const windowWidth = window.screen.width;

new Swiper('.reviews-swiper', {
  modules: [Pagination],
  direction: `${windowWidth < 768 ? 'horizontal' : 'vertical'}`,
  loop: true,
  spaceBetween: 30,

  pagination: {
    el: '.reviews-pagination',
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 3,
  },
});
