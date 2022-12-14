import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { createPromoRangeValidator } from '../../validators/date-range.validator'

@Component({
    selector: 'create-course-step-2',
    templateUrl: 'create-course-step-2.component.html',
    styleUrls: ['create-course-step-2.component.scss'],
})
export class CreateCourseStep2Component implements OnInit {
    form = this.fb.group(
        {
            courseType: ['', Validators.required],
            price: [
                null,
                [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(9999),
                    Validators.pattern(/[0-9]+/),
                ],
            ],
            promoStartAt: [null],
            promoEndAt: [null],
            fileUpload: [null],
        },
        {
            validators: [createPromoRangeValidator()],
        }
    )

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        const courseControl = this.form.get('courseType')
        const priceControl = this.form.get('price')
        courseControl.setValue('free')
        priceControl.disable()
        courseControl.valueChanges.subscribe((value: string) => {
            if (value === 'premium' && priceControl.disabled) {
                priceControl.enable({ emitEvent: false })
            } else if (value === 'free' && priceControl.enabled) {
                priceControl.disable({ emitEvent: false })
            }
        })
    }
}
