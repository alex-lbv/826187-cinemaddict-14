import {getRandomElementOfArray} from '../utils.js';
import {generateDate} from '../const.js';

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
const EMOTIONS_COMMENT = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

let IdComment = 0;

export const generateComments = () => {
  return {
    id: IdComment++,
    author: getRandomElementOfArray(AUTHORS_COMMENT),
    text: getRandomElementOfArray(COMMENTS),
    date: generateDate(),
    emotion: getRandomElementOfArray(EMOTIONS_COMMENT),
  };
};
