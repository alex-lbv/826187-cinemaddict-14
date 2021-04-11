import {render, RenderPosition} from './utils.js';
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
import FilmListContainerView from './view/film-list-container.js';

const FILM_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill(null).map(generateFilm);
const filters = generateFilter(films);

const siteBodyElement = document.querySelector('body');
const siteMainElement = siteBodyElement.querySelector('.main');
const siteHeaderElement = siteBodyElement.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const renderFilm = (filmListElement, film) => {
  const filmComponent = new MovieCardView(film);
  const filmDetail = new MovieDetailsView(film);

  const viewFilmDetail = () => {
    siteBodyElement.appendChild(filmDetail.getElement());
    siteBodyElement.classList.add('hide-overflow');
  };

  const closeFilmDetail = () => {
    siteBodyElement.removeChild(filmDetail.getElement());
    siteBodyElement.classList.remove('hide-overflow');
  };

  filmComponent.getElement().querySelector('.film-card__poster').addEventListener('click', () => {
    viewFilmDetail();
  });

  filmComponent.getElement().querySelector('.film-card__title').addEventListener('click', () => {
    viewFilmDetail();
  });

  filmComponent.getElement().querySelector('.film-card__comments').addEventListener('click', () => {
    viewFilmDetail();
  });

  filmDetail.getElement().querySelector('.film-details__close-btn').addEventListener('click', () => {
    closeFilmDetail();
  });

  render(filmListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

render(siteHeaderElement, new UserRankView(filters[2]).getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new SiteMenuView(filters).getElement(), RenderPosition.AFTERBEGIN);

const sortComponent = new SortView();

render(siteMainElement, sortComponent.getElement(), RenderPosition.BEFOREEND);

const contentComponent = new ContentView();

render(siteMainElement, contentComponent.getElement(), RenderPosition.BEFOREEND);

const filmListComponent = new FilmListView;

render(contentComponent.getElement(), filmListComponent.getElement(), RenderPosition.AFTERBEGIN);

const filmListContainerComponent = new FilmListContainerView();

render(filmListComponent.getElement(), filmListContainerComponent.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderFilm(filmListContainerComponent.getElement(), films[i]);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderFilmCount = FILM_COUNT_PER_STEP;
  const loadMoreButtonComponent = new LoadMoreButtonView();

  render(filmListComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderFilmCount, renderFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmListContainerComponent.getElement(), film));

    renderFilmCount += FILM_COUNT_PER_STEP;

    if (renderFilmCount >= films.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}

const footerStatistics = siteFooterElement.querySelector('.footer__statistics');
render(footerStatistics, new FooterStatisticsView(filters[0]).getElement(), RenderPosition.BEFOREEND);
