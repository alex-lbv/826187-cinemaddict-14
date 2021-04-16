import SortView from '../view/sort.js';
import FilmListView from '../view/film-list.js';
import ListEmptyView from '../view/list-empty.js';
import ContentView from '../view/content.js';

export default class Content {
  constructor(contentContainer) {
    this._contentContainer = contentContainer;

    this._contentComponent = new ContentView();
    this._sortComponent = new SortView();
    this._filmListComponent = new FilmListView();
    this._listEmpty = new ListEmptyView();
  }

  init(films) {
    this._films = films.slice();
    // Метод для инициализации модуля
    // малая часть текущей функции renderFilmList в main.js
  }

  _renderSort() {
    // Метод для рендеринга сортировки
  }

  _renderFilm() {
    // Метод, куда уйдет логика создания и рендеринга копмонентов фильма
    // текущая функция renderFilm в main.js
  }

  _renderFilms() {
    // Метод для рендеринга N-фильмов за раз
  }

  _renderListEmpty() {
    // Метод для рендеринга заглушки
  }

  _renderLoadMoreButton() {
    // Метод, куда уйдет логика по отрисовке компонентов фильма,
    // текущая функция renderFilmList в main.js
  }

  _renderContent() {
    // Метод для инициализации модуля,
    // большая часть текущей функции renderFilmList в main.js
  }
}
