import AbstractView from './abstract.js';

const createContentContainerTemplate = () => {
  return (
    `<section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>`);
};

export default class ContentContainer extends AbstractView {
  getTemplate() {
    return createContentContainerTemplate();
  }
}
