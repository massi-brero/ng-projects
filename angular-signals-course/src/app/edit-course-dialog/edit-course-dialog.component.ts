import { Component, inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog'
import { Course } from '../models/course.model'
import { EditCourseDialogData } from './edit-course-dialog.data.model'
import { CoursesService } from '../services/courses.service'
import { LoadingIndicatorComponent } from '../loading/loading.component'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { firstValueFrom } from 'rxjs'
import { MessageService } from '../messages/message.service'

@Component({
  selector: 'edit-course-dialog',
  standalone: true,
  imports: [LoadingIndicatorComponent, ReactiveFormsModule],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss',
})
export class EditCourseDialogComponent {
  protected readonly onclose = onclose
  dialogRef = inject(MatDialogRef)
  coursesService = inject(CoursesService)
  messageService = inject(MessageService)

  data: EditCourseDialogData = inject(MAT_DIALOG_DATA)
  fb = inject(FormBuilder)
  form = this.fb.group({
    title: [''],
    longDescription: [''],
    category: [''],
    iconUrl: [''],
  })

  constructor() {
    this.form.patchValue({
      title: this.data.course?.title,
      longDescription: this.data.course?.longDescription,
      category: this.data.course?.category,
      iconUrl: this.data.course?.iconUrl,
    })
  }

  onClose() {
    this.dialogRef.close()
  }

  async onSave() {
    const courseData = this.form.value as Partial<Course>

    if (this.data?.mode === 'update') {
      await this.saveCourse(this.data.course!.id, courseData)
    } else if (this.data?.mode === 'create') {
      await this.createCourse(courseData)
    }
  }

  async createCourse(course: Partial<Course>) {
    try {
      const newCourse = await this.coursesService.createCourse(course)
      this.dialogRef.close(newCourse)
    } catch (e) {
      console.error(e)
      this.messageService.showMessage('Fehler bein Speichern des neuen Kurses', 'error')
    }
  }

  async saveCourse(courseId: string, course: Partial<Course>) {
    try {
      const updatedCourse = await this.coursesService.saveCourse(courseId, course)
      this.dialogRef.close(updatedCourse)
    } catch (e) {
      console.log(e)
      this.messageService.showMessage(`Fehler beim Speichern.`, 'error')
    }
  }
}

export async function openEditDialog(dialog: MatDialog, data: EditCourseDialogData) {
  const config = new MatDialogConfig()
  config.disableClose = true
  config.autoFocus = true
  config.width = '400px'
  config.data = data

  const closed$ = dialog.open(EditCourseDialogComponent, config).afterClosed()

  return firstValueFrom(closed$)
}
