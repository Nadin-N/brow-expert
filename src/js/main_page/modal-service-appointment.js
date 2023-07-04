import IMask from 'imask';

class Appointment {
  static CLOSE_MODAL_APPOINTMENT_BTN_CODE = 'Escape';

  constructor() {
    this.refs = {
      appointmentButtons: document.querySelectorAll('.js-appointment-button'),
      closeModalAppointment: document.querySelector(
        '.js-appointment-modal-close'
      ),
      modalAppointment: document.querySelector(
        '.js-appointment-modal-backdrop'
      ),

      body: document.querySelector('body'),
      phoneInput: document.querySelector(
        '.js-appointment-form-input[name="phone"]'
      ),
      dateInput: document.querySelector(
        '.js-appointment-form-input[name="date"]'
      ),
      timeInput: document.querySelector(
        '.js-appointment-form-input[name="time"]'
      ),

      dropDownBtn: document.querySelector('.js-appointment-dropdown-button'),
      dropDownLists: document.querySelectorAll('.js-appointment-dropdown-list'),
      dropDownListItems: document.querySelectorAll(
        '.appointment-dropdown-list-item'
      ),

      appointmentInput: document.querySelector(
        'input[name="appointment-order-item"]'
      ),

      appointmentForm: document.querySelector('.js-appointment-form'),
      appointmentMessage: document.querySelector('.js-appointment-message'),
    };

    this.outputFormObject = {};
    this.dropdownList = null;

    this.addListener();
  }

  addListener() {
    this.refs.appointmentButtons.forEach(item =>
      item.addEventListener('click', this.onOpenModal.bind(this))
    );
    this.refs.closeModalAppointment.addEventListener(
      'click',
      this.onOpenModal.bind(this)
    );
    this.refs.phoneInput.addEventListener(
      'focus',
      this.validatePhone.bind(this)
    );
    this.refs.dropDownBtn.addEventListener(
      'click',
      this.onDropDownBtnClick.bind(this)
    );
    this.refs.dropDownListItems.forEach(listItem =>
      listItem.addEventListener(
        'click',
        this.onDropDownListItemClick.bind(this)
      )
    );

    this.refs.dateInput.addEventListener('focus', this.setDate.bind(this));
    this.refs.timeInput.addEventListener('focus', this.setTime.bind(this));
    this.refs.appointmentForm.addEventListener(
      'submit',
      this.onSubmit.bind(this)
    );
  }

  onOpenModal(event) {
    if (event.target.dataset.value === '') {
      return;
    } else {
      this.refs.dropDownLists.forEach(list => {
        if (list.dataset.value === event.target.dataset.value) {
          list.classList.remove('is-hidden');
          list.setAttribute('data-mark', 'marked');
        } else {
          list.classList.add('is-hidden');
          list.removeAttribute('data-mark', 'marked');
        }
      });

      this.dropdownList = this.refs.modalAppointment.querySelector(
        '[data-mark="marked"]'
      );
    }

    document.addEventListener('click', this.onDropDownOutSideClick.bind(this));

    this.refs.modalAppointment.classList.toggle('is-modal-hidden');
    this.refs.body.classList.toggle('no-scroll');
    if (!this.refs.modalAppointment.classList.contains('is-modal-hidden')) {
      document.addEventListener('keydown', this.onCloseBtnPress.bind(this));
      document.addEventListener(
        'click',
        this.clickOutsideAppointmentModal.bind(this)
      );
      this.refs.body.classList.add('no-scroll');
    } else {
      document.removeEventListener('keydown', this.onCloseBtnPress.bind(this));
      document.removeEventListener(
        'click',
        this.clickOutsideAppointmentModal.bind(this)
      );
      this.refs.body.classList.remove('no-scroll');
      document.removeEventListener(
        'click',
        this.onDropDownOutSideClick.bind(this)
      );

      this.refs.appointmentForm.reset();
      this.refs.appointmentMessage.textContent = '';
      this.refs.dropDownBtn.textContent = 'Service';
      this.refs.appointmentInput.value = '';
    }
  }

