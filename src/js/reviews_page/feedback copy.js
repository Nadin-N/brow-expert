import axios from 'axios';

class UserApi {
  static BASE_URL = 'https://randomuser.me/api/';

  constructor() {
    this.refs = {
      userList: document.querySelector('.js-feedback-box'),
      btn1Ref: document.querySelector('[data-index="1"]'),
      btn2Ref: document.querySelector('[data-index="2"]'),
      btn3Ref: document.querySelector('[data-index="3"]'),
      btn4Ref: document.querySelector('[data-index="4"]'),
      btn5Ref: document.querySelector('[data-index="5"]'),
      firstPageRef: document.querySelector('.first-button'),
      lastPageRef: document.querySelector('.last-button'),
      paginationRef: document.querySelector('.pagination-container'),
      rightArrowRef: document.querySelector('.arrow-right'),
      leftArrowRef: document.querySelector('.arrow-left'),
      prevDotsRef: document.querySelector('#previous'),
      afterDotsRef: document.querySelector('#after'),
      btns: document.querySelectorAll('.pagination-button'),
      // container: document.getElementById('tui-pagination-container'),
    };

    this.currentPage = 1;
    this.per_page = 5;
    this.results = 5000;

    this.addListeners();
    this.renderUserReviews();
  }

  addListeners() {
    this.refs.paginationRef.addEventListener(
      'click',
      this.onPaginationClick.bind(this)
    );
    this.refs.prevDotsRef.hidden = true;
    this.refs.leftArrowRef.hidden = true;
    this.refs.firstPageRef.hidden = true;
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

  // createPagination() {
  //   instance = new Pagination(this.refs.container, {
  //     totalItems: this.refs.results,
  //     itemsPerPage: 5,
  //     visiblePages: 6,
  //     page: 1,
  //     centerAlign: false,
  //     usageStatistics: false,
  //     firstItemClassName: 'tui-first-child',
  //     lastItemClassName: 'tui-last-child',
  //     template: {
  //       page: '<a href="#" class="tui-page-btn">{{page}}</a>',
  //       currentPage:
  //         '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
  //       moveButton:
  //         '<a href="#" class="tui-page-btn-more tui-{{type}}">' +
  //         '<span class="tui-ico-{{type}}"></span>' +
  //         '</a>',
  //       disabledMoveButton:
  //         '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
  //         '<span class="tui-ico-{{type}}"></span>' +
  //         '</span>',
  //       moreButton:
  //         '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
  //         '<span class="tui-ico-ellip">...</span>' +
  //         '</a>',
  //     },
  //   });

  //   instance.on('afterMove', event => {
  //     const currentPage = event.page;
  //     renderPopularFilmCards(currentPage);
  //   });
  // }

  onPaginationClick(event) {
    let currentPage = 1;

    // this.refs.prevDotsRef.hidden = true;
    // this.refs.leftArrowRef.hidden = true;
    // this.refs.firstPageRef.hidden = true;

    if (event.target.tagName === 'BUTTON') {
      if (Number(event.target.textContent)) {
        currentPage = Number(event.target.textContent);
      }

      this.refs.prevDotsRef.hidden = true;
      this.refs.afterDotsRef.hidden = true;

      if (event.target.classList.contains('pagination-button')) {
        this.refs.btns.forEach(el =>
          el.classList.remove('pagination--current')
        );
        event.target.classList.add('pagination--current');
      }

      if (
        event.target.classList.contains('arrow-right') &&
        currentPage < 1000
      ) {
        this.refs.btns.forEach(el =>
          el.classList.remove('pagination--current')
        );
        this.refs.btn1Ref.classList.add('pagination--current');
        this.refs.btn1Ref.textContent =
          Number(this.refs.btn1Ref.textContent) + 5;
        this.refs.btn2Ref.textContent =
          Number(this.refs.btn2Ref.textContent) + 5;
        this.refs.btn3Ref.textContent =
          Number(this.refs.btn3Ref.textContent) + 5;
        this.refs.btn4Ref.textContent =
          Number(this.refs.btn4Ref.textContent) + 5;
        this.refs.btn5Ref.textContent =
          Number(this.refs.btn5Ref.textContent) + 5;
        currentPage = this.refs.btn1Ref.textContent;
      }

      if (event.target.classList.contains('arrow-left') && currentPage >= 5) {
        this.refs.btns.forEach(el =>
          el.classList.remove('pagination--current')
        );
        this.refs.btn1Ref.textContent =
          Number(this.refs.btn1Ref.textContent) - 5;
        this.refs.btn2Ref.textContent =
          Number(this.refs.btn2Ref.textContent) - 5;
        this.refs.btn3Ref.textContent =
          Number(this.refs.btn3Ref.textContent) - 5;
        this.refs.btn4Ref.textContent =
          Number(this.refs.btn4Ref.textContent) - 5;
        this.refs.btn5Ref.textContent =
          Number(this.refs.btn5Ref.textContent) - 5;
        this.refs.btn5Ref.classList.add('pagination--current');
        currentPage = this.refs.btn5Ref.textContent;
      }

      if (event.target.classList.contains('first-button')) {
        this.refs.btns.forEach(el =>
          el.classList.remove('pagination--current')
        );
        this.refs.btn1Ref.textContent = 1;
        this.refs.btn2Ref.textContent = 2;
        this.refs.btn3Ref.textContent = 3;
        this.refs.btn4Ref.textContent = 4;
        this.refs.btn5Ref.textContent = 5;
        this.refs.btn1Ref.classList.add('pagination--current');
        currentPage = btn1Ref.textContent;
        this.refs.leftArrowRef.hidden = true;
        this.refs.prevDotsRef.hidden = true;
        this.refs.firstPageRef.hidden = true;
      }

      if (event.target.classList.contains('last-button')) {
        this.refs.btns.forEach(el =>
          el.classList.remove('pagination--current')
        );
        this.refs.btn1Ref.textContent =
          Number(this.refs.lastPageRef.textContent) - 4;
        this.refs.btn2Ref.textContent =
          Number(this.refs.lastPageRef.textContent) - 3;
        this.refs.btn3Ref.textContent =
          Number(this.refs.lastPageRef.textContent) - 2;
        this.refs.btn4Ref.textContent =
          Number(this.refs.lastPageRef.textContent) - 1;
        this.refs.btn5Ref.textContent = this.refs.lastPageRef.textContent;
        this.refs.btn5Ref.classList.add('pagination--current');
        currentPage = this.refs.btn5Ref.textContent;
        this.refs.rightArrowRef.hidden = true;
        this.refs.afterDotsRef.hidden = true;
        this.refs.lastPageRef.hidden = true;
      }

      if (Number(currentPage) > 5) {
        this.refs.leftArrowRef.hidden = false;
        this.refs.prevDotsRef.hidden = false;
        this.refs.firstPageRef.hidden = false;
      } else {
        this.refs.leftArrowRef.hidden = true;
        this.refs.prevDotsRef.hidden = true;
        this.refs.firstPageRef.hidden = true;
      }

      if (Number(currentPage) < 996) {
        this.refs.rightArrowRef.hidden = false;
        this.refs.afterDotsRef.hidden = false;
        this.refs.lastPageRef.hidden = false;
      }
      // window.scrollTo({ top: 0, behavior: 'smooth' });

      this.renderUserReviews(currentPage);
    }
  }
}

new UserApi();
