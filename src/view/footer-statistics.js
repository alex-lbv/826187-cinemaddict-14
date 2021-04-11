import {createElement} from '../utils.js';

const createFooterStatisticsTemplate = (filter) => {
  const {count} = filter;

  return `<p>${count} movies inside</p>`;
};

export default class FooterStatistics {
  constructor(filter) {
    this._filter = filter;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._filter);
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
