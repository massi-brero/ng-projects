import { Component } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'create-course-step-3',
    templateUrl: 'create-course-step-3.component.html',
    styleUrls: ['create-course-step-3.component.scss'],
})
export class CreateCourseStep3Component {
    form = this.initForm()

    constructor(private fb: FormBuilder) {}

    private initForm(): FormGroup {
        return this.fb.group({})
    }
}
