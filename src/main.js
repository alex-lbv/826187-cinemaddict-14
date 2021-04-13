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
import ListEmptyView from './view/list-empty.js';

const FILM_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill(null).map(generateFilm);
const filters = generateFilter(films);

const siteBodyElement = document.querySelector('body');
const siteMainElement = siteBodyElement.querySelector('.main');
const siteHeaderElement = siteBodyElement.querySelector('.header');
const siteFooterElement = siteBodyElement.querySelector('.footer');
const footerStatistics = siteFooterElement.querySelector('.footer__statistics');

const renderFilm = (filmListElement, film) => {
  const filmComponent = new MovieCardView(film);
  const filmDetail = new MovieDetailsView(film);

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closeFilmDetail();
    }
  };

  const viewFilmDetail = () => {
    siteBodyElement.appendChild(filmDetail.getElement());
    siteBodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', onEscKeyDown);
  };

  const closeFilmDetail = () => {
    siteBodyElement.removeChild(filmDetail.getElement());
    siteBodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', onEscKeyDown);
  };

  filmComponent.getElement().querySelector('.film-card__poster').addEventListener('click', viewFilmDetail);
  filmComponent.getElement().querySelector('.film-card__title').addEventListener('click', viewFilmDetail);
  filmComponent.getElement().querySelector('.film-card__comments').addEventListener('click', viewFilmDetail);
  filmDetail.getElement().querySelector('.film-details__close-btn').addEventListener('click', closeFilmDetail);

  render(filmListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderFilmList = (filmListContainer, films) => {
  const sortComponent = new SortView();
  const contentComponent = new ContentView();
  const filmListComponent = new FilmListView;
  const filmListContainerComponent = new FilmListContainerView();

  render(filmListContainer, new SiteMenuView(filters).getElement(), RenderPosition.AFTERBEGIN);
  render(filmListContainer, sortComponent.getElement(), RenderPosition.BEFOREEND);
  render(filmListContainer, contentComponent.getElement(), RenderPosition.BEFOREEND);

  if (films.length === 0) {
    sortComponent.getElement().remove();
    sortComponent.removeElement();
    render(contentComponent.getElement(), new ListEmptyView().getElement(), RenderPosition.AFTERBEGIN);
  } else {
    render(contentComponent.getElement(), filmListComponent.getElement(), RenderPosition.AFTERBEGIN);
  }

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
};

render(siteHeaderElement, new UserRankView(filters[2]).getElement(), RenderPosition.BEFOREEND);
render(footerStatistics, new FooterStatisticsView(filters[0]).getElement(), RenderPosition.BEFOREEND);
renderFilmList(siteMainElement, films);
