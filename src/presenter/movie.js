import MovieView from '../view/movie.js';
import MoviePopupView from '../view/movie-popup.js';
import {remove, render, replace} from '../utils/render.js';
import {UpdateType} from '../const.js';

const Mode = {
  CARD: 'CARD',
  POPUP: 'POPUP',
};

export default class Movie {
  constructor(movieListContainer, changeData, changeMode) {
    this._movieListContainer = movieListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._movieComponent = null;
    this._moviePopupComponent = null;
    this._mode = Mode.CARD;

    this._moviePopupContainer = document.body;

    this._handleOpenClick = this._handleOpenClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._handleCommentDelete = this._handleCommentDelete.bind(this);
    this._commentAddHandler = this._commentAddHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(movie) {
    this._movie = movie;

    const prevMovieComponent = this._movieComponent;

    this._movieComponent = new MovieView(movie);

    this._movieComponent.setOpenClickHandler(this._handleOpenClick);
    this._movieComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._movieComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._movieComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevMovieComponent === null) {
      return render(this._movieListContainer, this._movieComponent);
    }

    if (this._movieListContainer.getElement().contains(prevMovieComponent.getElement())) {
      replace(this._movieComponent, prevMovieComponent);
    }

    remove(prevMovieComponent);
  }

  destroy() {
    remove(this._movieComponent);
  }

  resetView() {
    if (this._mode !== Mode.CARD) {
      this._closeMoviePopup();
    }
  }

  _openMoviePopup() {
    this._changeMode();
    this._mode = Mode.POPUP;

    const prevMoviePopupComponent = this._moviePopupComponent;
    this._moviePopupComponent = new MoviePopupView(this._movie);

    this._moviePopupComponent.setCloseClickHandler(this._handleCloseClick);
    this._moviePopupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._moviePopupComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._moviePopupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._moviePopupComponent.setCommentDeleteHandler(this._handleCommentDelete);
    this._moviePopupComponent.setCommentAddHandler(this._commentAddHandler);

    if (prevMoviePopupComponent === null) {
      render(this._moviePopupContainer, this._moviePopupComponent);
      document.addEventListener('keydown', this._escKeyDownHandler);
      document.body.classList.add('hide-overflow');
      return;
    }

    if (this._mode === Mode.POPUP) {
      replace(this._moviePopupComponent, prevMoviePopupComponent);
      document.addEventListener('keydown', this._escKeyDownHandler);
      document.body.classList.add('hide-overflow');
    }

    remove(prevMoviePopupComponent);
  }

  _closeMoviePopup() {
    if (this._mode !== Mode.CARD) {
      this._moviePopupComponent.getElement().remove();
      document.body.classList.remove('hide-overflow');
      document.removeEventListener('keydown', this._escKeyDownHandler);
      this._moviePopupComponent = null;
      this._mode = Mode.CARD;
    }
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._moviePopupComponent.reset(this._movie);
      this._closeMoviePopup();
    }
  }

  _handleOpenClick() {
    this._openMoviePopup();
  }

  _handleWatchlistClick() {
    this._changeData(
      UpdateType.PATCH,
      Object.assign(
        {},
        this._movie,
        {
          isWatchlist: !this._movie.isWatchlist,
        },
      ),
    );
  }

  _handleWatchedClick() {
    this._changeData(
      UpdateType.PATCH,
      Object.assign(
        {},
        this._movie,
        {
          isWatched: !this._movie.isWatched,
        },
      ),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      UpdateType.PATCH,
      Object.assign(
        {},
        this._movie,
        {
          isFavorite: !this._movie.isFavorite,
        },
      ),
    );
  }

  _handleCloseClick() {
    this._closeMoviePopup();
  }

  _handleCommentDelete(evt, id) {
    evt.preventDefault();
    const movie = this._movie;
    const comments = movie.comments.filter((item) => item.id !== id);

    this._changeData(
      UpdateType.PATCH,
      Object.assign(
        {},
        this._movie,
        {comments},
      ),
    );
  }

  _commentAddHandler() {
    console.log('comment Adds');
  }
}
