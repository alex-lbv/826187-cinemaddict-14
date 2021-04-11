import {createSiteMenuTemplate} from './view/site-menu.js';
import {createMovieCardTemplate} from './view/movie-card.js';
import UserRankView from './view/user-rank.js';
import LoadMoreButtonView from './view/load-more-button.js';
import {createMovieDetailsTemplate} from './view/movie-details.js';
import ContentView from './view/content.js';
import {createFooterStatisticsTemplate} from './view/footer-statistics.js';
import FilmListView from './view/film-list.js';
import SortView from './view/sort.js';
import {renderElement, RenderPosition, renderTemplate} from './utils.js';
import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';

const FILM_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill(null).map(generateFilm);
const filters = generateFilter(films);

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

renderElement(siteHeaderElement, new UserRankView(filters[2]).getElement(), RenderPosition.BEFOREEND);

renderTemplate(siteMainElement, createSiteMenuTemplate(filters), 'afterbegin');

const sortComponent = new SortView();

renderElement(siteMainElement, sortComponent.getElement(), RenderPosition.BEFOREEND);

const contentComponent = new ContentView();

renderElement(siteMainElement, contentComponent.getElement(), RenderPosition.BEFOREEND);

const siteContentElement = siteMainElement.querySelector('.films');

const filmListComponent = new FilmListView;

renderElement(contentComponent.getElement(), filmListComponent.getElement(), RenderPosition.AFTERBEGIN);

const siteFilmListContainerElement = siteContentElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderTemplate(siteFilmListContainerElement, createMovieCardTemplate(films[i]), 'beforeend');
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderFilmCount = FILM_COUNT_PER_STEP;
  const loadMoreButtonComponent = new LoadMoreButtonView();

  renderElement(filmListComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderFilmCount, renderFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderTemplate(siteFilmListContainerElement, createMovieCardTemplate(film), 'beforeend'));

    renderFilmCount += FILM_COUNT_PER_STEP;

    if (renderFilmCount >= films.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
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
