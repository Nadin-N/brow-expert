class ModalAgreement {
  static CLOSE_MODAL_AGREEMENT_BTN_CODE = 'Escape';

  constructor() {
    this.refs = {
      openModalAgreement: document.querySelector('.js-contacts-modal-link'),
      closeModalAgreement: document.querySelector('.js-contact-modal-close'),
      modalAgreement: document.querySelector('.js-contact-modal-backdrop'),
      body: document.querySelector('body'),
    };

    this.addListener();
  }

  addListener() {
    this.refs.openModalAgreement.addEventListener(
      'click',
      this.onOpenModal.bind(this)
    );
    this.refs.closeModalAgreement.addEventListener(
      'click',
      this.onOpenModal.bind(this)
    );
  }

  onOpenModal(event) {
    event.preventDefault();

    this.refs.modalAgreement.classList.toggle('is-contact-modal-hidden');
    this.refs.body.classList.toggle('no-scroll');
    if (
      !this.refs.modalAgreement.classList.contains('is-contact-modal-hidden')
    ) {
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

    this.refs.modalAgreement.classList.add('is-contact-modal-hidden');
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

    this.refs.modalAgreement.classList.add('is-contact-modal-hidden');
    document.removeEventListener('keydown', this.onCloseBtnPress.bind(this));
    document.removeEventListener(
      'click',
      this.clickOutsideAgreementModal.bind(this)
    );
    this.refs.body.classList.remove('no-scroll');
  }
}

new ModalAgreement();
