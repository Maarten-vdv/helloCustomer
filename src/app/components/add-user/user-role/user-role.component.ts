import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {UserRole} from "../../../models/UserRole";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
    selector: 'app-user-role',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ng-container *transloco="let t">
            <h3>{{t('user.add.userRole')}}</h3>

            <div class="list mt-2 mb-2">
                <div *ngFor="let role of roles; let l = last; let f= first"
                     class="role p-2 pt-0" [class.ml-2]="!f"
                     [class.mr-2]="!f"
                     [class.selected]="role.id === selectedId"
                     (click)="select(role.id)">
                    <h4>{{role.name}}</h4>
                    <span>{{role.description}}</span>
                </div>
            </div>

            <span>{{t('user.role.extraInfo')}}</span>
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
