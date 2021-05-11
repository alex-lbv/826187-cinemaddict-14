import SiteMenuView from '../view/site-menu.js';
import {remove, render, RenderPosition, replace} from '../utils/render.js';
import {FilterType, UpdateType} from '../const.js';
import {filter} from '../utils/filter.js';
import UserRankView from '../view/user-rank.js';
import FooterStatisticsView from '../view/footer-statistics.js';

const siteHeaderElement = document.querySelector('.header');
const footerStatistics = document.querySelector('.footer__statistics');

export default class Filter {
  constructor(filterContainer, filterModel, movieModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._movieModel = movieModel;
    this._userRankContainer = siteHeaderElement;
    this._footerStatisticsContainer = footerStatistics;

    this._filterComponent = null;
    this._userRank = null;
    this._footerStatistics = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._movieModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;
    const prevUserRank = this._userRank;

    this._filterComponent = new SiteMenuView(filters, this._filterModel.getFilter());
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    this._userRank = new UserRankView(filters, this._filterModel.getFilter());
    this._userRank.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    this._footerStatistics = new FooterStatisticsView(filters, this._filterModel.getFilter());

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      render(this._userRankContainer, this._userRank, RenderPosition.BEFOREEND);
      render(this._footerStatisticsContainer, this._footerStatistics, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    replace(this._userRank, prevUserRank);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const movies = this._movieModel.getMovies();

    return [
      {
        type: FilterType.ALL,
        name: 'All',
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
