document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
  const dropDownBtn = dropDownWrapper.querySelector('.dropdown-button');
  const dropDownList = dropDownWrapper.querySelector('.dropdown-list');
  const dropDownListItems = dropDownList.querySelectorAll(
    '.dropdown-list-item'
  );
  //   const services = document.querySelector('.services-box');

  // Клик по кнопке. Открыть/Закрыть select
  dropDownBtn.addEventListener('click', function (e) {
    dropDownList.classList.toggle('dropdown-list-visible');
    this.classList.toggle('dropdown-button-clicked');
    this.classList.add('dropdown-button-active');
  });

  // Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
  dropDownListItems.forEach(function (listItem) {
    listItem.addEventListener('click', function (e) {
      e.stopPropagation();
      dropDownBtn.innerHTML = e.target.innerHTML;
      dropDownBtn.focus();
      // console.log(e.target.dataset.value);
      // if (
      //   e.target === document.querySelector('.services-box').lastElementChild
      // ) {
      //   dropDownBtn.value = 'e-design';
      // }
      dropDownBtn.value = e.target.dataset.value;
      dropDownList.classList.remove('dropdown-list-visible');
      dropDownBtn.classList.remove('dropdown-button-clicked');
      document.querySelectorAll('.service-wrap').forEach(service => {
        service.classList.remove('service-wrap-visible');
        if (service.dataset.name === dropDownBtn.value) {
          service.classList.add('service-wrap-visible');
        }
      });
    });
  });

  // Клик снаружи дропдауна. Закрыть дропдаун
  document.addEventListener('click', function (e) {
    if (e.target !== dropDownBtn) {
      dropDownBtn.classList.remove('dropdown-button-active');
      dropDownList.classList.remove('dropdown-list-visible');
      dropDownBtn.classList.remove('dropdown-button-clicked');
    }
  });

  // Нажатие на Tab или Escape. Закрыть дропдаун
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab' || e.key === 'Escape') {
      dropDownBtn.classList.remove('dropdown-button-active');
      dropDownList.classList.remove('dropdown-list-visible');
      dropDownBtn.classList.remove('dropdown-button-clicked');
    }
  });
});
