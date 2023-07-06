import axios from 'axios';

class UserApi {
  static BASE_URL = 'https://randomuser.me/api/';

  constructor() {
    this.refs = {
      userList: document.querySelector('.js-feedback-box'),
      numberedButtonsBox: document.querySelector('.js-numbered-buttons-box'),
      numberedPaginationButtons: document.querySelectorAll('.js-numbered'),
      startPaginationButtons: document.querySelectorAll('.js-start-button'),
      startButton1: document.querySelector('[data-index="1"]'),
      startButton2: document.querySelector('[data-index="2"]'),
      endButton1: document.querySelector('[data-index="5"]'),
      endButton2: document.querySelector('[data-index="6"]'),
      rightArrowNext: document.querySelector('.js-arrow-right'),
      leftArrowBack: document.querySelector('.js-arrow-left'),
      dotsBetween: document.querySelector('.js-dots-between'),
      dotsStart: document.querySelector('.js-dots-start'),
    };

    this.currentPage = 1;
    this.per_page = 5;

    this.addListeners();
    this.renderUserReviews();
  }

  addListeners() {
    this.refs.numberedButtonsBox.addEventListener(
      'click',
      this.onNumberedButtonsClick.bind(this)
    );
    this.refs.rightArrowNext.addEventListener(
      'click',
      this.onNextButtonClick.bind(this)
    );
    this.refs.leftArrowBack.addEventListener(
      'click',
      this.onBackButtonClick.bind(this)
    );
  }

  async fetchUserData(page = 1) {
    const response = await axios.get(
      `${UserApi.BASE_URL}?page=${page}&results=${this.per_page}&inc=name,picture&nat=us&seed=foobar`
    );

    const users = response.data.results;

    return users;
  }

  async renderUserReviews(currentPage) {
    try {
      const users = await this.fetchUserData(currentPage);

      this.renderMarkup(users);
    } catch (error) {
      console.log(error.message);
    }
  }

  renderMarkup(users) {
    const markup = users
      .map(
        user => `  <li class="feedback-item">
      <img
          srcset="
              ${user.picture.thumbnail}      170w,
              ${user.picture.large}     420w,
            "
            sizes="(min-width: 768px) 420px, (min-width: 320px) 170px, 170px"
            src="${user.picture.large}"
        alt="user photo"
        class="feedback-user-photo"
      />
      <div class="feedback-user-info">
        <p class="feedback-user-name">${user.name.first} ${user.name.last}</p>
        <p class="feedback-user-comment">
          I had an amazing experience at this eyebrow salon! The staff was
          friendly, the service was impeccable, and my eyebrows turned out
          perfect. I highly recommend this salon for anyone looking for
          professional eyebrow shaping and styling
        </p>
      </div>
    </li>`
      )
      .join('');

    this.refs.userList.innerHTML = markup;
  }

  renderPagination() {
    this.refs.numberedPaginationButtons.forEach(button =>
      Number(button.textContent) === this.currentPage
        ? button.setAttribute('data-state', 'current')
        : button.removeAttribute('data-state')
    );

    Number(this.refs.startButton1.textContent) === 1 &&
    this.refs.startButton1.dataset.state === 'current'
      ? this.refs.leftArrowBack.setAttribute('disabled', 'true')
      : this.refs.leftArrowBack.removeAttribute('disabled');

    this.refs.endButton2.dataset.state === 'current'
      ? this.refs.rightArrowNext.setAttribute('disabled', 'true')
      : this.refs.rightArrowNext.removeAttribute('disabled');

    if (
      Number(this.refs.startButton2.textContent) ===
      Number(this.refs.endButton1.textContent) - 1
    ) {
      this.refs.dotsBetween.setAttribute('hidden', 'true');
      this.refs.dotsStart.removeAttribute('hidden');
    }

    if (
      Number(this.refs.startButton1.textContent) <= 2 &&
      this.refs.startButton1.dataset.state === 'current'
    ) {
      this.refs.dotsBetween.removeAttribute('hidden');
      this.refs.dotsStart.setAttribute('hidden', 'true');
    }
  }

  onNumberedButtonsClick(event) {
    if (event.target.tagName !== 'BUTTON') {
      return;
    }

    this.currentPage = Number(event.target.textContent);

    this.renderPagination();
    this.renderUserReviews(this.currentPage);
  }

  onNextButtonClick() {
    this.currentPage = this.currentPage + 1;

    if (
      Number(this.refs.startButton2.textContent) !==
        Number(this.refs.endButton1.textContent) - 1 &&
      this.refs.startButton2.dataset.state === 'current'
    ) {
      this.refs.startPaginationButtons.forEach(
        button => (button.textContent = Number(button.textContent) + 1)
      );
    }

    this.renderPagination();
    this.renderUserReviews(this.currentPage);
  }

  onBackButtonClick() {
    this.currentPage = this.currentPage - 1;

    if (
      Number(this.refs.startButton1.textContent) >= 2 &&
      this.refs.startButton1.dataset.state === 'current'
    ) {
      this.refs.startPaginationButtons.forEach(
        button => (button.textContent = Number(button.textContent) - 1)
      );
    }

    if (
      this.refs.endButton1.dataset.state === 'current' &&
      Number(this.refs.startButton2.textContent) === 2
    ) {
      this.refs.startPaginationButtons.forEach(
        button => (button.textContent = Number(button.textContent) + 2)
      );
    }

    this.renderPagination();
    this.renderUserReviews(this.currentPage);
  }
}

new UserApi();