  onCloseBtnPress(event) {
    if (event.code !== Appointment.CLOSE_MODAL_APPOINTMENT_BTN_CODE) {
      return;
    }

    this.refs.modalAppointment.classList.add('is-modal-hidden');
    document.removeEventListener('keydown', this.onCloseBtnPress.bind(this));
    document.removeEventListener(
      'click',
      this.clickOutsideAppointmentModal.bind(this)
    );
    this.refs.body.classList.remove('no-scroll');
    document.removeEventListener(
      'click',
      this.onDropDownOutSideClick.bind(this)
    );

    this.refs.appointmentForm.reset();
    this.refs.appointmentMessage.textContent = '';
    this.refs.dropDownBtn.textContent = 'Service';
    this.refs.appointmentInput.value = '';
  }

  clickOutsideAppointmentModal(event) {
    if (event.target !== this.refs.modalAppointment) {
      return;
    }

    this.refs.modalAppointment.classList.add('is-modal-hidden');
    document.removeEventListener('keydown', this.onCloseBtnPress.bind(this));
    document.removeEventListener(
      'click',
      this.clickOutsideAppointmentModal.bind(this)
    );
    this.refs.body.classList.remove('no-scroll');
    document.removeEventListener(
      'click',
      this.onDropDownOutSideClick.bind(this)
    );

    this.refs.appointmentForm.reset();
    this.refs.appointmentMessage.textContent = '';
    this.refs.dropDownBtn.textContent = 'Service';
    this.refs.appointmentInput.value = '';
  }

  validatePhone() {
    const maskOptions = {
      mask: '+38(000)000-00-00',
      lazy: false,
    };
    const mask = new IMask(this.refs.phoneInput, maskOptions);
  }

  onDropDownBtnClick() {
    this.dropdownList.classList.toggle('appointment-dropdown-list-visible');
    this.refs.dropDownBtn.classList.toggle(
      'appointment-dropdown-button-clicked'
    );
  }

  onDropDownListItemClick(event) {
    event.stopPropagation();

    this.refs.dropDownBtn.innerHTML = event.target.innerHTML;

    this.refs.dropDownBtn.focus();

    this.refs.dropDownBtn.value = event.target.dataset.value;
    this.refs.appointmentInput.value = event.target.dataset.value;

    this.dropdownList.classList.remove('appointment-dropdown-list-visible');
    this.refs.dropDownBtn.classList.remove(
      'appointment-dropdown-button-clicked'
    );
  }

  onDropDownOutSideClick(event) {
    if (
      event.target.closest('.js-appointment-dropdown-button') ||
      this.dropdownList === null
    ) {
      return;
    }

    this.dropdownList.classList.remove('appointment-dropdown-list-visible');
    this.refs.dropDownBtn.classList.remove(
      'appointment-dropdown-button-clicked'
    );
  }

  setDate() {
    const dateMask = IMask(this.refs.dateInput, {
      mask: Date,

      blocks: {
        d: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31,
          maxLength: 2,
        },
        m: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
          maxLength: 2,
        },
        Y: {
          mask: IMask.MaskedRange,
          from: 2023,
          to: 2029,
        },
      },

      min: new Date(),
      max: new Date(2030, 0, 1),

      autofix: true,

      lazy: false,

      overwrite: true,
    });
  }
  setTime() {
    const maskOptions = {
      mask: 'd:m',
      lazy: false,
      blocks: {
        d: {
          mask: IMask.MaskedRange,
          from: 8,
          to: 19,
          maxLength: 1,
        },
        m: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 59,
          maxLength: 1,
        },
      },
    };
    const mask = new IMask(this.refs.timeInput, maskOptions);
  }

  onSubmit(event) {
    event.preventDefault();

    const form = new FormData(this.refs.appointmentForm);

    for (let [name, value] of form) {
      this.outputFormObject[name] = value;
    }

    if (
      Object.values(this.outputFormObject).some(value => value.includes('_')) ||
      this.refs.appointmentInput.value === ''
    ) {
      this.refs.appointmentMessage.textContent =
        'Please enter all the data correctly!!!';
    } else {
      console.log(this.outputFormObject);
      event.target.reset();
      this.refs.appointmentMessage.textContent = '';
      this.refs.dropDownBtn.textContent = 'Service';
      this.refs.appointmentInput.value = '';
    }
  }
}

new Appointment();
