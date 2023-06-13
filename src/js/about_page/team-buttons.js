class Team {
  constructor() {
    this.refs = {
      commandGroups: document.querySelectorAll('.js-command-swiper'),
      groupButtons: document.querySelectorAll('.js-command-button'),
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
        group.classList.add('slider-visible');
      } else {
        group.classList.remove('slider-visible');
      }
    });
  }
}

new Team();
