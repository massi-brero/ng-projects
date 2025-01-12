import { Component, inject, input, output } from '@angular/core'
import { RouterLink } from '@angular/router'
import { Course } from '../models/course.model'
import { MatDialog } from '@angular/material/dialog'
import { openEditDialog } from '../edit-course-dialog/edit-course-dialog.component'

@Component({
  selector: 'courses-card-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.scss',
})
export class CoursesCardListComponent {
  courses = input.required<Course[]>()
  dialog = inject(MatDialog)

  constructor() {}

  async onEditCourse(course: Course) {
    const newCourse = await openEditDialog(this.dialog, {
      mode: 'update',
      title: 'Existierenden Kurs updaten',
      course: course,
    })

    console.log('Kurs geändert ', newCourse)
  }
}
