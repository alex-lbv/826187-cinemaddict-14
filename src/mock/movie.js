import {
  getRandomElementOfArray,
  getRandomFloatNumber,
  getRandomInteger,
  getRandomLengthArray
} from '../utils/common.js';
import {generateList} from '../utils/movie.js';
import {generateComment} from './comment.js';
import {nanoid} from 'nanoid';

const MAX_COMMENTS = 5;
const MIN_DURATION = 30;
const MAX_DURATION = 220;
const MIN_RATING = 0;
const MAX_RATING = 10;

const MOVIE_TITLES = [
  'The Dance of Life',
  'Sagebrush Trail',
  'The Man with the Golden Arm',
  'Santa Claus Conquers the Martians',
  'Popeye the Sailor Meets Sindbad the Sailor',
];

const MOVIE_POSTERS = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];

const GENRES = [
  'Musical',
  'Western',
  'Drama',
  'Comedy',
  'Cartoon',
  'Film-Noir',
  'Mystery',
];
const DIRECTORS = [
  'Anthony Mann',
  'Steven Spielberg',
  'Martin Scorsese',
  'Ridley Scott',
  'John Woo',
];
const WRITERS = [
  'Anne Wigton',
  'Heinz Herald',
  'Richard Weil',
];
const ACTORS = [
  'Erich von Stroheim',
  'Mary Beth Hughes',
  'Dan Duryea',
  'Robert De Niro',
  'Jack Nicholson',
  'Marlon Brando',
];
const COUNTRIES = [
  'USA',
  'Germany',
  'Mexico',
  'Turkey',
  'Russia',
];

const AGE_RATINGS = [
  '0+',
  '6+',
  '12+',
  '16+',
  '18+',
];

const DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const generateDescription = () => {
  const description = DESCRIPTION.split('. ');
  const randomLengthDescription = description.slice(0, getRandomInteger(1, 5));
  return getRandomLengthArray(randomLengthDescription).join('. ');
};

export const generateMovie = () => {
  const title = getRandomElementOfArray(MOVIE_TITLES);
  const description = generateDescription();
  const productionYear = getRandomInteger(1980, 2021);
  const comments = new Array(getRandomInteger(0, MAX_COMMENTS)).fill(null).map(generateComment);

  return {
    id: nanoid(),
    comments,
    title,
    originalTitle: title,
    rating: getRandomFloatNumber(MIN_RATING, MAX_RATING),
    poster: getRandomElementOfArray(MOVIE_POSTERS),
    description,
    ageRating: getRandomElementOfArray(AGE_RATINGS),
    duration: getRandomInteger(MIN_DURATION, MAX_DURATION),
    genres: generateList(GENRES),
    producer: getRandomElementOfArray(DIRECTORS),
    screenwriters: generateList(WRITERS),
    actors: generateList(ACTORS),
    productionYear,
    country: getRandomElementOfArray(COUNTRIES),
    watchingDate: '',
    isWatchlist: Boolean(getRandomInteger()),
    isWatched: Boolean(getRandomInteger()),
    isFavorite: Boolean(getRandomInteger()),
  };
};