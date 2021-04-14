import {getRandomInteger, getRandomLengthArray} from './common.js';

export const generateList = (list) => {
  return getRandomLengthArray(list).slice(0, getRandomInteger(1, list.length - 1));
};
