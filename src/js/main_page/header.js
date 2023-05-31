class Header {
  constructor() {
    this.refs = {
      openMenuBtn: document.querySelector('.js-menu-open'),
      closeMenuBtn: document.querySelector('.js-menu-close'),
      menu: document.querySelector('.js-modal-menu'),
      body: document.querySelector('body'),
    };

    this.addListeners();
  }

  addListeners() {
    this.refs.openMenuBtn.addEventListener('click', this.toggleMenu.bind(this));
    this.refs.closeMenuBtn.addEventListener(
      'click',
      this.toggleMenu.bind(this)
    );
    this.refs.menu.addEventListener('click', this.removeMenu.bind(this));
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
