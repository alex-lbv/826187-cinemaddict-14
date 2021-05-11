import SortView from '../view/sort.js';
import FilmListView from '../view/film-list.js';
import ListEmptyView from '../view/list-empty.js';
import ContentView from '../view/content.js';
import FilmListContainerView from '../view/film-list-container.js';
import {remove, render, RenderPosition} from '../utils/render.js';
import LoadMoreButtonView from '../view/load-more-button.js';
import FilmPresenter from './film.js';
import {SortType, UpdateType, UserAction} from '../const.js';
import {sortFilmDateUp, sortFilmRatingDown} from '../utils/film.js';
import {filter} from '../utils/filter.js';

const FILM_COUNT_PER_STEP = 5;

export default class Content {
  constructor(contentContainer, filmsModel, filterModel) {
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._contentContainer = contentContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._filmPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._sortComponent = null;
    this._loadMoreButtonComponent = null;

    this._contentComponent = new ContentView();
    this._filmListContainerComponent = new FilmListContainerView();
    this._filmListComponent = new FilmListView();
    this._listEmpty = new ListEmptyView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderContent();
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getMovies();
    const filteredFilms = filter[filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredFilms.sort(sortFilmDateUp);
      case SortType.RATING:
        return filteredFilms.sort(sortFilmRatingDown);
    }

    return filteredFilms;
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateMovie(updateType, update);
        break;
      case UserAction.ADD_FILM:
        this._filmsModel.addMovie(updateType, update);
        break;
      case UserAction.DELETE_FILM:
        this._filmsModel.deleteMovie(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearContent();
        this._renderContent();
        break;
      case UpdateType.MAJOR:
        this._clearContent({resetRenderedFilmCount: true, resetSortType: true});
        this._renderContent();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearContent({resetRenderedFilmCount: true});
    this._renderContent();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._contentContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._filmListContainerComponent, this._handleViewAction, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film));
  }

  _renderFilmList() {
    render(this._contentComponent, this._filmListComponent, RenderPosition.AFTERBEGIN);
  }

  _renderListEmpty() {
    remove(this._sortComponent);
    render(this._contentComponent, this._listEmpty, RenderPosition.AFTERBEGIN);
  }

  _renderListContainer() {
    render(this._filmListComponent, this._filmListContainerComponent, RenderPosition.BEFOREEND);
  }

  _handleLoadMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmsCount = Math.min(filmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmsCount);

    this._renderFilms(films);
    this._renderedFilmCount = newRenderedFilmsCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    if (this._loadMoreButtonComponent !== null) {
      this._loadMoreButtonComponent = null;
    }

    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
    render(this._filmListComponent, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this._loadMoreButtonComponent);
  }

  _renderFilmsCards() {
    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, FILM_COUNT_PER_STEP));

    this._renderFilms(films);

    if (filmCount > FILM_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _clearContent({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    remove(this._sortComponent);
    remove(this._listEmpty);
    remove(this._loadMoreButtonComponent);

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderContent() {
    const films = this._getFilms();
    const filmCount = films.length;

    this._renderSort();
    render(this._contentContainer, this._contentComponent, RenderPosition.BEFOREEND);

    if (filmCount === 0) {
      this._renderListEmpty();
      return;
    }

    this._renderFilmList();
    this._renderListContainer();

    this._renderFilms(films.slice(0, Math.min(filmCount, this._renderedFilmCount)));

    if (filmCount > this._renderedFilmCount) {
      this._renderLoadMoreButton();
    }
  }
}
