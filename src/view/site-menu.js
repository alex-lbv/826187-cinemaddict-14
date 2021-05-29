import AbstractView from './abstract.js';
import {FilterType, MenuItem} from '../const.js';

const createFilterItemTemplate = (filter, currentFilterType, currentMenuSection) => {
  const {type, name, count} = filter;

  let dataFilterType = '';
  switch (name) {
    case FilterType.ALL:
      dataFilterType = `${FilterType.ALL}`;
      break;
    case FilterType.WATCHLIST:
      dataFilterType = `${FilterType.WATCHLIST}`;
      break;
    case FilterType.HISTORY:
      dataFilterType = `${FilterType.HISTORY}`;
      break;
    case FilterType.FAVORITES:
      dataFilterType = `${FilterType.FAVORITES}`;
      break;
  }

  const counter = name !== FilterType.ALL ? ` <span class="main-navigation__item-count">${count}</span>` : '';

  return (`<a href="#${name}"
         class="main-navigation__item${type === currentFilterType && currentMenuSection === MenuItem.MOVIES ? ' main-navigation__item--active' : ''}"
         data-filter-type="${dataFilterType}">${name}${counter}</a>`);
};

const createSiteMenuTemplate = (filterItems, currentFilterType, currentMenuSection) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType, currentMenuSection))
    .join('');

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
          ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional ${currentMenuSection === MenuItem.STATISTICS ? 'main-navigation__additional--active' : ''}">Stats</a>
    </nav>`);
};

export default class SiteMenu extends AbstractView {
  constructor(filters, currentFilterType, currentMenuSection) {
    super();

    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._currentMenuSection = currentMenuSection;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._statisticsClickHandler = this._statisticsClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters, this._currentFilter, this._currentMenuSection);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  }

  _statisticsClickHandler(evt) {
    evt.preventDefault();
    this._callback.openStatistics(evt);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelectorAll('.main-navigation__item')
      .forEach((item) => item
        .addEventListener('click', this._filterTypeChangeHandler));
  }

  setStatisticsClickHandler(callback) {
    this._callback.openStatistics = callback;
    this.getElement().querySelector('.main-navigation__additional')
      .addEventListener('click', this._statisticsClickHandler);
  }
}
