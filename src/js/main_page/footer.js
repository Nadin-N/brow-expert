class Footer {
  constructor() {
    this.refs = {
      footerTitle: document.querySelector('.js-footer-title'),
      menuItems: document.querySelectorAll('.js-nav-item'),
      footer: document.querySelector('.js-footer-contacts'),
    };

    this.changeTitleVisibility();
    this.changeBackColor();
  }

  changeTitleVisibility() {
    const dataPathArr = [];

    this.refs.menuItems.forEach(item => {
      let itemName = item.dataset.path;

      dataPathArr.push(itemName);
    });

    const isSecondaryPage = dataPathArr.some(item =>
      window.location.href.includes(item)
    );

    isSecondaryPage
      ? this.refs.footerTitle.classList.remove('visible')
      : this.refs.footerTitle.classList.add('visible');
  }

  changeBackColor() {
    if (window.location.href.includes('courses')) {
      this.refs.footer.style.backgroundColor = '#FFF';
    }
  }
}

new Footer();
