import { Injectable } from '@angular/core'
import { TODOS } from '../models/mock-data'

@Injectable({ providedIn: 'root' })
export class TodoService {
  async getTodos() {
    await sleep(1000)
    return TODOS
  }
}

function sleep(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay))
}
