import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { courseTitleValidator } from '../../validators/course-title-validator'
import { CoursesService } from '../../services/courses.service'
import { Observable } from 'rxjs'
import { CourseCategory } from '../../types/courseCategory'

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

    constructor(private fb: FormBuilder, private courses: CoursesService) {}

    ngOnInit() {
        this.courseCategories$ = this.courses.findCourseCategories()
    }

    get courseTitle() {
        return this.form.get('title')
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
            downloadsAllowed: [false, Validators.requiredTrue],
            longDescription: [
                '',
                [Validators.required, Validators.minLength(3)],
            ],
        })
    }
}
