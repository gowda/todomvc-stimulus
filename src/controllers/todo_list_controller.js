import { Controller } from '@hotwired/stimulus';
import { allTodos, populate } from '../todo';

export default class extends Controller {
  static targets = ['placeholder', 'itemTemplate'];

  onCreate(event) {
    if (this.hasItemTemplateTarget) {
      const template = this.itemTemplateTarget.content.cloneNode(true);
      populate(template, event.detail);
      this.placeholderTarget.prepend(template);
    }
  }

  onNavigate() {
    this.loadList();
  }

  connect() {
    this.onNavigate = this.onNavigate.bind(this);
    this.loadList = this.loadList.bind(this);
    this.onCreate = this.onCreate.bind(this);

    this.loadList();
    window.addEventListener('todomvc:created', this.onCreate);
    window.addEventListener('todomvc:updated', this.loadList);
    window.addEventListener('todomvc:deleted', this.loadList);
    window.addEventListener('todomvc:cleared', this.loadList);
    window.addEventListener('hashchange', this.onNavigate);
  }

  loadList() {
    while (this.placeholderTarget.lastElementChild) {
      this.placeholderTarget.removeChild(this.placeholderTarget.lastElementChild);
    }

    const todos = allTodos();
    const { hash } = window.location;

    todos.forEach((todo) => {
      if (hash === '#/completed' && todo.completed) {
        const template = this.itemTemplateTarget.content.cloneNode(true);
        populate(template, todo);
        this.placeholderTarget.prepend(template);
      } else if (hash === '#/active' && !todo.completed) {
        const template = this.itemTemplateTarget.content.cloneNode(true);
        populate(template, todo);
        this.placeholderTarget.prepend(template);
      } else if (hash === '#/' || hash === undefined) {
        const template = this.itemTemplateTarget.content.cloneNode(true);
        populate(template, todo);
        this.placeholderTarget.prepend(template);
      }
    });
  }

  disconnect() {
    window.removeEventListener('hashchange', this.onNavigate);
    window.removeEventListener('todomvc:cleared', this.loadList);
    window.removeEventListener('todomvc:deleted', this.loadList);
    window.removeEventListener('todomvc:updated', this.loadList);
    window.removeEventListener('todomvc:created', this.createEventHandler);
  }
}
