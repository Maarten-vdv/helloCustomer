import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserRole} from "../../models/UserRole";
import {ConfirmValidator} from "../../util/confirm-validator";
import {Language} from "../../models/Language";
import {validateForm} from "../../util/validateForm";
import {User} from "../../models/User";
import {TeamStructure} from "../../models/TeamStructure";
import {UserPermissions} from "../../models/UserPermissions";

@Component({
    selector: 'app-add-user',
    template: `
        <ng-container *transloco="let t">
            <div class="container">

                <div class="header p-2 pl-5 pr-4">
                    <h2>{{t('user.add.title')}}</h2>
                    <div class="actions">
                        <button mat-button color="primary" (click)="reset()">
                            {{t('actions.cancel') }}
                        </button>
                        <button mat-flat-button (click)="doSave()"
                                [loading]="saving"
                                [color]="'accent'"
                                [disabled]="(userForm.invalid && userForm.touched && !firstSave) || saving"
                                color="accent">
                            <span>{{t('actions.save', {entity: t('user.entityName')}) }}</span>
                        </button>
                    </div>
                </div>

                <ng-container [formGroup]="userForm">
                    <app-personal-info formGroupName="personalInfo" class="content mt-3 mb-3"
                                       [languages]="languages">
                    </app-personal-info>

                    <mat-divider></mat-divider>

                    <app-user-role class="content mt-3 mb-3" [roles]="userRoles"
                                   formControlName="role">
                    </app-user-role>

                    <mat-divider></mat-divider>

                    <app-user-permissions class="content mt-3 mb-3" formGroupName="permissions"
                                          [teamStructures]="teamStructures">
                    </app-user-permissions>
                </ng-container>

            </div>
        </ng-container>`,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
        }

        .actions {
            margin-left: auto;
            display: flex;

            & > button {
                border-radius: 100px;
                font-variant: small-caps;
                font-size: 1.2rem;
            }
        }
    `]
})
export class AddUserComponent implements OnChanges {

    @Input() languages: Language[];
    @Input() userRoles: UserRole[];
    @Input() possiblePermissions: UserPermissions;
    @Input() teamStructures: TeamStructure[];
    @Input() saving: boolean;

    @Output() save = new EventEmitter<User>();

    userForm: FormGroup;
    firstSave = true;

    constructor(private fb: FormBuilder) {
        this.userForm = this.fb.group({
            personalInfo: this.fb.group({
                "firstName": [],
                "lastName": [],
                "email": ['', [Validators.required, Validators.email]],
                "confirmEmail": ['', [Validators.required, ConfirmValidator('email')]],
                "languageId": [undefined, [Validators.required]]
            }),
            role: [undefined, [Validators.required]],
            permissions: this.fb.group({})
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ((changes['possiblePermissions'] || changes['teamStructures'])
            && this.possiblePermissions && this.teamStructures) {
            this.createPermissionControls();
        }
    }

    private createPermissionControls() {
        const permissionsCtrl = <FormGroup>this.userForm.get('permissions');
        this.teamStructures.map(t => t.id).forEach(structureId => {
            const structureCtrl = this.fb.group({});

            Object.keys(this.possiblePermissions).forEach(category => {
                const categoryGroup = this.fb.group({});
                Object.keys(this.possiblePermissions[category]).forEach(touchPoint => {
                    const touchPointCtrl = this.fb.group({});
                    this.possiblePermissions[category][touchPoint].forEach(permission => {
                        touchPointCtrl.addControl(permission, this.fb.control(false));
                    });
                    categoryGroup.addControl(touchPoint, touchPointCtrl);
                });
                structureCtrl.addControl(category, categoryGroup);
            });
            permissionsCtrl.addControl(structureId, structureCtrl)
        });
    }

    doSave() {
        validateForm(this.userForm);

        if (this.userForm.valid) {
            const userValue = this.userForm.value;
            delete userValue.personalInfo.confirmEmail;

            // convert the true/false state of permissions to a list of permissions that are active
            Object.keys(userValue.permissions).forEach(structure => {
                Object.keys(userValue.permissions[structure]).forEach(category => {
                    Object.keys(userValue.permissions[structure][category]).forEach(touchPoint => {
                        const permissions = userValue.permissions[structure][category][touchPoint];
                        userValue.permissions[structure][category][touchPoint] = Object.keys(permissions).filter(key => !!permissions[key]);
                    });
                });
            });

            this.save.emit(userValue);
        }

        this.firstSave = false;
    }

    reset() {
        this.userForm.reset({});
        this.firstSave = true;
    }
}
