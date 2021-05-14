import Observer from '../utils/observer.js';

export default class Comments extends Observer {
  constructor() {
    super();

    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments(comments) {
    return this._comments.filter(({id}) => comments.includes(id));
  }
}
