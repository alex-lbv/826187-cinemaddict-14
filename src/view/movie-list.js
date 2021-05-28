import AbstractView from './abstract.js';

const createMovieListTemplate = () => {
  return '<div class="films-list__container"></div';
};

export default class MovieList extends AbstractView {
  getTemplate() {
    return createMovieListTemplate();
  }
}
