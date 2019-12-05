import store from './store';

import * as Mutations from './mutations';

function addTodo(text = '') {
  store.dispatch(Mutations.addTodo, text);
}

export {
  addTodo
};
