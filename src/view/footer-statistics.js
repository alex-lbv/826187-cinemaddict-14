import {createElement} from '../utils.js';

export default class FooterStatistics {
  constructor(filter) {
    this._filter = filter;
    this._element = null;
  }

  getTemplate() {
    const {count} = this._filter;

    return `<p>${count} movies inside</p>`;
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
