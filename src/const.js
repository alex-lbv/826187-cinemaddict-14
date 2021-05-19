import dayjs from 'dayjs';
import {getRandomInteger} from './utils/common.js';

export const EMOTIONS = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

export const FRESH_COMMENT = {
  id: '',
  author: '',
  text: '',
  date: '',
  emotion: '',
};

export const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const getDuration = (duration, inHours = true) => {
  const totalDurations = dayjs.duration(duration, 'minutes');
  return (inHours) ? totalDurations.hours() : totalDurations.minutes();
};

export const getDate = (productionYear, format) => {
  return dayjs(productionYear).format(format);
};

export const getCommentDate = (date) => {
  return dayjs(date).format('YYYY/MM/DD/ hh:mm');
};

export const generateDate = () => {
  const maxStepGap = 1000;
  const stepGap = getRandomInteger(-maxStepGap, maxStepGap);

  return dayjs().add(stepGap, 'year').add(stepGap, 'day').add(stepGap, 'minute').toDate();
};

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

export const FilterOrder = {
  ALL: 0,
  WATCHLIST: 1,
  HISTORY: 2,
  FAVORITES: 3,
};
