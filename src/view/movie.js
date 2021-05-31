import {formatDuration} from '../utils/date-time.js';
import {MAX_LENGTH_SHORT_DESCRIPTION} from '../utils/movie.js';
import AbstractView from './abstract.js';
import dayjs from 'dayjs';

const createMovieTemplate = (movie) => {
  const {
    title,
    rating,
    productionYear,
    duration,
    poster,
    genres,
    description,
    comments,
    isWatchlist,
    isWatched,
    isFavorite,
  } = movie;

  const activeClassName = (condition) => {
    return condition ? 'film-card__controls-item--active' : '';
  };

  let shortDescription;
  (description.length > MAX_LENGTH_SHORT_DESCRIPTION)
    ? shortDescription = `${description.substring(0, MAX_LENGTH_SHORT_DESCRIPTION)}...`
    : shortDescription = description;


  return (
    `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
            <span class="film-card__year">${dayjs(productionYear.date).format('YYYY')}</span>
            <span class="film-card__duration">${formatDuration(duration)}</span>
            <span class="film-card__genre">${genres[0]}</span>
        </p>
        <img src="${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${shortDescription}</p>
        <a class="film-card__comments">${comments.length} comments</a>
        <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${activeClassName(isWatchlist)}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${activeClassName(isWatched)}" type="button">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${activeClassName(isFavorite)}" type="button">Mark as favorite</button>
        </div>
    </article>`);
};

export default class Movie extends AbstractView {
  constructor(movie) {
    super();
    this._movie = movie;

    this._clickHandler = this._clickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createMovieTemplate(this._movie);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setOpenClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-card__poster')
      .addEventListener('click', this._clickHandler);
    this.getElement().querySelector('.film-card__title')
      .addEventListener('click', this._clickHandler);
    this.getElement().querySelector('.film-card__comments')
      .addEventListener('click', this._clickHandler);
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

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this._favoriteClickHandler);
  }
}
