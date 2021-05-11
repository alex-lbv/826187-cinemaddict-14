import AbstractView from './abstract.js';
import {FilterOrder} from '../const.js';

export default class FooterStatistics extends AbstractView {
  constructor(filter) {
    super();

    this._filter = filter[FilterOrder.ALL];
  }

  getTemplate() {
    const {count} = this._filter;

    return `<p>${count} movies inside</p>`;
  }
}
