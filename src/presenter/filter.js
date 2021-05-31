import SiteMenuView from '../view/site-menu.js';
import {remove, render, replace} from '../utils/render.js';
import {FilterType, MenuItem, UpdateType} from '../const.js';
import {filter} from '../utils/filter.js';

export default class Filter {
  constructor(filterContainer, filterModel, moviesModel, changeMenuSection) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._moviesModel = moviesModel;
    this._changeMenuSection = changeMenuSection;

    this._currentFilter = null;
    this._filterComponent = null;
    this._currentMenuSection = MenuItem.MOVIES;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleStatisticsClick = this._handleStatisticsClick.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    this._currentFilter = this._filterModel.getFilter();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new SiteMenuView(filters, this._currentFilter, this._currentMenuSection);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    this._filterComponent.setStatisticsClickHandler(this._handleStatisticsClick);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType && this._currentMenuSection === MenuItem.MOVIES) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
    this._changeMenuSection(MenuItem.MOVIES);
    this._currentMenuSection = MenuItem.MOVIES;
    this.init();
  }

  _handleStatisticsClick() {
    if (this._currentMenuSection === MenuItem.STATISTICS) {
      return;
    }
    this._changeMenuSection(MenuItem.STATISTICS);
    this._currentMenuSection = MenuItem.STATISTICS;
    this.init();
  }

  _getFilters() {
    const movies = this._moviesModel.getMovies();

    return [
      {
        type: FilterType.ALL,
        name: 'All movies',
        count: filter[FilterType.ALL](movies).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](movies).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](movies).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](movies).length,
      },
    ];
  }
}
