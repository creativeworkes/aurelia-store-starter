import { inject } from 'aurelia-framework';
import { Store } from 'aurelia-store';
import * as Actions from './state/actions';

@inject(Store)
export class App {

  task;

  constructor(store) {
    this.store = store;
    this.actions = Actions;
  }

  addTodo() {
    this.actions.addTodo(this.task);
  }

  bind() {
    this.subscription = this.store.state.subscribe(
      (state) => this.state = state
    );
  }

  unbind() {
    this.subscription.unsubscribe();
  }
}
