import {render, RenderPosition} from './utils/render.js';
import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
import UserRankView from './view/user-rank.js';
import FooterStatisticsView from './view/footer-statistics.js';
import ContentPresenter from './presenter/content.js';
import MoviesModel from './model/movies.js';
import SiteMenuView from './view/site-menu.js';
import FilterModel from './model/filter.js';
import Filter from './presenter/filter.js';

const FILM_COUNT = 20;

const films = new Array(FILM_COUNT).fill(null).map(generateFilm);
// const filters = generateFilter(films);
// const filters = [
//   {
//     type: 'all',
//     name: 'All',
//     count: 0,
//   },
//   {
//     type: 'watchlist',
//     name: 'Watchlist',
//     count: 2,
//   },
//   {
//     type: 'history',
//     name: 'History',
//     count: 33,
//   },
//   {
//     type: 'favorites',
//     name: 'Favorites',
//     count: 1,
//   },
// ];

const filmsModel = new MoviesModel();
filmsModel.setMovies(films);

const filterModel = new FilterModel();

const siteBodyElement = document.querySelector('body');
const siteMainElement = siteBodyElement.querySelector('.main');
// const siteHeaderElement = siteBodyElement.querySelector('.header');
// const siteFooterElement = siteBodyElement.querySelector('.footer');
// const footerStatistics = siteFooterElement.querySelector('.footer__statistics');

// render(siteMainElement, new SiteMenuView(filters,'all'), RenderPosition.AFTERBEGIN);
const filterPresenter = new Filter(siteMainElement, filterModel, filmsModel);
const contentPresenter = new ContentPresenter(siteMainElement, filmsModel);

//TODO: не работает пока делаю фильтры
// render(siteHeaderElement, new UserRankView(filters), RenderPosition.BEFOREEND);
// render(footerStatistics, new FooterStatisticsView(filters), RenderPosition.BEFOREEND);
filterPresenter.init();
contentPresenter.init();
