import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'create-course-step-1',
    templateUrl: './create-course-step-1.component.html',
    styleUrls: ['./create-course-step-1.component.scss'],
})
export class CreateCourseStep1Component implements OnInit {
    form: FormGroup = this.initForm()
    titleMinLength = 5
    titleMaxLength = 60

    constructor(private fb: FormBuilder) {}

    ngOnInit() {}

    private initForm() {
        return this.fb.group({
            title: [
                '',
                Validators.required,
                Validators.minLength(this.titleMinLength),
                Validators.maxLength(this.titleMaxLength),
            ],
        })
    }
}
