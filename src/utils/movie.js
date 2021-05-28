import {getRandomInteger, getRandomLengthArray} from './common.js';
import dayjs from 'dayjs';

export const MAX_LENGTH_SHORT_DESCRIPTION = 140;

export const generateList = (list) => {
  return getRandomLengthArray(list).slice(0, getRandomInteger(1, list.length - 1));
};

export const defineUserRank = (movies) => {
  const watchedMovies = movies.filter((movie) => movie.isWatched === true).length;
  if (watchedMovies < 0) {
    return 'No rank';
  } else if (watchedMovies > 0 && watchedMovies <= 10) {
    return 'Novice';
  } else if (watchedMovies > 10 && watchedMovies <= 20) {
    return 'Fan';
  } else {
    return 'Movie Buff';
  }
};

export const sortDate = (movieA, movieB) => {
  return dayjs(movieA.productionYear).diff(dayjs(movieB.productionYear));
};

export const sortRating = (movieA, movieB) => {
  return dayjs(movieB.rating).diff(dayjs(movieA.rating));
};

