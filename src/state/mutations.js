import { guid } from './helper';
import store from './store';

/**
 * Mutations are merely dispatched actions, the logic that
 * makes changes to your state management store is handled
 * from within here.
 *
 */
function addTodo(state, text) {
  const newTodo = {
    id: guid(),
    name: text
  };

  const newState = Object.assign({}, state, { todos: [...state.todos, newTodo] });
  return newState;
}

store.registerAction('addTodo', addTodo);

export {
  addTodo
};
