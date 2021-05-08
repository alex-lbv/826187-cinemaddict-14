import MovieCardView from '../view/movie-card.js';
import MovieDetailsView from '../view/movie-details.js';
import {remove, render, RenderPosition, replace} from '../utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  OPENED: 'OPENED',
};

export default class Film {
  constructor(filmListContainer, changeData, changeMode) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._closeAllOpenedPopups = changeMode;

    this._filmComponent = null;
    this._filmDetail = null;
    this._mode = Mode.DEFAULT;

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoritesClick = this._handleFavoritesClick.bind(this);
    this._handleViewClick = this._handleViewClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;

    this._filmComponent = new MovieCardView(film);

    this._filmComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setFavoritesClickHandler(this._handleFavoritesClick);
    this._filmComponent.setViewClickHandler(this._handleViewClick);

    if (prevFilmComponent === null) {
      render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._mode === Mode.OPENED) {
      replace(this._filmComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);
  }

  destroy() {
    // TODO: если Вставить это - то всё ок
    // this._filmDetail = new MovieDetailsView(this._film);
    // this._filmDetail.setWatchlistClickHandler(this._handleWatchlistClick);
    // this._filmDetail.setWatchedClickHandler(this._handleWatchedClick);
    // this._filmDetail.setFavoritesClickHandler(this._handleFavoritesClick);
    // this._filmDetail.setCloseClickHandler(this._handleCloseClick);

    remove(this._filmComponent);
    // TODO: если раскомментировать, то сортировка перестаёт работать
    // remove(this._filmDetail);
  }

  resetView() {
    if (this._mode === Mode.OPENED) {
      this._closeFilmDetail();
    }
  }

  _viewFilmDetail() {
    this._filmDetail = new MovieDetailsView(this._film);
    this._filmDetail.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmDetail.setWatchedClickHandler(this._handleWatchedClick);
    this._filmDetail.setFavoritesClickHandler(this._handleFavoritesClick);
    this._filmDetail.setCloseClickHandler(this._handleCloseClick);

    document.body.appendChild(this._filmDetail.getElement());
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.OPENED;
  }

  _closeFilmDetail() {
    document.body.removeChild(this._filmDetail.getElement());
    document.removeEventListener('keydown', this._escKeyDownHandler);
    document.body.classList.remove('hide-overflow');
    this._mode = Mode.DEFAULT;
    this._filmDetail = null;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._closeFilmDetail();
    }
  }

  _handleViewClick() {
    this._closeAllOpenedPopups();
    this._viewFilmDetail();
  }

  _handleCloseClick() {
    this._closeFilmDetail();
  }

  _handleFavoritesClick() {
    this._changeData(
      {
        ...this._film,
        userDetails: {
          ...this._film.userDetails,
          isFavorite: !this._film.userDetails.isFavorite,
        },
      },
    );
  }

  _handleWatchlistClick() {
    this._changeData(
      {
        ...this._film,
        userDetails: {
          ...this._film.userDetails,
          isOnWatchlist: !this._film.userDetails.isOnWatchlist,
        },
      },
    );
  }

  _handleWatchedClick() {
    this._changeData(
      {
        ...this._film,
        userDetails: {
          ...this._film.userDetails,
          viewed: !this._film.userDetails.viewed,
        },
      },
    );
  }
}
