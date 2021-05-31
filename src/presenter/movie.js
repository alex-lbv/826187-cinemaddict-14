import MovieView from '../view/movie.js';
import MoviePopupView from '../view/movie-popup.js';
import {remove, render, replace} from '../utils/render.js';
import {MoviePopupState, UpdateType, UserAction} from '../const.js';
import CommentsModel from '../model/comments.js';

const Mode = {
  CARD: 'CARD',
  POPUP: 'POPUP',
};

export default class Movie {
  constructor(movieListContainer, changeData, changeMode, api) {
    this._movieListContainer = movieListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._commentsModel = new CommentsModel();
    this._api = api;

    this._movieComponent = null;
    this._moviePopupComponent = null;
    this._mode = Mode.CARD;

    this._moviePopupContainer = document.body;

    this._handleOpenClick = this._handleOpenClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._handleCommentDeleteClick = this._handleCommentDeleteClick.bind(this);
    this._commentAddHandler = this._commentAddHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._commentsModel.addObserver(this._handleModelEvent);
  }

  init(movie) {
    this._movie = movie;

    const prevMovieComponent = this._movieComponent;

    this._movieComponent = new MovieView(this._movie);

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

    if (this._mode === Mode.CARD) {
      remove(this._moviePopupComponent);
    }
  }

  resetView() {
    if (this._mode !== Mode.CARD) {
      this._closeMoviePopup();
    }
  }

  setViewState(state, id) {
    const resetState = () => {
      this._moviePopupComponent.updateData({
        isDeleting: false,
        deletingCommentId: '',
        isDisabled: false,
      });
    };

    switch (state) {
      case MoviePopupState.SENDING:
        this._moviePopupComponent.updateData({
          isDisabled: true,
        });
        break;
      case MoviePopupState.DELETING:
        this._moviePopupComponent.updateData({
          isDeleting: true,
          deletingCommentId: id,
        });
        break;
      case MoviePopupState.ABORTING_SENDING:
        this._moviePopupComponent.shake(resetState);
        break;
    }
  }

  _openMoviePopup(comments) {
    this._changeMode();
    this._mode = Mode.POPUP;
    this._comments = comments;

    const prevMoviePopupComponent = this._moviePopupComponent;
    this._moviePopupComponent = new MoviePopupView(this._movie, this._comments);

    this._moviePopupComponent.setCloseClickHandler(this._handleCloseClick);
    this._moviePopupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._moviePopupComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._moviePopupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._moviePopupComponent.setCommentDeleteHandler(this._handleCommentDeleteClick);

    if (prevMoviePopupComponent === null) {
      render(this._moviePopupContainer, this._moviePopupComponent);
      this._moviePopupContainer.classList.add('hide-overflow');
      document.addEventListener('keydown', this._escKeyDownHandler);
      document.addEventListener('keydown', this._commentAddHandler);
      return;
    }

    if (this._mode === Mode.POPUP) {
      replace(this._moviePopupComponent, prevMoviePopupComponent);
      this._moviePopupContainer.classList.add('hide-overflow');
      document.addEventListener('keydown', this._escKeyDownHandler);
      document.addEventListener('keydown', this._commentAddHandler);
    }

    remove(prevMoviePopupComponent);
  }

  _closeMoviePopup() {
    this._changeData(UpdateType.MINOR, this._movie);
    remove(this._moviePopupComponent);
    this._commentsModel.removeObserver(this._handleModelEvent);
    this._moviePopupContainer.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._escKeyDownHandler);
    document.removeEventListener('keydown', this._commentAddHandler);
    this._mode = Mode.CARD;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._closeMoviePopup();
    }
  }

  _handleModelEvent(userAction) {
    switch (userAction) {
      case UserAction.ADD_COMMENT:
        this._changeData(
          UpdateType.PATCH,
          Object.assign(
            {},
            this._movie,
            {
              comments: this._commentsModel.getComments().map((item) => item.id),
            },
          ),
        );
        this._moviePopupComponent.updateMoviePopup(this._commentsModel.getComments());
        break;
      case UserAction.DELETE_COMMENT:
        this._changeData(
          UpdateType.PATCH,
          Object.assign(
            {},
            this._movie,
            {
              comments: this._commentsModel.getComments().map((item) => item.id),
            },
          ),
        );
        this._moviePopupComponent.updateMoviePopup(this._commentsModel.getComments());
        break;
    }
  }

  _handleOpenClick() {
    this._api.getComments(this._movie.id)
      .then((comments) => {
        this._commentsModel.setComments(comments);
        this._openMoviePopup(this._commentsModel.getComments());
      })
      .catch(() => {
        this._commentsModel.setComments([]);
        this._openMoviePopup(this._commentsModel.getComments());
      });
  }

  _handleWatchlistClick() {
    this._changeData(
      this._mode === Mode.CARD ? UpdateType.MINOR : this._mode === Mode.POPUP ? UpdateType.PATCH : '',
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
      this._mode === Mode.CARD ? UpdateType.MINOR : this._mode === Mode.POPUP ? UpdateType.PATCH : '',
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
      this._mode === Mode.CARD ? UpdateType.MINOR : this._mode === Mode.POPUP ? UpdateType.PATCH : '',
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

  _handleCommentDeleteClick(id) {
    this.setViewState(MoviePopupState.DELETING, id);
    this._api.deleteComment(id)
      .then(() => {
        this._commentsModel.deleteComment(UserAction.DELETE_COMMENT, id);
      })
      .catch(() => {
        this.setViewState(MoviePopupState.ABORTING_DELETING);
      });
  }

  _commentAddHandler(evt) {
    if ((evt.ctrlKey || evt.metaKey) && evt.code === 'Enter') {
      const newComment = this._moviePopupComponent.getNewComment();
      this.setViewState(MoviePopupState.SENDING);
      this._api.addComment(this._movie.id, newComment)
        .then((response) => {
          const addingComment = response.comments[response.comments.length - 1];
          return this._commentsModel.addComment(UserAction.ADD_COMMENT, addingComment);
        })
        .catch(() => {
          this.setViewState(MoviePopupState.ABORTING_SENDING);
        });
    }
  }
}
