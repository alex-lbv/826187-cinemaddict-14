import {renderElement, RenderPosition, renderTemplate} from './utils.js';
import {generateFilm} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
import SiteMenuView from './view/site-menu.js';
import MovieCardView from './view/movie-card.js';
import MovieDetailsView from './view/movie-details.js';
import UserRankView from './view/user-rank.js';
import LoadMoreButtonView from './view/load-more-button.js';
import ContentView from './view/content.js';
import FooterStatisticsView from './view/footer-statistics.js';
import FilmListView from './view/film-list.js';
import SortView from './view/sort.js';

const FILM_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill(null).map(generateFilm);
const filters = generateFilter(films);

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

renderElement(siteHeaderElement, new UserRankView(filters[2]).getElement(), RenderPosition.BEFOREEND);

renderElement(siteMainElement, new SiteMenuView(filters).getElement(), RenderPosition.AFTERBEGIN);

const sortComponent = new SortView();

renderElement(siteMainElement, sortComponent.getElement(), RenderPosition.BEFOREEND);

const contentComponent = new ContentView();

renderElement(siteMainElement, contentComponent.getElement(), RenderPosition.BEFOREEND);

const siteContentElement = siteMainElement.querySelector('.films');

const filmListComponent = new FilmListView;

renderElement(contentComponent.getElement(), filmListComponent.getElement(), RenderPosition.AFTERBEGIN);

const siteFilmListContainerElement = siteContentElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderElement(siteFilmListContainerElement, new MovieCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderFilmCount = FILM_COUNT_PER_STEP;
  const loadMoreButtonComponent = new LoadMoreButtonView();

  renderElement(filmListComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderFilmCount, renderFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderElement(siteFilmListContainerElement, new MovieCardView(film).getElement(), RenderPosition.BEFOREEND));

    renderFilmCount += FILM_COUNT_PER_STEP;

    if (renderFilmCount >= films.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}

const siteFooterElement = document.querySelector('.footer');

renderElement(siteMainElement, new MovieDetailsView(films[0]).getElement(), RenderPosition.BEFOREEND);

const footerStatistics = siteFooterElement.querySelector('.footer__statistics');
renderElement(footerStatistics, new FooterStatisticsView(filters[0]).getElement(), RenderPosition.BEFOREEND);

// Временно скрывает попап
const siteFilmDetails = document.querySelector('.film-details');
siteFilmDetails.classList.add('visually-hidden');
