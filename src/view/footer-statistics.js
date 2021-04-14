import AbstractView from './abstract.js';

export default class FooterStatistics extends AbstractView {
  constructor(filter) {
    super();
    this._filter = filter;
  }

  getTemplate() {
    const {count} = this._filter;

    return `<p>${count} movies inside</p>`;
  }
}
