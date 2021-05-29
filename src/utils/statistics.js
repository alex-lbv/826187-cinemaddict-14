import dayjs from 'dayjs';
import {RankScore, RankType} from '../const.js';
dayjs.extend(isBetween);
import isBetween from 'dayjs/plugin/isBetween';

export const getUserRank = (movies) => {
  const watchedMoviesCount = movies.filter((movie) => movie.isWatched).length;

  if (!watchedMoviesCount) {
    return false;
  }

  if (watchedMoviesCount >= RankScore.NOVICE.MIN && watchedMoviesCount <= RankScore.NOVICE.MAX) {
    return RankType.NOVICE;
  }

  if (watchedMoviesCount >= RankScore.FAN.MIN && watchedMoviesCount <= RankScore.FAN.MAX) {
    return RankType.FAN;
  }

  if (watchedMoviesCount > RankScore.FAN.MAX) {
    return RankType.MOVIE_BUFF;
  }
};

export const getTotalDuration = (movies) => {
  const totalDuration = movies.reduce((duration, movie) => {
    return duration + movie.duration;
  }, 0);
  return {
    HOURS: Math.floor(totalDuration / 60),
    MINUTES: totalDuration % 60,
  };
};

export const getTopGenre = (movies) => {
  if (movies.length === 0) {
    return '';
  }

  const genresStatistics = getGenresStatistics(movies);
  const topGenreStatistics = Object.entries(genresStatistics).sort((a, b) => b[1] - a[1])[0];
  const topGenreName = topGenreStatistics[0];
  return topGenreName;
};

export const getGenresStatistics = (movies) => {
  const genresStatistics = {};

  movies
    .reduce((acc, movie) => acc.concat(movie.genres), [])
    .forEach((genre) => {
      if (genresStatistics[genre]) {
        genresStatistics[genre]++;
        return;
      }
      genresStatistics[genre] = 1;
    });

  return genresStatistics;
};

export const filterByDate = (movies, filterType) => {
  return movies.filter((movie) => {
    const startDate = filterType === 'day' ? dayjs().startOf('day') : dayjs().startOf('day').subtract(1, filterType);
    return dayjs(movie.watchingDate).isBetween(startDate, dayjs());
  });
};
