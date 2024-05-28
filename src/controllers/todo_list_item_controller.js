import { Controller } from '@hotwired/stimulus';
import { deleteTodo, toggleTodoCompleted } from '../todo';

export default class extends Controller {
  static classes = ['view', 'editing'];

  static targets = ['completedCheckbox', 'text', 'deleteButton', 'editInput'];

  static values = { id: String };

  onUpdate(event) {
    const { id, text, completed } = event.detail;
    if (id === this.id) {
      this.text = text;
      this.completed = completed;
      this.closeEditor();
    }
  }

  connect() {
    if (this.hasIdValue) {
      this.onUpdate = this.onUpdate.bind(this);
      window.addEventListener('todomvc:updated', this.onUpdate);
    }
  }

  openEditor() {
    this.element.classList.add('editing');
  }

  closeEditor() {
    this.element.classList.remove('editing');
  }

  toggleCompleted() {
    toggleTodoCompleted(this.id);
  }

  remove() {
    deleteTodo(this.id);
  }

  disconnect() {
    window.removeEventListener('todomvc:updated', this.onUpdate);
  }

  get id() {
    return this.idValue;
  }

  get text() {
    return this.editInputTarget.value;
  }

  set text(value) {
    this.editInputTarget.value = value;
    this.textTarget.innerHTML = value;
  }

  get completed() {
    return this.completedCheckboxTarget.checked;
  }

  set completed(value) {
    this.completedCheckboxTarget.checked = value;
  }
}
