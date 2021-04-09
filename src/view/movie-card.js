import {getDuration, getDate} from '../const.js';

export const createMovieCardTemplate = (film) => {
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
  } = film;

  const activeClassName = (condition) => {
    return condition ? 'film-card__controls-item--active' : '';
  };

  return `<article class="film-card">
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
        </article>`;
};
