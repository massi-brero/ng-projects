import { Todo } from '../models/todo.model'
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals'
import { TodoService } from '../services/tdo.service'
import { computed, inject } from '@angular/core'

export type TodosFilter = 'all' | 'pending' | 'completed'

export type TodosState = {
  todos: Todo[]
  loading: boolean
  filter: TodosFilter
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  filter: 'all',
}

export const TodosStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, todosService = inject(TodoService)) => ({
    async loadAll() {
      patchState(store, { loading: true })
      const todos = await todosService.getTodos()
      patchState(store, { todos, loading: false })
    },
    async addTodo(title: string) {
      const todo = await todosService.addTodo({ title, completed: false })
      patchState(store, state => ({
        todos: [...state.todos, todo],
      }))
    },
    async deleteTodo(id: number) {
      await todosService.deleteTodo(id)
      patchState(store, state => ({
        todos: state.todos.filter(todo => todo.id !== id),
      }))
    },
    async updateTodo(id: number, completed: boolean) {
      await todosService.updateTodo(id, completed)
      patchState(store, state => ({
        todos: state.todos.map(todo =>
          todo.id === id ? { ...todo, completed } : todo
        ),
      }))
    },
    updateFilter(filter: TodosFilter) {
      patchState(store, { filter })
    },
  })),
  withComputed(state => ({
    filteredTodos: computed(() => {
      const todos = state.todos()
      switch (state.filter()) {
        case 'all':
          return todos
        case 'pending':
          return todos.filter(todo => !todo.completed)
        case 'completed':
          return todos.filter(todo => todo.completed)
      }
    }),
  }))
)
