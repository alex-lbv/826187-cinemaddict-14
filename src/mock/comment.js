import {EMOTIONS, generateDate} from '../const.js';
import {getRandomElementOfArray} from '../utils/common.js';
import {nanoid} from 'nanoid';

const COMMENTS = [
  'Interesting setting and a good cast' +
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?',
];
const AUTHORS_COMMENT = [
  'Tim Macoveev',
  'John Doe',
];

export const generateComments = () => {
  return {
    id: nanoid(),
    author: getRandomElementOfArray(AUTHORS_COMMENT),
    text: getRandomElementOfArray(COMMENTS),
    date: generateDate(),
    emotion: getRandomElementOfArray(EMOTIONS),
  };
};
