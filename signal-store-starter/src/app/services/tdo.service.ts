import { Injectable } from '@angular/core'
import { TODOS } from '../models/mock-data'
import { Todo } from '../models/todo.model'

@Injectable({ providedIn: 'root' })
export class TodoService {
  async getTodos() {
    await sleep(1000)
    return TODOS
  }

  async addTodo(todo: Partial<Todo>): Promise<Todo> {
    await sleep(1000)
    return {
      id: Math.random().toString(36).substring(2, 9),
      ...todo,
    } as Todo
  }

  async deleteTodo(id: number) {
    await sleep(500)
  }

  async updateTodo(id: number, completed: boolean) {
    await sleep(500)
  }
}

function sleep(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay))
}
