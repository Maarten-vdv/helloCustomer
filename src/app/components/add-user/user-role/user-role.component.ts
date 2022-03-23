import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {UserRole} from "../../../models/UserRole";
import {AbstractControl, ControlValueAccessor, NgControl} from "@angular/forms";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
    selector: 'app-user-role',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ng-container *transloco="let t">
            <h3>{{t('user.add.userRole')}}</h3>

            <mat-error *ngIf="control?.touched && control?.invalid">
                {{t(getErrorMessage())}}
            </mat-error>

            <div class="list mt-3 mb-2">
                <div *ngFor="let role of roles" class="role pl-4 pr-2 pb-3"
                     [class.selected]="role.id === selectedId"
                     (click)="select(role.id)">
                    <h4 class="mb-2">{{role.name}}</h4>
                    <span class="description">{{role.description}}</span>
                </div>
            </div>

            <span class="mb-2 small">{{t('user.role.extraInfo')}} <a
                href="https://google.be">{{t('user.role.extraInfoLink')}}</a></span>

        </ng-container>
    `,
    styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit, ControlValueAccessor {

    @Input() roles: UserRole[];

    control: AbstractControl;
    selectedId: string;
    private onChange: any;

    constructor(private changeDetection: ChangeDetectorRef, private ngControl: NgControl) {
        this.ngControl.valueAccessor = this;
    }

    ngOnInit(): void {
        this.control = this.ngControl.control;
        this.control.statusChanges.pipe(
            untilDestroyed(this)
        ).subscribe(() => this.changeDetection.detectChanges());
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    writeValue(obj: any): void {
        this.selectedId = obj;
        this.changeDetection.detectChanges();
    }

    select(id: string) {
        this.selectedId = id;
        this.onChange(id);
    }

    getErrorMessage(): string | null {
        if (this.control.hasError('required')) {
            return 'form.error.required_select';
        }
        return null;
    }
}
