import {createSiteMenuTemplate} from './view/site-menu.js';
import {createMovieCardTemplate} from './view/movie-card.js';
import {createUserRankTemplate} from './view/user-rank.js';
import {createLoadMoreTemplate} from './view/load-more-button.js';
import {createMovieDetailsTemplate} from './view/movie-details.js';
import {createContentTemplate} from './view/content.js';
import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
import {createFooterStatisticsTemplate} from './view/footer-statistics.js';

const FILM_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;
const FILM_EXTRA_COUNT = 2;

const films = new Array(FILM_COUNT).fill(null).map(generateFilm);
const filters = generateFilter(films);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

render(siteHeaderElement, createUserRankTemplate(filters[2]), 'beforeend');

render(siteMainElement, createSiteMenuTemplate(filters), 'afterbegin');

const siteSortElement = siteMainElement.querySelector('.sort');

render(siteSortElement, createContentTemplate(), 'afterend');

const siteFilmListElement = siteMainElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  render(siteFilmListElement, createMovieCardTemplate(films[i]), 'beforeend');
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderFilmCount = FILM_COUNT_PER_STEP;
  render(siteFilmListElement, createLoadMoreTemplate(), 'afterend');

  const loadMoreButton = siteMainElement.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderFilmCount, renderFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render(siteFilmListElement, createMovieCardTemplate(film), 'beforeend'));

    renderFilmCount += FILM_COUNT_PER_STEP;

    if (renderFilmCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}

const siteFilmListExtraElement = siteMainElement.querySelectorAll('.films-list--extra > .films-list__container');

for (const filmListExtra of siteFilmListExtraElement) {
  for (let i = 0; i < FILM_EXTRA_COUNT; i++) {
    render(filmListExtra, createMovieCardTemplate(films[i]), 'beforeend');
  }
}

const siteFooterElement = document.querySelector('.footer');

render(siteFooterElement, createMovieDetailsTemplate(films[0]), 'afterend');

const footerStatistics = siteFooterElement.querySelector('.footer__statistics');
render(footerStatistics, createFooterStatisticsTemplate(filters[0]), 'beforeend');

// Временно скрывает попап
const siteFilmDetails = document.querySelector('.film-details');
siteFilmDetails.classList.add('visually-hidden');
