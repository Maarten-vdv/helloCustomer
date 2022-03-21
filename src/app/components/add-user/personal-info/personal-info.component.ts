import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormGroupDirective} from "@angular/forms";
import {Language} from "../../../models/Language";
import {TranslocoService} from "@ngneat/transloco";

@Component({
    selector: 'app-personal-info',
    template: `
        <ng-container *transloco="let t">
            <h3>{{t('user.add.personalInfo')}}</h3>

            <ng-container [formGroup]="group">
                <mat-form-field class="example-form-field">
                    <mat-label>{{t('user.field.firstName')}} ({{t('form.field.optional')}})</mat-label>
                    <input matInput type="text" formControlName="firstName">
                </mat-form-field>

                <mat-form-field class="example-form-field">
                    <mat-label>{{t('user.field.lastName')}} ({{t('form.field.optional')}})</mat-label>
                    <input matInput type="text" formControlName="lastName">
                </mat-form-field>

                <mat-form-field hideRequiredMarker class="example-form-field">
                    <mat-label>{{t('user.field.email')}}</mat-label>
                    <input matInput email name="email" type="text" formControlName="email">
                    <mat-error *ngIf="group.get('email').invalid">{{getErrorMessage('email')}}</mat-error>
                </mat-form-field>

                <mat-form-field hideRequiredMarker class="example-form-field">
                    <mat-label>{{t('user.field.confirmEmail')}}</mat-label>
                    <input matInput type="text" formControlName="confirmEmail">
                    <mat-error *ngIf="group.get('confirmEmail').invalid">{{getErrorMessage('confirmEmail')}}</mat-error>
                </mat-form-field>

                <mat-form-field hideRequiredMarker class="example-form-field">
                    <mat-label>{{t('user.field.language')}}</mat-label>
                    <mat-select formControlName="languageId">
                        <mat-option *ngFor="let language of languages" [value]="language.id">
                            {{language.name}}
                        </mat-option>
                    </mat-select>
                    <mat-error *ngIf="group.get('languageId').invalid">{{getErrorMessage('languageId')}}</mat-error>
                </mat-form-field>
            </ng-container>
        </ng-container>
    `,
    styles: [`
        :host {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 1rem;
            grid-auto-rows: min-content;
            grid-auto-flow: row;
        }

        h3 {
            grid-column: 1/3;
            grid-row: 1;
        }
    `]
})
export class PersonalInfoComponent implements OnInit {

    group!: FormGroup;
    @Input() formGroupName;
    @Input() languages: Language[];

    constructor(private rootFormGroup: FormGroupDirective, private transloco: TranslocoService) {
    }

    ngOnInit(): void {
        this.group = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    }

    getErrorMessage(field: string) {
        if (this.group.get(field).hasError('required')) {
            return this.transloco.translate('form.error.required');
        } else if (this.group.get(field).hasError('email')) {
            return this.transloco.translate('form.error.invalidMail');
        } else if (this.group.get(field).hasError('noMatch')) {
            return this.transloco.translate('form.error.emailNotMatch');
        }
        return "";
    }

}
