import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
    selector: 'app-user-permissions',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ng-container *transloco="let t">
            <h3>{{t('user.add.permissions')}}</h3>

            <mat-expansion-panel *ngFor="let permissionGroup of permissionGroups">
                <mat-expansion-panel-header>
                    <mat-panel-title>
                        This is the expansion title
                    </mat-panel-title>
                    <mat-panel-description>
                        <span>{{t('user.permissions.hide')}}</span>
                    </mat-panel-description>
                </mat-expansion-panel-header>


            </mat-expansion-panel>
        </ng-container>
    `,
    styleUrls: ['./user-permissions.component.scss']
})
export class UserPermissionsComponent implements OnInit {

    group!: FormGroup;

    @Input() formGroupName;
    @Input() permissionGroups: string[];
    @Input() userGroups: string[][];

    constructor(private rootFormGroup: FormGroupDirective) {
    }

    ngOnInit(): void {
        this.group = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    }
}
