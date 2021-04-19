import SortView from '../view/sort.js';
import FilmListView from '../view/film-list.js';
import ListEmptyView from '../view/list-empty.js';
import ContentView from '../view/content.js';
import FilmListContainerView from '../view/film-list-container.js';
import {remove, render, RenderPosition} from '../utils/render.js';
import SiteMenuView from '../view/site-menu.js';
import LoadMoreButtonView from '../view/load-more-button.js';
import MovieCardView from '../view/movie-card.js';
import MovieDetailsView from '../view/movie-details.js';

const FILM_COUNT_PER_STEP = 5;

const siteBodyElement = document.querySelector('body');

export default class Content {
  constructor(contentContainer) {
    this._contentContainer = contentContainer;

    this._contentComponent = new ContentView();
    this._sortComponent = new SortView();
    this._filmListContainerComponent = new FilmListContainerView();
    this._filmListComponent = new FilmListView();
    this._listEmpty = new ListEmptyView();
  }

  init(films, filters) {
    this._films = films.slice();
    render(this._contentContainer, new SiteMenuView(filters), RenderPosition.AFTERBEGIN);
    this._renderSort();
    render(this._contentContainer, this._contentComponent, RenderPosition.BEFOREEND);
    this._renderContent();
  }

  _renderSort() {
    render(this._contentContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderFilm(film) {
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

    filmComponent.setViewClickHandler(viewFilmDetail);
    filmDetail.setCloseClickHandler(closeFilmDetail);

    render(this._filmListContainerComponent, filmComponent, RenderPosition.BEFOREEND);
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilm(film));
  }

  _renderList() {
    render(this._contentComponent, this._filmListComponent, RenderPosition.AFTERBEGIN);
  }

  _renderListEmpty() {
    remove(this._sortComponent);
    render(this._contentComponent, this._listEmpty, RenderPosition.AFTERBEGIN);
  }

  _renderListContainer() {
    render(this._filmListComponent, this._filmListContainerComponent, RenderPosition.BEFOREEND);
  }

  _renderLoadMoreButton() {
    let renderFilmCount = FILM_COUNT_PER_STEP;
    const loadMoreButtonComponent = new LoadMoreButtonView();

    render(this._filmListComponent, loadMoreButtonComponent, RenderPosition.BEFOREEND);

    loadMoreButtonComponent.setClickHandler(() => {
      this._renderFilms(renderFilmCount, renderFilmCount + FILM_COUNT_PER_STEP);

      renderFilmCount += FILM_COUNT_PER_STEP;

      if (renderFilmCount >= this._films.length) {
        remove(loadMoreButtonComponent);
      }
    });
  }

  _renderFilmList() {
    this._renderFilms(0, Math.min(this._films.length, FILM_COUNT_PER_STEP));

    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _renderContent() {
    if (this._films.length === 0) {
      this._renderListEmpty();
    } else {
      this._renderList();
    }

    this._renderListContainer();
    this._renderFilmList();
  }
}
