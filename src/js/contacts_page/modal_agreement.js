class ModalAgreement {
  static CLOSE_MODAL_AGREEMENT_BTN_CODE = 'Escape';

  constructor() {
    this.refs = {
      openModalAgreement: document.querySelectorAll('.js-check-modal-link'),
      closeModalAgreement: document.querySelector('.js-contact-modal-close'),
      modalAgreement: document.querySelector('.js-contact-modal-backdrop'),
      body: document.querySelector('body'),
    };

    this.addListener();
  }

  addListener() {
    this.refs.openModalAgreement.forEach(item =>
      item.addEventListener('click', this.onOpenModal.bind(this))
    );

    this.refs.closeModalAgreement.addEventListener(
      'click',
      this.onOpenModal.bind(this)
    );
  }

  onOpenModal(event) {
    this.refs.modalAgreement.classList.toggle('is-modal-hidden');
    this.refs.body.classList.toggle('no-scroll');
    if (!this.refs.modalAgreement.classList.contains('is-modal-hidden')) {
      document.addEventListener('keydown', this.onCloseBtnPress.bind(this));
      document.addEventListener(
        'click',
        this.clickOutsideAgreementModal.bind(this)
      );
      this.refs.body.classList.add('no-scroll');
    } else {
      document.removeEventListener('keydown', this.onCloseBtnPress.bind(this));
      document.removeEventListener(
        'click',
        this.clickOutsideAgreementModal.bind(this)
      );
      this.refs.body.classList.remove('no-scroll');
    }
  }

  onCloseBtnPress(event) {
    if (event.code !== ModalAgreement.CLOSE_MODAL_AGREEMENT_BTN_CODE) {
      return;
    }

    this.refs.modalAgreement.classList.add('is-modal-hidden');
    document.removeEventListener('keydown', this.onCloseBtnPress.bind(this));
    document.removeEventListener(
      'click',
      this.clickOutsideAgreementModal.bind(this)
    );
    this.refs.body.classList.remove('no-scroll');
  }

  clickOutsideAgreementModal(event) {
    if (event.target !== this.refs.modalAgreement) {
      return;
    }

    this.refs.modalAgreement.classList.add('is-modal-hidden');
    document.removeEventListener('keydown', this.onCloseBtnPress.bind(this));
    document.removeEventListener(
      'click',
      this.clickOutsideAgreementModal.bind(this)
    );
    this.refs.body.classList.remove('no-scroll');
  }
}

new ModalAgreement();
