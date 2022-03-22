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
            <div class="container mt-2 ml-2">
                <div class="header p-2">
                    <h2>{{t('user.add.title')}}</h2>
                    <div class="actions">
                        <button mat-button color="primary" (click)="reset()">
                            {{t('actions.cancel') }}
                        </button>
                        <button mat-flat-button (click)="doSave()"
                                [loading]="saving"
                                [disabled]="userForm.invalid && userForm.touched && !firstSave"
                                color="accent">{{t('actions.save', {entity: t('user.entityName')}) }}
                        </button>
                    </div>
                </div>

                <ng-container [formGroup]="userForm">
                    <app-personal-info formGroupName="personalInfo" class="content m-3"
                                       [languages]="languages">
                    </app-personal-info>

                    <mat-divider></mat-divider>

                    <app-user-role class="content m-3" [roles]="userRoles"
                                   formControlName="role">
                    </app-user-role>

                    <mat-divider></mat-divider>

                    <app-user-permissions class="content m-3" formGroupName="permissions"
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
            role: [],
            permissions: this.fb.group({})
        });
    }

    doSave() {
        validateForm(this.userForm);

        if (this.userForm.valid) {
            const user = this.userForm.value;
            delete user.personalInfo.confirmEmail;
            this.save.emit(user);
        }

        this.firstSave = false;
    }

    reset() {
        this.userForm.reset({});
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ((changes['possiblePermissions'] || changes['teamStructures'])
            && this.possiblePermissions && this.teamStructures) {

            const permissionsCtrl = <FormGroup>this.userForm.get('permissions');
            this.teamStructures.map(t => t.id).forEach(structureId => {
                const structureCtrl = this.fb.group({});

                Object.keys(this.possiblePermissions).forEach(category => {
                    const categoryGroup = this.fb.group({});
                    Object.keys(this.possiblePermissions[category]).forEach(touchPoint => {
                        const touchPointCtrl = this.fb.group({});
                        this.possiblePermissions[category][touchPoint].forEach(permission => {
                            touchPointCtrl.addControl(permission, this.fb.control([false]));
                        });
                        categoryGroup.addControl(touchPoint, touchPointCtrl);
                    });
                    structureCtrl.addControl(category, categoryGroup);
                });
                permissionsCtrl.addControl(structureId, structureCtrl)
            });

        }
    }

}
