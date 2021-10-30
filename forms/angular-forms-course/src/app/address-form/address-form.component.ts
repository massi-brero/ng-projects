import {Component, Input, OnDestroy} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
    selector: 'address-form',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: AddressFormComponent
    }]
})
export class AddressFormComponent implements ControlValueAccessor, OnDestroy {

    constructor(private fb: FormBuilder) {
    }

    @Input() legend: string;
    onChangeSubscription: Subscription;
    form: FormGroup = this.fb.group({
        addressLine1: [null, [Validators.required]],
        addressLine2: [null, [Validators.required]],
        zipCode: [null, [Validators.required]],
        city: [null, [Validators.required]]
    });
    onTouched = () => {
    }

    ngOnDestroy(): void {
        this.onChangeSubscription.unsubscribe();
    }

    registerOnChange(onChange: any): void {
        this.onChangeSubscription = this.form.valueChanges.subscribe(onChange);
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        if (isDisabled) {
            this.form.disable();
        } else {
            this.form.enable();
        }
    }

    writeValue(value: any): void {
        if (value) {
            this.form.setValue(value);
        }
    }
}















