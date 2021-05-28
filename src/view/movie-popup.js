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

const createPopupMovieTemplate = (data) => {
  const {
    comments,
    title,
    originalTitle,
    description,
    rating,
    ageRating,
    productionYear,
    duration,
    poster,
    genres,
    country,
    producer,
    screenwriters,
    actors,
    isWatchlist,
    isWatched,
    isFavorite,
  } = data;


  const createCommentsItemTemplate = (comment) => {
    const {id, author, text, date, emotion} = comment;

    return (
      `<li class="film-details__comment" data-comment-id="${id}">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="${emotion}">
        </span>
        <div>
          <p class="film-details__comment-text">${he.encode(text)}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${humanize(date)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
    </li>`);
  };

  const createCommentsTemplate = () => {
    return comments
      .map((comment, index) => createCommentsItemTemplate(comment, index === 0))
      .join('');
  };

  const activeInput = (condition) => {
    return condition ? 'checked' : '';
  };

  return (
    `<section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="film-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            <div class="film-details__info-wrap">
              <div class="film-details__poster">
                <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

                <p class="film-details__age">${ageRating}</p>
              </div>

              <div class="film-details__info">
                <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${title}</h3>
                    <p class="film-details__title-original">Original: ${originalTitle}</p>
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
                    <td class="film-details__cell">${screenwriters.join(', ')}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Actors</td>
                    <td class="film-details__cell">${actors.join(', ')}</td>
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

                <p class="film-details__film-description">
                  ${description}
                </p>
              </div>
            </div>

            <section class="film-details__controls">
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${activeInput(isWatchlist)}>
              <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

              <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${activeInput(isWatched)}>
              <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

              <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${activeInput(isFavorite)}>
              <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
            </section>
          </div>
          <div class="film-details__bottom-container">
              <section class="film-details__comments-wrap">
              <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
              <ul class="film-details__comments-list">
                ${createCommentsTemplate()}
              </ul>
              <div class="film-details__new-comment">
                <div class="film-details__add-emoji-label"></div>

                <label class="film-details__comment-label">
                  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                </label>

                <div class="film-details__emoji-list">
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                  <label class="film-details__emoji-label" for="emoji-smile">
                    <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                  <label class="film-details__emoji-label" for="emoji-sleeping">
                    <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                  <label class="film-details__emoji-label" for="emoji-puke">
                    <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                  </label>

                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                  <label class="film-details__emoji-label" for="emoji-angry">
                    <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                  </label>
                </div>
              </div>
            </section>
            </div>
        </form>
      </section>`);
};

export default class MoviePopup extends SmartView {
  constructor(movie) {
    super();
    this._data = MoviePopup.parseMovieToData(movie);

    this._clickHandler = this._clickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._commentDeleteHandler = this._commentDeleteHandler.bind(this);
    this._commentAddHandler = this._commentAddHandler.bind(this);
    this._emojiChangeHandler = this._emojiChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  reset(movie) {
    this.updateData(
      MoviePopup.parseMovieToData(movie),
    );
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
    this._callback.watchlistClick();
  }

  _watchedClickHandler() {
    this._callback.watchedClick();
  }

  _favoriteClickHandler() {
    this._callback.favoriteClick();
  }

  _commentInputHandler(evt) {
    this.updateData({
      comment: evt.target.value,
    }, true);
  }

  _commentDeleteHandler(evt) {
    if (evt.target.matches('.film-details__comment-delete')) {
      const id = evt.target.closest('.film-details__comment').dataset.commentId;
      const comments = this._data.comments.filter((item) => item.id !== id);
      this.updateData({
        comments,
      });
      this._callback.commentDelete(evt, id);
    }
  }

  _commentAddHandler(evt) {
    if ((evt.ctrlKey || evt.metaKey) && evt.key === 'Enter') {
      const newComment = {
        text: this._data.comment,
        emoji: this._data.emoji,
      };

      this._callback.commentAdd(newComment);

      this.updateData({
        emoji: null,
        comment: '',
      });
    }
  }

  _emojiChangeHandler(evt) {
    this.updateData({
      emoji: evt.target.value,
    }, true);
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
    this.getElement().querySelector('.film-details__comments-list')
      .addEventListener('click', this._commentDeleteHandler);
  }

  setCommentAddHandler(callback) {
    this._callback.commentAdd = callback;
    document.addEventListener('keydown', this._commentAddHandler);
  }

  static parseMovieToData(movie) {
    return Object.assign(
      {},
      movie,
      {
        emoji: null,
        comment: '',
      },
    );
  }

  static parseDataToMovie(data) {
    data = Object.assign({}, data);

    delete data.emoji;
    delete data.comment;

    return data;
  }
}
