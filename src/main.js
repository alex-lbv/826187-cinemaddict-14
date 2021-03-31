import {createSiteMenuTemplate} from './view/site-menu.js';
import {createMovieCardTemplate} from './view/movie-card.js';
import {createUserRankTemplate} from './view/user-rank.js';
import {createLoadMoreTemplate} from './view/load-more-button.js';
import {createMovieDetailsTemplate} from './view/movie-details.js';
import {createContentTemplate} from './view/content.js';

const FILM_COUNT = 5;
const FILM_EXTRA_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

render(siteHeaderElement, createUserRankTemplate(), 'beforeend');

render(siteMainElement, createSiteMenuTemplate(), 'afterbegin');

const siteSortElement = siteMainElement.querySelector('.sort');

render(siteSortElement, createContentTemplate(), 'afterend');

const siteFilmListElement = siteMainElement.querySelector('.films-list__container');

for (let i = 0; i < FILM_COUNT; i++) {
  render(siteFilmListElement, createMovieCardTemplate(), 'beforeend');
}

render(siteFilmListElement, createLoadMoreTemplate(), 'afterend');

const siteFilmListExtraElement = siteMainElement.querySelectorAll('.films-list--extra > .films-list__container');

for (const filmListExtra of siteFilmListExtraElement) {
  for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
    render(filmListExtra, createMovieCardTemplate(), 'beforeend');
  }
}

const siteFooterElement = document.querySelector('.footer');

render(siteFooterElement, createMovieDetailsTemplate(), 'afterend');

