class UpButton {
  constructor() {
    this.refs = {
      upBtn: document.querySelector('.page-up-btn'),
    };

    this.addListener();
  }

  addListener() {
    this.refs.upBtn.addEventListener('click', this.onBtnClick.bind(this));
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  onBtnClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  onScroll() {
    document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
      ? this.refs.upBtn.classList.add('shown')
      : this.refs.upBtn.classList.remove('shown');
  }
}

new UpButton();
