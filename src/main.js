import {generateMovie} from './mock/movie.js';
import {remove, render} from './utils/render.js';
import MovieListPresenter from './presenter/movie-list.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';
import StatisticsView from './view/statistics.js';
import UserPresenter from './presenter/user.js';
import {MenuItem} from './const.js';

const MOVIE_COUNT = 15;

const movies = new Array(MOVIE_COUNT).fill().map(generateMovie);

const moviesModel = new MoviesModel();
moviesModel.setMovies(movies);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

let statisticsComponent = null;

const changeMenuSection = (menuItem) => {
  switch (menuItem) {
    case MenuItem.MOVIES:
      remove(statisticsComponent);
      movieListPresenter.destroy();
      movieListPresenter.init();
      break;
    case MenuItem.STATISTICS:
      movieListPresenter.destroy();
      statisticsComponent = new StatisticsView(moviesModel.getMovies());
      render(siteMainElement, statisticsComponent);
      break;
  }
};

const movieListPresenter = new MovieListPresenter(siteMainElement, moviesModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel, changeMenuSection);
const userPresenter = new UserPresenter(siteHeaderElement, moviesModel);

userPresenter.init();
filterPresenter.init();
movieListPresenter.init();
