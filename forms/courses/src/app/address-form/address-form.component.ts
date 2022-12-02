import { Component, Input, OnDestroy } from '@angular/core'
import {
    AbstractControl,
    ControlValueAccessor,
    FormBuilder,
    FormGroup,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    Validator,
    Validators,
} from '@angular/forms'
import { Subscription } from 'rxjs'

@Component({
    selector: 'address-form',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: AddressFormComponent,
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: AddressFormComponent,
        },
    ],
})
export class AddressFormComponent
    implements ControlValueAccessor, Validator, OnDestroy
{
    @Input()
    legend: string
    onTouched = () => {}
    onValidatorChange = () => {}
    onChangeSubscription: Subscription

    form: FormGroup = this.fb.group({
        addressLine1: [null, [Validators.required]],
        addressLine2: [null, [Validators.required]],
        zipCode: [null, [Validators.required]],
        city: [null, [Validators.required]],
    })

    constructor(private fb: FormBuilder) {}

    ngOnDestroy() {
        this.onChangeSubscription.unsubscribe()
    }

    registerOnChange(fn: (value: any) => {}): void {
        this.onChangeSubscription = this.form.valueChanges.subscribe(fn)
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn
    }

    setDisabledState(isDisabled: boolean): void {
        if (isDisabled) {
            this.form.disable()
        }
    }

    writeValue(value: any): void {
        if (value) {
            this.form.setValue(value)
        } else {
            this.form.enable()
        }
    }

    registerOnValidatorChange(fn: () => void): void {
        this.onValidatorChange = fn
    }

    validate(control: AbstractControl): ValidationErrors | null {
      return Object.keys(this.form.controls).map((key) => {
        let controlErrors = this.form.get(key).errors
        if (controlErrors) {
          return { key: controlErrors }
        }
      }).filter(el => el !== undefined) || null
    }
}
