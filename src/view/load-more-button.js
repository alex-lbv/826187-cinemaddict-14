import AbstractView from './abstract.js';

export default class LoadMoreButton extends AbstractView {
  getTemplate() {
    return '<button class="films-list__show-more">Show more</button>';
  }
}
