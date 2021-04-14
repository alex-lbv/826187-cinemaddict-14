import AbstractView from './abstract.js';

export default class FilmListContainer extends AbstractView {
  getTemplate() {
    return '<div class="films-list__container"></div>';
  }
}
