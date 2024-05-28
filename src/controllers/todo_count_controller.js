import { Controller } from '@hotwired/stimulus';
import { allTodos } from '../todo';

export default class extends Controller {
  static targets = ['count'];

  onUpdate() {
    const todos = allTodos();
    this.count = todos.filter(({ completed }) => !completed).length;
  }

  connect() {
    const todos = allTodos();
    this.count = todos.filter(({ completed }) => !completed).length;

    this.onUpdate = this.onUpdate.bind(this);
    window.addEventListener('todomvc:updated', this.onUpdate);
  }

  disconnect() {
    window.removeEventListener('todomvc:updated', this.onUpdate);
  }

  get count() {
    return this.countTarget.innerHTML;
  }

  set count(value) {
    this.countTarget.innerHTML = value;
  }
}
