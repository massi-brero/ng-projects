import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {createPromoRangeValidator} from '../../validators/date-range.validator';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';


@Component({
    selector: 'create-course-step-2',
    templateUrl: 'create-course-step-2.component.html',
    styleUrls: ['create-course-step-2.component.scss'],
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS, useValue: {
                showError: true
            }
        }
    ]
})
export class CreateCourseStep2Component implements OnInit {

    form = this.fb.group({
        courseType: ['premium', Validators.required],
        price: [null,
            [Validators.required,
                Validators.min(1),
                Validators.max(9999),
                Validators.pattern('[0-9]+')]
        ]
    });

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form.valueChanges.subscribe(val => {
            const priceControl = this.form.controls['price'];

            if (val.courseType === 'free' && priceControl.enabled) {
                priceControl.disable({
                    emitEvent: false
                });
            } else if (val.courseType  === 'premium' && priceControl.disabled) {
                priceControl.enable({
                    emitEvent: false
                });
            }
        });
    }
}
