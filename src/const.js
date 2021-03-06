export const FilterType = {
  ALL: 'All movies',
  WATCHLIST: 'Watchlist',
  FAVORITES: 'Favorites',
  HISTORY: 'History',
};

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const UserAction = {
  UPDATE_MOVIE: 'UPDATE_MOVIE',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

export const MoviePopupState = {
  SENDING: 'SENDING',
  DELETING: 'DELETING',
  ABORTING_SENDING: 'ABORTING_SENDING',
  ABORTING_DELETING: 'ABORTING_DELETING',
};

export const StatisticsFilter = {
  ALL_TIME: 'all-time',
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};

export const RankScore = {
  NOVICE: {
    MIN: 1,
    MAX: 10,
  },
  FAN: {
    MIN: 11,
    MAX: 20,
  },
};

export const RankType = {
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff',
};

export const MenuItem = {
  MOVIES: 'MOVIES',
  STATISTICS: 'STATISTICS',
};
