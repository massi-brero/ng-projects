import {Todo} from '../models/todo.model';
import {signalStore, withMethods, withState} from '@ngrx/signals';
import {TodoService} from '../services/tdo.service';
import {inject} from '@angular/core';

export type TodosFilter = 'all' | 'pending' | 'completed';

export type TodosState = {
  todos: Todo[];
  loading: boolean;
  filter: TodosFilter;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  filter: "all",
}

export const TodosStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  // gibt Objekt zurück!
  withMethods((store, todosService = inject(TodoService)) => ({

  })
);
