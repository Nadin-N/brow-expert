class ContactForm {
  constructor() {
    this.refs = {
      contactForm: document.querySelector('.contacts-details-form'),
      inputElements: document.querySelectorAll('.js-contact-form-input'),
    };

    this.outputFormObject = {};

    this.addListeners();
  }

  addListeners() {
    this.refs.contactForm.addEventListener('submit', this.onSubmit.bind(this));
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
}

new ContactForm();
