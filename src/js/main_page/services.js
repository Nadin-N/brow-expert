export class Dropdown {
  constructor() {
    this.refs = {
      dropDownBtn: document.querySelector('.dropdown-button'),
      dropDownList: document.querySelector('.dropdown-list'),
      dropDownListItems: document.querySelectorAll('.dropdown-list-item'),
      allServices: document.querySelectorAll('.service-wrap'),
    };

    this.addListeners();
  }

  addListeners() {
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
    document.addEventListener('click', this.onDropDownOutSideClick.bind(this));
    document.addEventListener('keydown', this.onCloseKeyClick.bind(this));
  }

  onDropDownBtnClick() {
    this.refs.dropDownList.classList.toggle('dropdown-list-visible');
    this.refs.dropDownBtn.classList.toggle('dropdown-button-clicked');
    this.refs.dropDownBtn.classList.add('dropdown-button-active');
  }

  onDropDownListItemClick(event) {
    event.stopPropagation();

    this.refs.dropDownBtn.innerHTML = event.target.innerHTML;

    this.refs.dropDownBtn.focus();

    this.refs.dropDownBtn.value = event.target.dataset.value;

    this.refs.dropDownList.classList.remove('dropdown-list-visible');
    this.refs.dropDownBtn.classList.remove('dropdown-button-clicked');

    this.refs.allServices.forEach(service => {
      service.classList.remove('service-wrap-visible');
      if (service.dataset.name === this.refs.dropDownBtn.value) {
        service.classList.add('service-wrap-visible');
      }
    });
  }

  onDropDownOutSideClick(event) {
    if (event.target !== this.refs.dropDownBtn) {
      this.refs.dropDownBtn.classList.remove('dropdown-button-active');
      this.refs.dropDownList.classList.remove('dropdown-list-visible');
      this.refs.dropDownBtn.classList.remove('dropdown-button-clicked');
    }
  }

  onCloseKeyClick(event) {
    if (event.code === 'Tab' || event.code === 'Escape') {
      this.refs.dropDownBtn.classList.remove('dropdown-button-active');
      this.refs.dropDownList.classList.remove('dropdown-list-visible');
      this.refs.dropDownBtn.classList.remove('dropdown-button-clicked');
    }
  }
}

new Dropdown();
