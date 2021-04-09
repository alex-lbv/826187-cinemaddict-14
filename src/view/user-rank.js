import {numberInRange} from '../utils.js';

export const createUserRankTemplate = (filter) => {
  const {count} = filter;

  const levelRangeMap = {
    '': {
      MIN: 0,
      MAX: 0,
    },
    'novice': {
      MIN: 1,
      MAX: 10,
    },
    'fan': {
      MIN: 11,
      MAX: 20,
    },
    'movie buff': {
      MIN: 20,
      MAX: Infinity,
    },
  };

  const userRank = () => {
    return Object.entries(levelRangeMap).find(([, {MIN, MAX}]) => numberInRange(count, MIN, MAX))[0];
  };

  return `<section class="header__profile profile">
    <p class="profile__rating">${userRank()}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};