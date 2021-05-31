import Observer from '../utils/observer.js';

export default class Movies extends Observer {
  constructor() {
    super();
    this._movies = [];
  }

  setMovies(updateType,movies) {
    this._movies = movies.slice();

    this._notify(updateType);
  }

  getMovies() {
    return this._movies;
  }

  updateMovie(updateType, update) {
    const index = this._movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(movie) {
    const adaptedMovie = Object.assign(
      {},
      movie,
      {
        title: movie.film_info.title,
        originalTitle: movie.film_info.alternative_title,
        rating: movie.film_info.total_rating,
        poster: movie.film_info.poster,
        ageRating: movie.film_info.age_rating,
        producer: movie.film_info.director,
        screenwriters: movie.film_info.writers,
        actors: movie.film_info.actors,
        productionYear: movie.film_info.release.date,
        country: movie.film_info.release.release_country,
        duration: movie.film_info.runtime,
        genres: movie.film_info.genre,
        description: movie.film_info.description,
        isWatchlist: movie.user_details.watchlist,
        isWatched: movie.user_details.already_watched,
        watchingDate: movie.user_details.watching_date,
        isFavorite: movie.user_details.favorite,
      },
    );

    delete adaptedMovie.film_info;
    delete adaptedMovie.user_details;

    return adaptedMovie;
  }

  static adaptToServer(movie) {
    const adaptedMovie = Object.assign(
      {},
      movie,
      {
        'film_info': {
          'title': movie.title,
          'alternative_title': movie.originalTitle,
          'poster': movie.poster,
          'description': movie.description,
          'total_rating': movie.rating,
          'release': {
            'date': movie.productionYear,
            'release_country': movie.country,
          },
          'runtime': movie.duration,
          'genre': movie.genres,
          'director': movie.producer,
          'writers': movie.screenwriters,
          'actors': movie.actors,
          'age_rating': movie.ageRating,
        },
        'user_details': {
          'watchlist': movie.isWatchlist,
          'already_watched': movie.isWatched,
          'watching_date': movie.watchingDate,
          'favorite': movie.isFavorite,
        },
      },
    );

    delete adaptedMovie.title;
    delete adaptedMovie.poster;
    delete adaptedMovie.originalTitle;
    delete adaptedMovie.description;
    delete adaptedMovie.rating;
    delete adaptedMovie.productionYear;
    delete adaptedMovie.country;
    delete adaptedMovie.duration;
    delete adaptedMovie.genres;
    delete adaptedMovie.producer;
    delete adaptedMovie.screenwriters;
    delete adaptedMovie.actors;
    delete adaptedMovie.ageRating;
    delete adaptedMovie.isWatchlist;
    delete adaptedMovie.isWatched;
    delete adaptedMovie.isFavorite;
    delete adaptedMovie.watchingDate;

    return adaptedMovie;
  }
}
