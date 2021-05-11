import AbstractView from './abstract.js';
import {FilterOrder} from '../const.js';

export default class FooterStatistics extends AbstractView {
  constructor(filter) {
    super();

    this._filter = filter[FilterOrder.ALL];
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    const {count} = this._filter;

    return `<p>${count} movies inside</p>`;
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
