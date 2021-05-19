import Observer from '../utils/observer.js';

export default class Movies extends Observer {
  constructor() {
    super();
    this._movies = [];
  }

  setMovies(movies) {
    this._movies = movies.slice();
  }

  getMovies() {
    return this._movies;
  }

  updateMovie(updateType, update) {
    const index = this._movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addMovie(updateType, update) {
    this._movies = [
      update,
      ...this._movies,
    ];

    this._notify(updateType, update);
  }

  // deleteMovie(updateType, update) {
  //   const index = this._movies.findIndex((movie) => movie.id === update.id);
  //
  //   if (index === -1) {
  //     throw new Error('Can\'t delete unexisting movie');
  //   }
  //
  //   this._movies = [
  //     ...this._movies.slice(0, index),
  //     ...this._movies.slice(index + 1),
  //   ];
  //
  //   this._notify(updateType);
  // }
  removeComment(updateType, update) {
    const updatedFilm = this._movies.find((movie) => movie.id === update.filmId);
    const indexOfRemovedComment = updatedFilm.comments.findIndex((id) => id === update.id);

    updatedFilm.comments.splice(indexOfRemovedComment, 1);

    this._notify(updateType, updatedFilm);
  }
}
