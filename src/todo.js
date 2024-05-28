const saveTodos = (todos) => window.localStorage.setItem('todomvc-stimulus', JSON.stringify(todos));
const fetchTodos = () => JSON.parse(window.localStorage.getItem('todomvc-stimulus') || '[]');

export const allTodos = () => fetchTodos();

export const createTodo = (text) => {
  const todo = { id: `${Date.now()}`, text, completed: false };

  saveTodos([todo, ...allTodos()]);
  window.dispatchEvent(new CustomEvent('todomvc:created', { detail: todo }));

  return todo;
};

export const updateTodo = (id, text) => {
  const todos = allTodos();
  saveTodos(todos.map(({ id: todoId, ...rest }) => (todoId === id ? { id, ...rest, text } : { id: todoId, ...rest })));

  const todo = allTodos().find(({ id: todoId }) => todoId === id);
  window.dispatchEvent(new CustomEvent('todomvc:updated', { detail: todo }));
};

export const toggleTodoCompleted = (id) => {
  const todos = allTodos();
  saveTodos(
    todos.map(({ id: todoId, completed, ...rest }) =>
      todoId === id ? { id, completed: !completed, ...rest } : { id: todoId, completed, ...rest }
    )
  );

  const todo = allTodos().find(({ id: todoId }) => todoId === id);
  window.dispatchEvent(new CustomEvent('todomvc:updated', { detail: todo }));
};

export const deleteTodo = (id) => {
  const todos = allTodos();
  saveTodos(todos.filter(({ id: todoId }) => todoId !== id));

  const todo = allTodos().find(({ id: todoId }) => todoId === id);
  window.dispatchEvent(new CustomEvent('todomvc:deleted', { detail: todo }));
};

export const clearCompleted = () => {
  saveTodos(allTodos().filter(({ completed }) => !completed));
  window.dispatchEvent(new CustomEvent('todomvc:cleared'));
};

export const populate = (container, { id, text, completed }) => {
  const listItem = container.querySelector('li');
  listItem.setAttribute('data-todo-list-item-id-value', id);

  const completedCheckbox = listItem.querySelector('input.toggle');
  completedCheckbox.checked = completed;

  const label = listItem.querySelector('label');
  label.innerHTML = text;

  const editor = listItem.querySelector('div.editor');
  editor.setAttribute('data-editor-id-value', id);

  const editInput = listItem.querySelector('input.edit');
  editInput.value = text;
};

export const repopulate = (listItem, { text, completed }) => {
  const completedCheckbox = listItem.querySelector('input.toggle');
  completedCheckbox.checked = completed;

  const label = listItem.querySelector('label');
  label.innerHTML = text;

  const editInput = listItem.querySelector('input.edit');
  editInput.value = text;
};
