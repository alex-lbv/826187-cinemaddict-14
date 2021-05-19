import Abstract from './abstract.js';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._data = {};
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      update,
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const prevElementScrollValue = this.getScrollPosition();

    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.setScrollPosition(prevElementScrollValue);

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }

  getScrollPosition() {
    return this.getElement().scrollTop;
  }

  setScrollPosition(position) {
    this.getElement().scrollTop = position;
  }
}
