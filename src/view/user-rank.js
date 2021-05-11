import AbstractView from './abstract.js';
import {numberInRange} from '../utils/common.js';
import {FilterOrder} from '../const.js';

export default class UserRank extends AbstractView {
  constructor(filter) {
    super();
    this._filter = filter[FilterOrder.HISTORY];

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    const {count} = this._filter;

    const levelRangeMap = {
      '': {
        MIN: 0,
        MAX: 0,
      },
      'novice': {
        MIN: 1,
        MAX: 10,
      },
      'fan': {
        MIN: 11,
        MAX: 19,
      },
      'movie buff': {
        MIN: 20,
        MAX: Infinity,
      },
    };

    const userRank = () => {
      return Object.entries(levelRangeMap).find(([, {MIN, MAX}]) => numberInRange(count, MIN, MAX))[0];
    };

    return (
      `<section class="header__profile profile">
        <p class="profile__rating">${userRank()}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
    );
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;

    setTimeout(() => {
      document.querySelectorAll('.main-navigation__item')[2]
        .addEventListener('change', this._filterTypeChangeHandler);
    }, 0);
  }
}
