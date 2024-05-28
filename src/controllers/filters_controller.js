import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['all', 'active', 'completed'];

  onNavigate() {
    const { hash } = window.location;
    if (hash === '#/completed') {
      this.setSelected(this.completedTarget);
      this.resetSelected(this.activeTarget);
      this.resetSelected(this.allTarget);
    } else if (hash === '#/active') {
      this.setSelected(this.activeTarget);
      this.resetSelected(this.completedTarget);
      this.resetSelected(this.allTarget);
    } else {
      this.setSelected(this.allTarget);
      this.resetSelected(this.completedTarget);
      this.resetSelected(this.activeTarget);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  setSelected(target) {
    target.classList.add('selected');
  }

  // eslint-disable-next-line class-methods-use-this
  resetSelected(target) {
    target.classList.remove('selected');
  }

  connect() {
    const { hash } = window.location;
    if (hash === '#/completed') {
      this.setSelected(this.completedTarget);
      this.resetSelected(this.activeTarget);
      this.resetSelected(this.allTarget);
    } else if (hash === '#/active') {
      this.setSelected(this.activeTarget);
      this.resetSelected(this.completedTarget);
      this.resetSelected(this.allTarget);
    } else {
      this.setSelected(this.allTarget);
      this.resetSelected(this.completedTarget);
      this.resetSelected(this.activeTarget);
    }
    this.onNavigate = this.onNavigate.bind(this);
    window.addEventListener('hashchange', this.onNavigate);
  }

  disconnect() {
    window.removeEventListener('hashchange', this.onNavigate);
  }
}
