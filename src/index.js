import { Application } from '@hotwired/stimulus';
import EditorController from './controllers/editor_controller';
import TodoListController from './controllers/todo_list_controller';
import TodoListItemController from './controllers/todo_list_item_controller';
import TodoCountController from './controllers/todo_count_controller';
import FiltersController from './controllers/filters_controller';
import ClearCompletedController from './controllers/clear_completed_controller';
import FooterController from './controllers/footer_controller';

const application = Application.start();
application.register('editor', EditorController);
application.register('todo-list', TodoListController);
application.register('todo-list-item', TodoListItemController);
application.register('todo-count', TodoCountController);
application.register('filters', FiltersController);
application.register('clear-completed', ClearCompletedController);
application.register('footer', FooterController);
