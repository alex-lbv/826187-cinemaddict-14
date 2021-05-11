// const filmToFilterMap = {
//   all: (films) => films.filter((film) => film).length,
//   watchlist: (films) => films.filter((film) => film.userDetails.isOnWatchlist).length,
//   history: (films) => films.filter((film) => film.userDetails.viewed).length,
//   favorites: (films) => films.filter((film) => film.userDetails.isFavorite).length,
// };
//
// let number = 0;
//
// export const generateFilter = (films) => {
//
//   return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
//     return {
//       number: number++,
//       name: filterName,
//       count: countFilms(films),
//     };
//   });
// };
