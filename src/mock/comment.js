import {nanoid} from 'nanoid';
import {getRandomElementOfArray} from '../utils/common.js';
import {generateDate} from '../utils/date-time.js';

const EMOTIONS = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

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

export const generateComment = () => {
  return {
    id: nanoid(),
    author: getRandomElementOfArray(AUTHORS_COMMENT),
    text: getRandomElementOfArray(COMMENTS),
    date: generateDate(),
    emotion: getRandomElementOfArray(EMOTIONS),
  };
};
