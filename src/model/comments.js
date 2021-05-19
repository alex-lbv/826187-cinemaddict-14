import Observer from '../utils/observer.js';

export default class Comments extends Observer {
  constructor(removeCommentFromFilm) {
    super();

    this._comments = [];
    this._removeCommentFromFilm = removeCommentFromFilm;
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments(comments) {
    return this._comments.filter(({id}) => comments.includes(id));
  }

  deleteComment(updateType, update) {
    const index = this._comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1),
    ];

    this._removeCommentFromFilm(updateType, update);
    // this._notify(updateType);
  }
}
