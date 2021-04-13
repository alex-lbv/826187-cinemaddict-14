import {createElement} from '../utils.js';

export default class ListEmpty {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return (
      `<section class="films-list">
        <h2 class="films-list__title">There are no movies in our database</h2>
      </section>`
    );
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