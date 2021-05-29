import UserRankView from '../view/user-rank.js';
import {getUserRank} from '../utils/statistics.js';
import {remove, render} from '../utils/render.js';

export default class User {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._userComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
  }

  init() {
    const movies = this._moviesModel.getMovies();
    const watchedMoviesCount = movies.filter((movie) => movie.isWatched).length;

    if (watchedMoviesCount !== 0) {
      this._userComponent = new UserRankView(getUserRank(movies));
      render(this._container, this._userComponent);
    }
  }

  _update() {
    remove(this._userComponent);
    this.init();
  }

  _handleModelEvent() {
    this._update();
  }
}
