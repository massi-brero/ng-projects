import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CoursesService} from '../../services/courses.service';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {courseTitleValidator} from '../../validators/course-title.validator';
import {getCourseCategories} from '../../../../server/course-categories.route';

interface CourseCategory {
  code: string;
  description: string;
}

@Component({
  selector: 'create-course-step-1',
  templateUrl: './create-course-step-1.component.html',
  styleUrls: ['./create-course-step-1.component.scss']
})
export class CreateCourseStep1Component implements OnInit {
  form = this.fb.group({
    title: ['', {
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ],
      asyncValidators: [courseTitleValidator(this.coursesService)],
      updateOn: 'blur'
    }],
    releasedAt: [new Date(), Validators.required],
    category: ['BEGINNER', Validators.required],
    downloadsAllowed: [false, Validators.requiredTrue],
    descriptionLong: ['', [Validators.required, Validators.minLength(10)]]
  });

  courseCategories$: Observable<CourseCategory[]>;

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService
  ) {
  }

  ngOnInit(): void {
    this.courseCategories$ = this.coursesService.findCourseCategories();

    // this.form.controls['releasedAt'].valueChanges.subscribe(val => {
    //   console.log(val);
    // });
  }

  get courseTitle() {
    return this.form.controls['title'];
  }
}
