import UserRankView from './view/user-rank.js';
import {generateMovie} from './mock/movie.js';
import {render} from './utils/render.js';
import {defineUserRank} from './utils/movie.js';
import MovieList from './presenter/movie-list.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';

const MOVIE_COUNT = 15;

const movies = new Array(MOVIE_COUNT).fill().map(generateMovie);

const moviesModel = new MoviesModel();
moviesModel.setMovies(movies);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const movieListPresenter = new MovieList(siteMainElement, moviesModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel);

render(siteHeaderElement, new UserRankView(defineUserRank(movies)));
filterPresenter.init();
movieListPresenter.init();
