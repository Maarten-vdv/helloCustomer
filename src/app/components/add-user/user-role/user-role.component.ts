import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {UserRole} from "../../../models/UserRole";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
    selector: 'app-user-role',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ng-container *transloco="let t">
            <h3>{{t('user.add.userRole')}}</h3>

            <div class="list mt-3 mb-3">
                <div *ngFor="let role of roles;" class="role pl-4 pr-0 pb-2"
                     [class.selected]="role.id === selectedId"
                     (click)="select(role.id)">
                    <h4>{{role.name}}</h4>
                    <span class="description">{{role.description}}</span>
                </div>
            </div>

            <span class="mb-2 small">{{t('user.role.extraInfo')}} <a
                href="https://google.be">{{t('user.role.extraInfoLink')}}</a></span>

        </ng-container>
    `,
    styleUrls: ['./user-role.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: UserRoleComponent,
        multi: true
    }]
})
export class UserRoleComponent implements OnInit, ControlValueAccessor {

    @Input() roles: UserRole[];

    selectedId: string;
    private onChange: any;

    constructor() {
    }

    ngOnInit(): void {
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    writeValue(obj: any): void {
        this.selectedId = obj;
    }

    select(id: string) {
        this.selectedId = id;
        this.onChange(id);
    }
}
