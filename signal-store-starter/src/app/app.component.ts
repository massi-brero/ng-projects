import { Component, inject, OnInit } from '@angular/core'
import { TodosStore } from './store/todo.store'
import { NgIf } from '@angular/common'
import { TodosListComponent } from './todos-list/todos-list.component'
import { MatProgressSpinner } from '@angular/material/progress-spinner'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodosListComponent, MatProgressSpinner, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  store = inject(TodosStore)

  ngOnInit(): void {
    this.loadTodos().then(() => {
      console.log('Todos loaded.')
    })
  }

  async loadTodos() {
    await this.store.loadAll()
  }
}
