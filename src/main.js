import {render, RenderPosition} from './utils/render.js';
import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
import UserRankView from './view/user-rank.js';
import FooterStatisticsView from './view/footer-statistics.js';
import ContentPresenter from './presenter/content.js';
import MoviesModel from './model/movies.js';

const FILM_COUNT = 20;

const films = new Array(FILM_COUNT).fill(null).map(generateFilm);
const filters = generateFilter(films);

const filmsModel = new MoviesModel();
filmsModel.setMovies(films);

const siteBodyElement = document.querySelector('body');
const siteMainElement = siteBodyElement.querySelector('.main');
const siteHeaderElement = siteBodyElement.querySelector('.header');
const siteFooterElement = siteBodyElement.querySelector('.footer');
const footerStatistics = siteFooterElement.querySelector('.footer__statistics');

// const contentPresenter = new ContentPresenter(siteMainElement);
const contentPresenter = new ContentPresenter(siteMainElement, filmsModel);

render(siteHeaderElement, new UserRankView(filters[2]), RenderPosition.BEFOREEND);
render(footerStatistics, new FooterStatisticsView(filters[0]), RenderPosition.BEFOREEND);
contentPresenter.init(films,filters);
