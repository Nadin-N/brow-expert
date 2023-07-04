import IMask from 'imask';

class ContactForm {
  constructor() {
    this.refs = {
      contactForm: document.querySelector('.contacts-details-form'),
      inputElements: document.querySelectorAll('.js-contact-form-input'),
      phoneInput: document.querySelector(
        '.js-contact-form-input[name="phone"]'
      ),
    };

    this.outputFormObject = {};

    this.addListeners();
  }

  addListeners() {
    this.refs.contactForm.addEventListener('submit', this.onSubmit.bind(this));
    this.refs.phoneInput.addEventListener(
      'focus',
      this.validatePhone.bind(this)
    );
  }

  onSubmit(event) {
    event.preventDefault();

    const form = new FormData(this.refs.contactForm);

    for (let [name, value] of form) {
      this.outputFormObject[name] = value;
    }

    console.log(this.outputFormObject);

    event.target.reset();
  }

  validatePhone() {
    const maskOptions = {
      mask: '+38(000)000-00-00',
      lazy: false,
    };
    const mask = new IMask(this.refs.phoneInput, maskOptions);
  }
}

new ContactForm();
