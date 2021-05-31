import MovieListView from '../view/movie-list.js';
import ContentView from '../view/content.js';
import ContentContainerView from '../view/content-container.js';
import ListEmptyView from '../view/list-empty.js';
import SortView from '../view/sort.js';
import LoadMoreButtonView from '../view/load-more-button.js';
import {remove, render} from '../utils/render.js';
import Movie from './movie.js';
import {SortType, UpdateType} from '../const.js';
import {sortDate, sortRating} from '../utils/movie.js';
import {filter} from '../utils/filter.js';
import LoadingView from '../view/loading.js';

const MOVIE_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(movieListContainer, moviesModel, filterModel, api) {
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._movieListContainer = movieListContainer;
    this._renderedMovieCount = MOVIE_COUNT_PER_STEP;
    this._moviePresenter = {};
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;
    this._api = api;

    this._sortComponent = null;
    this._loadMoreButtonComponent = null;

    this._contentComponent = new ContentView();
    this._contentContainerComponent = new ContentContainerView();
    this._movieListComponent = new MovieListView();
    this._listEmptyComponent = new ListEmptyView();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    render(this._movieListContainer, this._contentComponent);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderMovieList();
  }

  destroy() {
    this._clearMovieList({resetRenderedMovieCount: true, resetSortType: true});

    remove(this._movieListComponent);
    remove(this._contentComponent);

    this._moviesModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _getMovies() {
    const filterType = this._filterModel.getFilter();
    const movies = this._moviesModel.getMovies();
    const filteredMovies = filter[filterType](movies);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredMovies.sort(sortDate);
      case SortType.RATING:
        return filteredMovies.sort(sortRating);
    }

    return filteredMovies;
  }

  _handleModeChange() {
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(updateType, update) {
    this._api.updateMovie(update).then((response) => {
      this._moviesModel.updateMovie(updateType, response);
    });
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._moviePresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearMovieList();
        this._renderMovieList();
        break;
      case UpdateType.MAJOR:
        this._clearMovieList({resetRenderedMovieCount: true, resetSortType: true});
        this._renderMovieList();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderMovieList();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearMovieList({resetRenderedMovieCount: true});
    this._renderMovieList();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._movieListContainer, this._sortComponent);
  }

  _renderMovie(movie) {
    const moviePresenter = new Movie(
      this._movieListComponent,
      this._handleViewAction,
      this._handleModeChange,
      this._api);
    moviePresenter.init(movie);
    this._moviePresenter[movie.id] = moviePresenter;
  }

  _renderMovies(movies) {
    movies.forEach((movie) => this._renderMovie(movie));
  }

  _renderListEmpty() {
    render(this._movieListContainer, this._contentComponent);
    render(this._contentComponent, this._listEmptyComponent);
  }

  _handleLoadMoreButtonClick() {
    const movieCount = this._getMovies().length;
    const newRenderedMovieCount = Math.min(movieCount, this._renderedMovieCount + MOVIE_COUNT_PER_STEP);
    const movies = this._getMovies().slice(this._renderedMovieCount, newRenderedMovieCount);

    this._renderMovies(movies);
    this._renderedMovieCount = newRenderedMovieCount;

    if (this._renderedMovieCount >= movieCount) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    if (this._loadMoreButtonComponent !== null) {
      this._loadMoreButtonComponent = null;
    }

    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);

    render(this._contentContainerComponent, this._loadMoreButtonComponent);
  }

  _renderLoading() {
    render(this._contentContainerComponent, this._loadingComponent);
  }

  _clearMovieList({resetRenderedMovieCount = false, resetSortType = false} = {}) {
    const movieCount = this._getMovies().length;

    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());

    this._moviePresenter = {};

    remove(this._sortComponent);
    remove(this._listEmptyComponent);
    remove(this._loadingComponent);
    remove(this._loadMoreButtonComponent);

    if (resetRenderedMovieCount) {
      this._renderedMovieCount = MOVIE_COUNT_PER_STEP;
    } else {
      this._renderedMovieCount = Math.min(movieCount, this._renderedMovieCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderMovieList() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const movies = this._getMovies();
    const moviesCount = movies.length;

    if (moviesCount === 0) {
      this._renderListEmpty();
      return;
    }

    this._renderSort();

    render(this._movieListContainer, this._contentComponent);
    render(this._contentComponent, this._contentContainerComponent);
    render(this._contentContainerComponent, this._movieListComponent);
    this._renderMovies(movies.slice(0, Math.min(moviesCount, this._renderedMovieCount)));

    if (moviesCount > this._renderedMovieCount) {
      this._renderLoadMoreButton();
    }
  }
}
