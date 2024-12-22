import { Component, inject } from '@angular/core'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { MatIcon } from '@angular/material/icon'
import {
  MatButtonToggle,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle'
import { MatListOption, MatSelectionList } from '@angular/material/list'
import { TodosStore } from '../store/todo.store'

@Component({
  selector: 'todos-list',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatIcon,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatSelectionList,
    MatListOption,
    MatLabel,
  ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
})
export class TodosListComponent {
  store = inject(TodosStore)
}
