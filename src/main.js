import {remove, render} from './utils/render.js';
import MovieListPresenter from './presenter/movie-list.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';
import StatisticsView from './view/statistics.js';
import UserPresenter from './presenter/user.js';
import {MenuItem, UpdateType} from './const.js';
import Api from './api.js';
import FooterStatisticsView from './view/footer-statistics.js';

const AUTHORIZATION = 'Basic alexLbV7';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';

const moviesModel = new MoviesModel();

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const api = new Api(END_POINT, AUTHORIZATION);

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

const movieListPresenter = new MovieListPresenter(siteMainElement, moviesModel, filterModel, api);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel, changeMenuSection);
const userPresenter = new UserPresenter(siteHeaderElement, moviesModel);

userPresenter.init();
filterPresenter.init();
movieListPresenter.init();

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(UpdateType.INIT, movies);
    render(siteFooterElement, new FooterStatisticsView(movies.length));
  })
  .catch(() => {
    moviesModel.setMovies(UpdateType.INIT, []);
    render(siteFooterElement, new FooterStatisticsView(0));
  });
