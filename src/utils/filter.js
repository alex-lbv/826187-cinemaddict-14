import {FilterType} from '../const.js';

export const filter = {
  [FilterType.ALL]: (films) => films.filter((film) => film),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.userDetails.isOnWatchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.userDetails.viewed),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.userDetails.isFavorite),
};
