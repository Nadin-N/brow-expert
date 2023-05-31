class Footer {
  constructor() {
    this.refs = {
      footerTitle: document.querySelector('.js-footer-title'),
      menuItems: document.querySelectorAll('.js-nav-item'),
    };

    this.changeTitleVisibility();
  }

  changeTitleVisibility() {
    this.refs.menuItems.forEach(item => {
      let itemName = item.dataset.path;

      !window.location.href.includes(itemName)
        ? this.refs.footerTitle.classList.add('visible')
        : this.refs.footerTitle.classList.remove('visible');
    });
  }
}

new Footer();
