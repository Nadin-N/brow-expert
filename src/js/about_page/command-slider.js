import Swiper, { Pagination } from 'swiper';

new Swiper('.js-command-swiper', {
  modules: [Pagination],
  direction: 'horizontal',
  initialSlide: 1,
  spaceBetween: 10,

  pagination: {
    el: '.command-pagination',
    clickable: true,
  },
});

class commandSlider {
  constructor() {
    this.refs = {
      commandSlides: document.querySelectorAll('.command-slide'),
    };

    this.transformSlider();
  }

  transformSlider() {
    console.log(this.refs.commandSlides);
    const windowWidth = window.screen.width;

    windowWidth < 600
      ? this.refs.commandSlides.forEach(slide => {
          slide.classList.add('swiper-slide');
        })
      : this.refs.commandSlides.forEach(slide => {
          slide.classList.remove('swiper-slide');
          slide.style.width = '384px';
        });
  }
}

new commandSlider();
