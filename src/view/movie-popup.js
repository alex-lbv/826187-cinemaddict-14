import {formatDuration, formatReleaseDate, humanize} from '../utils/date-time.js';
import SmartView from './smart.js';
import he from 'he';

const createFilmGenresList = (genres) => {
  const genresList = Object.values(genres).map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');
  return (
    `<tr class="film-details__row">
        <td class="film-details__term">${(genres.length > 1) ? 'Genres' : 'Genre'}</td>
        <td class="film-details__cell" id="genresContainer">
            ${genresList}
        </td>
    </tr>`
  );
};

export const createPopupMovieTemplate = (data) => {
  const {
    title,
    originalTitle,
    rating,
    poster,
    ageRating,
    producer,
    writers,
    actors,
    productionYear,
    duration,
    genres,
    description,
    country,
  } = data;

  const {isWatchlist, isWatched, isFavorite} = data;

  const comment = data.comment;
  const emotion = data.emotion;
  const comments = data.comments;
  const isDisabled = data.isDisabled;
  const isDeleting = data.isDeleting;
  const deletingCommentId = data.deletingCommentId;

  const renderComments = (comments) => {
    return comments
      .map((comment) => {
        return `<li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
          </span>
          <div>
            <p class="film-details__comment-text">${he.encode(comment.comment)}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${comment.author}</span>
              <span class="film-details__comment-day">${humanize(comment.date)}</span>
              <button class="film-details__comment-delete" data-id="${comment.id}" ${isDeleting && comment.id === deletingCommentId ? 'disabled' : ''}>${isDeleting && comment.id === deletingCommentId ? 'Deleting...' : 'Delete'}</button>
            </p>
          </div>
        </li>`;
      })
      .join('');
  };
  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="">
            <p class="film-details__age">${ageRating}+</p>
          </div>
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">${originalTitle}</p>
              </div>
              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${producer}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${formatReleaseDate(productionYear)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${formatDuration(duration)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              ${createFilmGenresList(genres)}
            </table>
            <p class="film-details__film-description">${description}</p>
          </div>
        </div>
        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist ? 'checked' : ''}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? 'checked' : ''}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? 'checked' : ''}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>
      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
          <ul class="film-details__comments-list">
            ${renderComments(comments)}
          </ul>
          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">${!emotion ? '' : `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">`}</div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${isDisabled ? 'disabled' : ''}>${comment ? comment : ''}</textarea>
            </label>
            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${isDisabled ? 'disabled' : ''}>
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${isDisabled ? 'disabled' : ''}>
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${isDisabled ? 'disabled' : ''}>
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${isDisabled ? 'disabled' : ''}>
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class MoviePopup extends SmartView {
  constructor(movie, comments) {
    super();
    this._data = Object.assign(
      {},
      movie,
      {
        comments,
        comment: '',
        emotion: '',
        isDeleting: false,
        deletingCommentId: '',
        isDisabled: false,
      },
    );

    this._clickHandler = this._clickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._commentDeleteHandler = this._commentDeleteHandler.bind(this);
    this._emojiChangeHandler = this._emojiChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createPopupMovieTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseClickHandler(this._callback.click);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setCommentDeleteHandler(this._callback.commentDelete);
  }

  getNewComment() {
    return {
      comment: this._data.comment,
      emotion: this._data.emotion,
    };
  }

  updateMoviePopup(comments) {
    this.updateData({
      comments,
      comment: '',
      emotion: '',
      isDeleting: false,
      deletingCommentId: '',
      isDisabled: false,
    });
  }

  _setInnerHandlers() {
    this.getElement().querySelectorAll('.film-details__emoji-item')
      .forEach((element) => element.addEventListener('change', this._emojiChangeHandler));
    this.getElement().querySelector('.film-details__comment-input')
      .addEventListener('input', this._commentInputHandler);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _watchlistClickHandler() {
    this.updateData(
      Object.assign(
        {},
        this._data,
        {isWatchlist: !this._data.isWatchlist},
      ),
    );
    this._callback.watchlistClick();
  }

  _watchedClickHandler() {
    this.updateData(
      Object.assign(
        {},
        this._data,
        {isWatched: !this._data.isWatched},
      ),
    );
    this._callback.watchedClick();
  }

  _favoriteClickHandler() {
    this.updateData(
      Object.assign(
        {},
        this._data,
        {isFavorite: !this._data.isFavorite},
      ),
    );
    this._callback.favoriteClick();
  }

  _commentInputHandler(evt) {
    this.updateData({
      comment: evt.target.value,
    }, true);
  }

  _commentDeleteHandler(evt) {
    evt.preventDefault();
    const id = evt.target.dataset.id;
    this._callback.commentDelete(id);
  }

  _emojiChangeHandler(evt) {
    this.updateData({
      emotion: evt.target.value,
    });
  }

  setCloseClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-details__close-btn')
      .addEventListener('click', this._clickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('#watchlist')
      .addEventListener('click', this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('#watched')
      .addEventListener('click', this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('#favorite')
      .addEventListener('click', this._favoriteClickHandler);
  }

  setCommentDeleteHandler(callback) {
    this._callback.commentDelete = callback;
    this.getElement().querySelectorAll('.film-details__comment-delete')
      .forEach((elem) => elem.addEventListener('click', this._commentDeleteHandler));
  }
}
