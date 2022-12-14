import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {courseTitleValidator} from '../../validators/course-title-validator'
import {CoursesService} from '../../services/courses.service'
import {Observable} from 'rxjs'
import {filter} from 'rxjs/operators'
import {CourseCategory} from '../../types/courseCategory'

@Component({
  selector: 'create-course-step-1',
  templateUrl: './create-course-step-1.component.html',
  styleUrls: ['./create-course-step-1.component.scss'],
})
export class CreateCourseStep1Component implements OnInit {
  form: FormGroup = this.initForm()
  titleMinLength = 5
  titleMaxLength = 60
  courseCategories$: Observable<CourseCategory[]>

  constructor(private fb: FormBuilder, private courses: CoursesService) {
  }

  get courseTitle() {
    return this.form.get('title')
  }

  ngOnInit() {
    this.courseCategories$ = this.courses.findCourseCategories()
    const draft = JSON.parse(localStorage.getItem('STEP_1'))

    draft ? this.form.setValue(draft) : null;

    this.form.valueChanges
      .pipe(filter((_) => this.form.valid))
      .subscribe(_ => localStorage.setItem('STEP_1', JSON.stringify(this.form.value)))
  }

  private initForm() {
    return this.fb.group({
      title: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(this.titleMinLength),
            Validators.maxLength(this.titleMaxLength),
          ],
          asyncValidators: [courseTitleValidator(this.courses)],
          updateOn: 'blur',
        },
      ],
      releasedAt: [new Date(), Validators.required],
      downloadsAllowed: [false],
      longDescription: [
        '',
        [Validators.required, Validators.minLength(3)],
      ],
      category: ['BEGINNER', Validators.required],
      //address: [null, Validators.required],
    })
  }
}
