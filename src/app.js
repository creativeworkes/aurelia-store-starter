import {connectTo} from 'aurelia-store';
import * as Actions from './state/actions';

@connectTo()
export class App {

  task;

  constructor(store) {
    this.actions = Actions;
  }

  addTodo() {
    this.actions.addTodo(this.task);
  }
}
