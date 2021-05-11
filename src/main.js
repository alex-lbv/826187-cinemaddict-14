import {generateFilm} from './mock/film.js';
import ContentPresenter from './presenter/content.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import Filter from './presenter/filter.js';

const FILM_COUNT = 20;

const films = new Array(FILM_COUNT).fill(null).map(generateFilm);

const filmsModel = new MoviesModel();
filmsModel.setMovies(films);

const filterModel = new FilterModel();

const siteBodyElement = document.querySelector('body');
const siteMainElement = siteBodyElement.querySelector('.main');

const filterPresenter = new Filter(siteMainElement, filterModel, filmsModel);
const contentPresenter = new ContentPresenter(siteMainElement, filmsModel, filterModel);

filterPresenter.init();
contentPresenter.init();
