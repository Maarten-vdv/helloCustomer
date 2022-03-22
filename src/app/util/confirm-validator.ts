import {FormControl} from '@angular/forms';

export function ConfirmValidator(confirmInput: string) {
    let confirmControl: FormControl;
    let controlToConfirm: FormControl;

    return (control: FormControl) => {
        if (!control.parent) {
            return null;
        }

        if (!confirmControl) {
            confirmControl = control;
            controlToConfirm = control.parent.get(confirmInput) as FormControl;
            controlToConfirm.valueChanges.subscribe(() => {
                confirmControl.updateValueAndValidity();
            });
        }

        if (controlToConfirm.value?.toLocaleLowerCase() !==
            confirmControl.value?.toLocaleLowerCase()
        ) {
            return {noMatch: true};
        }

        return null;
    };
}
