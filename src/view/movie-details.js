import {getDuration, getDate, getCommentDate, FRESH_COMMENT} from '../const.js';
import SmartView from './smart.js';

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

const createFilmComments = (comments) => {
  const commentsList = Object.values(comments).map((comment) => {
    const {author, date, text, emotion} = comment;

    return (
      `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${getCommentDate(date)}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`
    );
  }).join('');

  return `<ul class="film-details__comments-list">${commentsList}</ul>`;
};

export default class MovieDetails extends SmartView {
  constructor(film) {
    super();
    this._data = MovieDetails.parseFilmToData(film);
    this._comment = {...FRESH_COMMENT};

    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoritesClickHandler = this._favoritesClickHandler.bind(this);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._smileChangeHandler = this._smileChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    const {
      comments,
      filmInfo: {
        title,
        originalFilmTitle,
        poster,
        description,
        rating,
        ageRating,
        genres,
        producer,
        screenwriters,
        actors,
        duration,
        release: {
          productionYear,
          country,
        },
      },
      userDetails: {
        isOnWatchlist,
        viewed,
        isFavorite,
      },
    } = this._data;

    const active = (condition) => {
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

                  <p class="film-details__age">${ageRating}+</p>
                </div>

                <div class="film-details__info">
                  <div class="film-details__info-head">
                    <div class="film-details__title-wrap">
                      <h3 class="film-details__title">${title}</h3>
                      <p class="film-details__title-original">Original: ${originalFilmTitle}</p>
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
                      <td class="film-details__cell">${getDate(productionYear, 'D MMMM YYYY')}</td>
                    </tr>
                    <tr class="film-details__row">
                      <td class="film-details__term">Runtime</td>
                      <td class="film-details__cell">${getDuration(duration)}h ${getDuration(duration, false)}m</td>
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
                <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${active(isOnWatchlist)}>
                <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

                <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${active(viewed)}>
                <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

                <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${active(isFavorite)}>
                <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
              </section>
            </div>

            <div class="film-details__bottom-container">
            <section class="film-details__comments-wrap">
              <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

              ${createFilmComments(comments)}

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
      </section>`
    );
  }

  _watchlistClickHandler() {
    this._callback.watchlistClick();
  }

  _watchedClickHandler() {
    this._callback.watchedClick();
  }

  _favoritesClickHandler() {
    this._callback.favoritesClick();
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-details__control-label--watchlist')
      .addEventListener('click', this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-details__control-label--watched')
      .addEventListener('click', this._watchedClickHandler);
  }

  setFavoritesClickHandler(callback) {
    this._callback.favoritesClick = callback;
    this.getElement().querySelector('.film-details__control-label--favorite')
      .addEventListener('click', this._favoritesClickHandler);
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector('.film-details__close-btn')
      .addEventListener('click', this._closeClickHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this._commentInputHandler);

    this.getElement()
      .querySelector('.film-details__emoji-list')
      .addEventListener('change', this._smileChangeHandler);
  }

  _commentInputHandler(evt) {
    evt.preventDefault();

    this._comment = {...this._comment, text: evt.target.value};

    this.updateData({
      ...this._data,
      comments: {
        ...this._data.comments,
        comment: this._comment,
      },
    }, true);
  }

  _smileChangeHandler(evt) {
    evt.preventDefault();

    const emojiList = this.getElement().querySelector('.film-details__add-emoji-label');

    if (emojiList.children.length > 0) {
      emojiList.querySelector('img').remove();
      emojiList.querySelector('input').remove();
    }
    const elementHiddenInput = document.createElement('input');
    elementHiddenInput.type = 'hidden';
    elementHiddenInput.value = evt.target.value;
    const element = document.createElement('img');
    element.width = 55;
    element.height = 55;
    element.alt = `emoji-${evt.target.value}`;
    element.src = `./images/emoji/${evt.target.value}.png`;
    const label = this.getElement().querySelector('.film-details__add-emoji-label');
    label.appendChild(elementHiddenInput);
    label.appendChild(element);

    this._comment = {...this._comment, emotion: evt.target.value};

    this.updateData({
      ...this._data,
      comments: {
        ...this._data.comments,
        comment: this._comment,
      },
    }, true);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(MovieDetails.parseDataToFilm(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  static parseFilmToData(film) {
    return {...film};
  }

  static parseDataToFilm(data) {
    return {...data};
  }
}
