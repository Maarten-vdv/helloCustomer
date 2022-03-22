import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective} from "@angular/forms";
import {TeamStructure} from "../../../models/TeamStructure";

@Component({
    selector: 'app-user-permissions',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ng-container *transloco="let t">
            <h3>{{t('user.add.permissions.title')}}</h3>
            <mat-expansion-panel *ngFor="let structureId of teamStructureIds" [expanded]="true">
                <mat-expansion-panel-header>
                    <mat-panel-title>
                        {{teamStructuresById[structureId]}}
                    </mat-panel-title>
                    <mat-panel-description>
                        <span>{{t('user.permissions.hide')}}</span>
                    </mat-panel-description>
                </mat-expansion-panel-header>

                <div *ngFor="let category of categories(structureId)">
                    <h2 class="category">
                        <div class="dashboardAccess-icon large"></div>
                        {{category | lowercase}}</h2>
                    <div class="heading">
                        <span class="touchPoint">{{t('user.add.permissions.touchPoints')}}</span>
                        <span class="permissions">{{t('user.add.permissions.' + category)}}</span>
                    </div>
                    <div *ngFor="let touchPoint of touchPoints(structureId, category)" class="row p-1 ml-3">
                        <div class="touchPoint">
                            <div class="nameWrapper">
                                <div class="touchPoint-icon"></div>
                                <span>{{touchPoint}}</span>
                            </div>
                        </div>
                        <div class="permissions">
                            <ng-container *ngFor="let permission of permissions(structureId, category, touchPoint)">
                                <mat-checkbox color="primary"
                                              [formControl]="permissionCtrl(structureId, category, touchPoint, permission)">
                                    <div class="nameWrapper">
                                        <div class="{{category}}-icon"></div>
                                        <span>{{permission}}</span>
                                    </div>
                                </mat-checkbox>
                            </ng-container>
                        </div>
                    </div>
                </div>

            </mat-expansion-panel>
        </ng-container>
    `,
    styleUrls: ['./user-permissions.component.scss']
})
export class UserPermissionsComponent implements OnInit, OnChanges {

    group!: FormGroup;

    @Input() formGroupName;
    @Input() teamStructures: TeamStructure[];

    teamStructuresById = {};

    constructor(private rootFormGroup: FormGroupDirective) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['teamStructures'] && this.teamStructures) {
            this.teamStructuresById = this.teamStructures.reduce((acc, struc) => {
                acc[struc.id] = struc;
                return acc;
            })
        }
    }

    ngOnInit(): void {
        this.group = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    }

    get teamStructureIds(): string[] {
        return Object.keys(this.group.controls);
    }

    categories(structureId: string): string[] {
        return Object.keys((<FormGroup>this.group.get(structureId)).controls);
    }

    touchPoints(structureId: string, category: string): string[] {
        return Object.keys((<FormGroup>this.group.get(structureId + '.' + category)).controls);
    }

    permissions(structureId: string, category: string, touchPoint: string): string[] {
        return Object.keys((<FormGroup>this.group.get(structureId + '.' + category + '.' + touchPoint)).controls);
    }

    permissionCtrl(structureId: string, category: string, touchPoint: string, permission: string): FormControl {
        return <FormControl>this.group.get(structureId + '.' + category + '.' + touchPoint + '.' + permission);
    }
}
