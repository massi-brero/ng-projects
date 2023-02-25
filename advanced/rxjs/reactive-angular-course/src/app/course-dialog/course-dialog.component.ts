import {AfterViewInit, Component, Inject} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import * as moment from 'moment'
import {Course} from '../model/course'
import {CoursesStore} from '../services/courses.store'

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
  providers: [],
})
export class CourseDialogComponent implements AfterViewInit {
  form: FormGroup
  course: Course

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course,
    private coursesStore: CoursesStore,
  ) {
    this.course = course
    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required],
    })
  }

  ngAfterViewInit() {}

  save() {
    const changes = this.form.value

    this.coursesStore.saveCourse(this.course.id, changes).subscribe()
    this.dialogRef.close(changes)
  }

  close() {
    this.dialogRef.close()
  }
}
