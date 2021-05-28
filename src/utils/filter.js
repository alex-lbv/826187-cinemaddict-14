import {FilterType} from '../const.js';

export const filter = {
  [FilterType.ALL]: (movies) => movies.slice(),
  [FilterType.WATCHLIST]: (movies) => movies.filter((movie) => movie.isWatchlist),
  [FilterType.HISTORY]: (movies) => movies.filter((movie) => movie.isWatched),
  [FilterType.FAVORITES]: (movies) => movies.filter((movie) => movie.isFavorite),
};
