import {getDuration, getDate} from '../const.js';
import AbstractView from './abstract.js';

export default class MovieCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoritesClickHandler = this._favoritesClickHandler.bind(this);
    this._viewClickHandler = this._viewClickHandler.bind(this);
  }

  getTemplate() {
    const {
      comments,
      filmInfo: {
        title,
        poster,
        shortDescription,
        rating,
        genres,
        duration,
        release: {
          productionYear,
        },
      },
      userDetails: {
        isOnWatchlist,
        viewed,
        isFavorite,
      },
    } = this._film;

    const activeClassName = (condition) => {
      return condition ? 'film-card__controls-item--active' : '';
    };

    return (
      `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${getDate(productionYear, 'YYYY')}</span>
            <span class="film-card__duration">${getDuration(duration)}h ${getDuration(duration, false)}m</span>
            <span class="film-card__genre">${genres[0]}</span>
          </p>
          <img src="./images/posters/${poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${shortDescription}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <div class="film-card__controls">
            <button
                class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${activeClassName(isOnWatchlist)}"
                type="button">Add to watchlist</button>
            <button
                class="film-card__controls-item button film-card__controls-item--mark-as-watched ${activeClassName(viewed)}"
                type="button">Mark as watched</button>
            <button
                class="film-card__controls-item button film-card__controls-item--favorite ${activeClassName(isFavorite)}"
                type="button">Mark as favorite</button>
          </div>
        </article>`
    );
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favoritesClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoritesClick();
  }

  _viewClickHandler(evt) {
    evt.preventDefault();
    this._callback.viewClick();
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this._watchedClickHandler);
  }

  setFavoritesClickHandler(callback) {
    this._callback.favoritesClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this._favoritesClickHandler);
  }

  setViewClickHandler(callback) {
    this._callback.viewClick = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._viewClickHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._viewClickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._viewClickHandler);
  }
}
