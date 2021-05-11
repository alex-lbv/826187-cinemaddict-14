import AbstractView from './abstract.js';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return (
    type === 'all'
      ? `<a href="#${name}" class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item&#45;&#45;active' : ''}">${name}
         </a>`
      : `<a href="#${name}" class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item&#45;&#45;active' : ''}">${name}
            <span class="main-navigation__item-count">${count}</span>
        </a>`
  );
};

export default class SiteMenu extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    const filtersTemplate = this._filters
      .map((filter) => createFilterItemTemplate(filter, this._currentFilterType)).join('');

    return (
      `<nav class="main-navigation">
        <div class="main-navigation__items">
            ${filtersTemplate}
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
      </nav>`
    );
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }
}

