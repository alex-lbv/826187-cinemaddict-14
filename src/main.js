import {createSiteMenuTemplate} from './view/site-menu.js';
import {createMovieCardTemplate} from './view/movie-card.js';
import {createUserRankTemplate} from './view/user-rank.js';
import {createLoadMoreTemplate} from './view/load-more-button.js';
import {createMovieDetailsTemplate} from './view/movie-details.js';
import {createContentTemplate} from './view/content.js';
import {createFooterStatisticsTemplate} from './view/footer-statistics.js';
import {createFilmListTemplate} from './view/film-list.js';
import {createSortTemplate} from './view/sort.js';
import {renderTemplate} from './utils.js';
import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';

const FILM_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill(null).map(generateFilm);
const filters = generateFilter(films);

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

renderTemplate(siteHeaderElement, createUserRankTemplate(filters[2]), 'beforeend');

renderTemplate(siteMainElement, createSiteMenuTemplate(filters), 'afterbegin');

renderTemplate(siteMainElement, createSortTemplate(), 'beforeend');

const siteSortElement = siteMainElement.querySelector('.sort');

renderTemplate(siteSortElement, createContentTemplate(), 'afterend');

const siteContentElement = siteMainElement.querySelector('.films');

renderTemplate(siteContentElement, createFilmListTemplate(), 'afterbegin');

const siteFilmListElement = siteContentElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderTemplate(siteFilmListElement, createMovieCardTemplate(films[i]), 'beforeend');
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderFilmCount = FILM_COUNT_PER_STEP;
  renderTemplate(siteFilmListElement, createLoadMoreTemplate(), 'afterend');

  const loadMoreButton = siteMainElement.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderFilmCount, renderFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderTemplate(siteFilmListElement, createMovieCardTemplate(film), 'beforeend'));

    renderFilmCount += FILM_COUNT_PER_STEP;

    if (renderFilmCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}

const siteFooterElement = document.querySelector('.footer');

renderTemplate(siteFooterElement, createMovieDetailsTemplate(films[0]), 'afterend');

const footerStatistics = siteFooterElement.querySelector('.footer__statistics');
renderTemplate(footerStatistics, createFooterStatisticsTemplate(filters[0]), 'beforeend');

// Временно скрывает попап
const siteFilmDetails = document.querySelector('.film-details');
siteFilmDetails.classList.add('visually-hidden');
