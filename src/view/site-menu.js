import {createElement} from '../utils.js';

const createFilterItemTemplate = (filter, isActive) => {
  const {name, count, number} = filter;

  const titles = ['All movies', 'Watchlist', 'History', 'Favorites'];

  return (
    number === 0
      ? `<a href="#${name}" class="main-navigation__item ${isActive ? 'main-navigation__item&#45;&#45;active' : ''}">${titles[number]}
         </a>`
      : `<a href="#${name}" class="main-navigation__item ${isActive ? 'main-navigation__item&#45;&#45;active' : ''}">${titles[number]}
            <span class="main-navigation__item-count">${count}</span>
        </a>`
  );
};

const createSiteMenuTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
    ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class SiteMenu {
  constructor(filterItems) {
    this._filterItems = filterItems;
    this._element = null;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filterItems);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

