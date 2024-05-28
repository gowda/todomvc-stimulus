import { Controller } from '@hotwired/stimulus';
import { allTodos, clearCompleted } from '../todo';

export default class extends Controller {
  onCountChange() {
    const todos = allTodos();
    const completedTodos = todos.filter(({ completed }) => completed);

    if (completedTodos.length === 0) {
      this.element.classList.add('hidden');
    } else {
      this.element.classList.remove('hidden');
    }
  }

  connect() {
    this.onCountChange = this.onCountChange.bind(this);

    this.onCountChange();

    window.addEventListener('todomvc:created', this.onCountChange);
    window.addEventListener('todomvc:deleted', this.onCountChange);
    window.addEventListener('todomvc:updated', this.onCountChange);
    window.addEventListener('todomvc:cleared', this.onCountChange);
  }

  disconnect() {
    window.removeEventListener('todomvc:created', this.onCountChange);
    window.removeEventListener('todomvc:deleted', this.onCountChange);
    window.removeEventListener('todomvc:updated', this.onCountChange);
    window.removeEventListener('todomvc:cleared', this.onCountChange);
  }

  // eslint-disable-next-line class-methods-use-this
  clear() {
    clearCompleted();
  }
}
