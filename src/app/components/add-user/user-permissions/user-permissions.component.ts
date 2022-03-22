import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective} from "@angular/forms";
import {TeamStructure} from "../../../models/TeamStructure";

@Component({
    selector: 'app-user-permissions',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ng-container *transloco="let t">
            <h3>{{t('user.add.permissions.title')}}</h3>
            <mat-expansion-panel *ngFor="let structureId of teamStructureIds" hideToggle="true"
                                 class="mt-3 mb-2"
                                 (opened)="expanded(structureId)"
                                 (closed)="collapsed(structureId)">
                <mat-expansion-panel-header>
                    <mat-panel-title>
                        <div class="team-icon mr-2"></div>
                        <span class="mr-2">{{teamsStructuresById[structureId].team}}</span>
                        <span class="divider">/</span>
                        <div class="folder-icon ml-2 mr-2"></div>
                        <span>{{teamsStructuresById[structureId].folder}}</span>
                    </mat-panel-title>
                    <mat-panel-description>
                        <b *ngIf="isExpanded(structureId)">{{t('user.add.permissions.hide')}}</b>
                        <b *ngIf="!isExpanded(structureId)">{{t('user.add.permissions.show')}}</b>
                    </mat-panel-description>
                </mat-expansion-panel-header>

                <mat-divider></mat-divider>

                <div *ngFor="let category of categories(structureId)">
                    <h2 class="category mt-3 mb-3">
                        <div class="{{category}}-icon large mr-2"></div>
                        <span>{{t('user.add.permissions.' + category)}}</span>
                    </h2>
                    <div class="heading p-2 pl-3 ml-5 mr-5 mb-2">
                        <span class="touchPoint">{{t('user.add.permissions.touchPoints')}}</span>
                        <span class="permissions">{{t('user.add.permissions.' + category)}}</span>
                    </div>
                    <div *ngFor="let touchPoint of touchPoints(structureId, category)" class="row p-2 pl-3 ml-5 mr-5">
                        <div class="touchPoint">
                            <div class="nameWrapper">
                                <div class="touchPoint-icon mr-2"></div>
                                <span>{{touchPoint}}</span>
                            </div>
                        </div>
                        <div class="permissions">
                            <ng-container *ngFor="let permission of permissions(structureId, category, touchPoint)">
                                <mat-checkbox color="primary"
                                              [formControl]="permissionCtrl(structureId, category, touchPoint, permission)">
                                    <div class="nameWrapper">
                                        <div class="{{category.replace(' ', '')}}-icon mr-2"></div>
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

    @Input() formGroupName;
    @Input() teamStructures: TeamStructure[];

    group!: FormGroup;
    teamsStructuresById = {};
    expandedStructures: string[] = [];

    constructor(private rootFormGroup: FormGroupDirective) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['teamStructures'] && this.teamStructures) {
            this.teamsStructuresById = this.teamStructures.reduce((acc, struc) => {
                acc[struc.id] = struc;
                return acc;
            }, {})
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

    expanded(structureId: string) {
        this.expandedStructures.push(structureId);
    }

    collapsed(structureId: string) {
        this.expandedStructures = this.expandedStructures.filter(s => s !== structureId);
    }

    isExpanded(structureId: string) {
        return this.expandedStructures.indexOf(structureId) !== -1;
    }
}
