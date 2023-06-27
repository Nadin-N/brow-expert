class Courses {
  constructor() {
    this.refs = {
      commandGroups: document.querySelectorAll('.js-courses-info-list'),
      groupButtons: document.querySelectorAll('.js-courses-info-button'),
    };

    this.addListeners();
  }

  addListeners() {
    this.refs.groupButtons.forEach(button =>
      button.addEventListener('click', this.selectCommandGroup.bind(this))
    );
  }

  selectCommandGroup(event) {
    this.refs.groupButtons.forEach(button => {
      if (button.name !== event.target.name) {
        button.classList.remove(`clicked`);
      } else {
        button.classList.add(`clicked`);
      }
    });

    this.refs.commandGroups.forEach(group => {
      if (event.target.name === group.dataset.name) {
        group.classList.add('list-visible');
      } else {
        group.classList.remove('list-visible');
      }
    });
  }
}

new Courses();
