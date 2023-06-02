class Header {
  constructor() {
    this.refs = {
      openMenuBtn: document.querySelector('.js-menu-open'),
      closeMenuBtn: document.querySelector('.js-menu-close'),
      menu: document.querySelector('.js-modal-menu'),
      body: document.querySelector('body'),
      header: document.querySelector('.js-header'),
      menuItems: document.querySelectorAll('.js-nav-item'),
      modalMenuItems: document.querySelectorAll('.js-modal-item'),
      defaultModalLink: document.querySelector('[data-path ="index"]'),
    };

    this.addListeners();
    this.changeHeaderTheme();
    this.defineModalCurrentPageLink();
  }

  addListeners() {
    this.refs.openMenuBtn.addEventListener('click', this.toggleMenu.bind(this));
    this.refs.closeMenuBtn.addEventListener(
      'click',
      this.toggleMenu.bind(this)
    );
    this.refs.menu.addEventListener('click', this.removeMenu.bind(this));
  }

  changeHeaderTheme() {
    const dataPathArr = [];

    this.refs.menuItems.forEach(item => {
      let itemName = item.dataset.path;

      dataPathArr.push(itemName);

      window.location.href.includes(itemName)
        ? item.classList.add('current-page')
        : item.classList.remove('current-page');
    });

    const isSecondaryPage = dataPathArr.some(item =>
      window.location.href.includes(item)
    );

    isSecondaryPage
      ? this.refs.header.classList.remove('header-main')
      : this.refs.header.classList.add('header-main');
  }

  defineModalCurrentPageLink() {
    const dataPathArr = [];

    this.refs.modalMenuItems.forEach(item => {
      let itemName = item.dataset.path;

      dataPathArr.push(itemName);

      window.location.href.includes(itemName)
        ? item.classList.add('current-page-main')
        : item.classList.remove('current-page-main');
    });

    const isIncludeAnyLink = dataPathArr.some(item =>
      window.location.href.includes(item)
    );

    if (!isIncludeAnyLink) {
      console.log(isIncludeAnyLink);
      console.log(this.refs.defaultModalLink);
      this.refs.defaultModalLink.classList.add('current-page-main');
    }
  }

  toggleMenu() {
    this.refs.menu.classList.toggle('is-hidden');
    this.refs.body.classList.toggle('no-scroll');

    if (!this.refs.openMenuBtn.classList.contains('is-hidden')) {
      document.addEventListener('keydown', this.closeOnBtn.bind(this));
    }
  }

  removeMenu() {
    this.refs.menu.classList.add('is-hidden');
    this.refs.body.classList.remove('no-scroll');
  }

  closeOnBtn(event) {
    if (event.code !== 'Escape') {
      return;
    }

    this.removeMenu();
    document.removeEventListener('keydown', this.closeOnBtn);
  }
}

new Header();

// дописати код якщо натискаємо всередині меню
