class Dropdown {
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

// document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
//   const refs = {
//     dropDownBtn: dropDownWrapper.querySelector('.dropdown-button'),
//     dropDownList: dropDownWrapper.querySelector('.dropdown-list'),
//     dropDownListItems: dropDownList.querySelectorAll('.dropdown-list-item'),
//   };

//   //   const services = document.querySelector('.services-box');

//   // Клик по кнопке. Открыть/Закрыть select
//   refs.dropDownBtn.addEventListener('click', function (e) {
//     refs.dropDownList.classList.toggle('dropdown-list-visible');
//     refs.dropDownBtn.classList.toggle('dropdown-button-clicked');
//     refs.dropDownBtn.classList.add('dropdown-button-active');
//   });

//   // Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
//   refs.dropDownListItems.forEach(function (listItem) {
//     listItem.addEventListener('click', function (e) {
//       e.stopPropagation();
//       refs.dropDownBtn.innerHTML = e.target.innerHTML;
//       refs.dropDownBtn.focus();
//       // console.log(e.target.dataset.value);
//       // if (
//       //   e.target === document.querySelector('.services-box').lastElementChild
//       // ) {
//       //   dropDownBtn.value = 'e-design';
//       // }
//       refs.dropDownBtn.value = e.target.dataset.value;
//       refs.dropDownList.classList.remove('dropdown-list-visible');
//       refs.dropDownBtn.classList.remove('dropdown-button-clicked');
//       document.querySelectorAll('.service-wrap').forEach(service => {
//         service.classList.remove('service-wrap-visible');
//         if (service.dataset.name === dropDownBtn.value) {
//           service.classList.add('service-wrap-visible');
//         }
//       });
//     });
//   });

//   // Клик снаружи дропдауна. Закрыть дропдаун
//   document.addEventListener('click', function (e) {
//     if (e.target !== refs.dropDownBtn) {
//       refs.dropDownBtn.classList.remove('dropdown-button-active');
//       refs.dropDownList.classList.remove('dropdown-list-visible');
//       refs.dropDownBtn.classList.remove('dropdown-button-clicked');
//     }
//   });

//   // Нажатие на Tab или Escape. Закрыть дропдаун
//   document.addEventListener('keydown', function (e) {
//     if (e.key === 'Tab' || e.key === 'Escape') {
//       refs.dropDownBtn.classList.remove('dropdown-button-active');
//       refs.dropDownList.classList.remove('dropdown-list-visible');
//       refs.dropDownBtn.classList.remove('dropdown-button-clicked');
//     }
//   });
// });
