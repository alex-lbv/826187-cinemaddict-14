import {getRandomInteger, getRandomLengthArray} from './common.js';
import dayjs from 'dayjs';

export const generateList = (list) => {
  return getRandomLengthArray(list).slice(0, getRandomInteger(1, list.length - 1));
};

export const sortFilmDateUp = (filmA, filmB) => {
  return dayjs(filmA.filmInfo.release.productionYear).diff(dayjs(filmB.filmInfo.release.productionYear));
};

export const sortFilmRatingDown = (filmA, filmB) => {
  return dayjs(filmB.filmInfo.rating).diff(dayjs(filmA.filmInfo.rating));
};
