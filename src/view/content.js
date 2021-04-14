import AbstractView from './abstract.js';

export default class Content extends AbstractView {
  getTemplate() {
    return '<section class="films"></section>';
  }
}
