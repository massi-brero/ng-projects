import {FormGroup, ValidatorFn, Validators} from '@angular/forms';

export function promoRangeValidator(): ValidatorFn {
    return (form: FormGroup): Validators | null => {
        const start: Date = form.get('promoStartAt').value;
        const end: Date = form.get('promoEndAt').value;

        if (start && end) {
            const isRangevalid = (end?.getTime() - start?.getTime()) > 0;

            return isRangevalid ? null :
                {promoPeriod: true};

        }
        return null;
    };
}
