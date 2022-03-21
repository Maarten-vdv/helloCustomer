import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {UserRole} from "../../models/UserRole";
import {ConfirmValidator} from "../../util/confirm-validator";
import {LanguageService} from "../../services/language.service";
import {Language} from "../../models/Language";
import {validateForm} from "../../util/validateForm";

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
                        <button mat-flat-button (click)="save()"
                                [loading]="saving$ | async"
                                [disabled]="userForm.invalid && userForm.touched && !firstSave"
                                color="accent">{{t('actions.save', {entity: t('user.entityName')}) }}
                        </button>
                    </div>
                </div>

                <ng-container [formGroup]="userForm">
                    <app-personal-info formGroupName="personalInfo" class="content m-3"
                                       [languages]="languages$ | async">
                    </app-personal-info>

                    <mat-divider></mat-divider>

                    <app-user-role class="content m-3" [roles]="userRoles$ | async"
                                   formControlName="role">
                    </app-user-role>

                    <mat-divider></mat-divider>

                    <app-user-permissions class="content m-3" formGroupName="permissions"
                                          [permissionGroups]="permissionGroups" [userGroups]="userGroups">
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
export class AddUserComponent {

    userForm: FormGroup;
    userGroups: string[][];
    permissionGroups: string[];

    userRoles$: Observable<UserRole[]>;
    languages$: Observable<Language[]>;
    saving$: Observable<boolean>;
    firstSave = true;

    constructor(private fb: FormBuilder, private userService: UserService, private languageService: LanguageService) {
        this.userForm = this.fb.group({
            personalInfo: this.fb.group({
                "firstName": [],
                "lastName": [],
                "email": ['', [Validators.required, Validators.email]],
                "confirmEmail": ['', [Validators.required, ConfirmValidator('email')]],
                "languageId": [undefined, [Validators.required]]
            }),
            role: [],
            permissions: []
        });

        this.userForm.patchValue({role: 'admin'});

        this.userRoles$ = this.userService.getUserRoles$();
        this.saving$ = this.userService.isSaving$();
        this.languages$ = this.languageService.getLanguages$();
    }

    save() {
        validateForm(this.userForm);

        if (this.userForm.valid) {
            const user = this.userForm.value;
            delete user.personalInfo.confirmEmail;
            this.userService.save(user);
        }

        this.firstSave = false;
    }

    reset() {
        this.userForm.reset({});
    }

}
