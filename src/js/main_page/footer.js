class Footer {
  constructor() {
    this.refs = {
      footerTitle: document.querySelector('.js-footer-title'),
    };

    this.changeTitleVisibility();
  }

  changeTitleVisibility() {
    window.location.href.includes('index')
      ? this.refs.footerTitle.classList.add('visible')
      : this.refs.footerTitle.classList.remove('visible');
  }
}

new Footer();
