import { Controller } from '@hotwired/stimulus';
import { createTodo, updateTodo } from '../todo';

export default class extends Controller {
  static targets = ['text'];

  static values = { id: String };

  save() {
    if (this.text && this.text.trim().length > 0) {
      if (!this.hasIdValue || this.idValue === '') {
        createTodo(this.text);
        this.clear();
      } else {
        updateTodo(this.idValue, this.text);
      }
    }
  }

  clear() {
    this.text = '';
  }

  get text() {
    return this.textTarget.value;
  }

  set text(value) {
    this.textTarget.value = value;
  }
}
