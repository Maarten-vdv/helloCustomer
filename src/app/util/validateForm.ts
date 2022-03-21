import {FormArray, FormGroup} from "@angular/forms";

export function validateForm(formGroup: FormGroup | FormArray) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
        control.markAsTouched();
        control.updateValueAndValidity();

        if (control?.controls) {
            validateForm(control);
        }
    });
}
