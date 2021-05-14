import {generateFilm} from './mock/film.js';
import ContentPresenter from './presenter/content.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import Filter from './presenter/filter.js';
import {getRandomInteger} from './utils/common.js';
import {generateComments} from './mock/comment.js';
import CommentsModel from './model/comments.js';

const FILM_COUNT = 20;
const MAX_COMMENTS = 5;

const commentsList = [];

// const films = new Array(FILM_COUNT).fill(null).map(generateFilm);
const films = new Array(FILM_COUNT).fill(null).map(() => {
  const comments = new Array(getRandomInteger(0, MAX_COMMENTS)).fill(null).map(generateComments);

  const commentsIds = [];

  comments.forEach((comment) => {
    commentsIds.push(comment.id);
    commentsList.push(comment);
  });

  return generateFilm(commentsIds);
});

// console.log(commentsList);
// console.log(films)

const filmsModel = new MoviesModel();
filmsModel.setMovies(films);

const commentsModel = new CommentsModel();
commentsModel.setComments(commentsList);

const filterModel = new FilterModel();

const siteBodyElement = document.querySelector('body');
const siteMainElement = siteBodyElement.querySelector('.main');

const filterPresenter = new Filter(siteMainElement, filterModel, filmsModel);
const contentPresenter = new ContentPresenter(siteMainElement, filmsModel, filterModel, commentsModel);

filterPresenter.init();
contentPresenter.init();
