import MovieCardView from '../view/movie-card.js';
import MovieDetailsView from '../view/movie-details.js';
import {remove, render, RenderPosition, replace} from '../utils/render.js';

const siteBodyElement = document.querySelector('body');

export default class Film {
  constructor(filmListContainer) {
    this._filmListContainer = filmListContainer;

    this._filmComponent = null;
    this._filmDetail = null;

    this._handleViewClick = this._handleViewClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;
    const prevFilmDetail = this._filmDetail;

    this._filmComponent = new MovieCardView(film);
    this._filmDetail = new MovieDetailsView(film);

    this._filmComponent.setViewClickHandler(this._handleViewClick);
    this._filmDetail.setCloseClickHandler(this._handleCloseClick);

    if (prevFilmComponent === null || prevFilmDetail === null) {
      render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmListContainer.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._filmListContainer.getElement().contains(prevFilmDetail.getElement())) {
      replace(this._filmDetail, prevFilmDetail);
    }

    remove(prevFilmComponent);
    remove(prevFilmDetail);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmDetail);
  }

  _viewFilmDetail() {
    siteBodyElement.appendChild(this._filmDetail.getElement());
    siteBodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _closeFilmDetail() {
    siteBodyElement.removeChild(this._filmDetail.getElement());
    siteBodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._closeFilmDetail();
    }
  }

  _handleViewClick() {
    this._viewFilmDetail();
  }

  _handleCloseClick() {
    this._closeFilmDetail();
  }
}
