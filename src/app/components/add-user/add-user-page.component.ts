import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {LanguageService} from "../../services/language.service";
import {Observable} from "rxjs";
import {UserRole} from "../../models/UserRole";
import {Language} from "../../models/Language";
import {TeamStructure} from "../../models/TeamStructure";
import {UserPermissions} from "../../models/UserPermissions";

@Component({
    selector: 'app-add-user-page',
    template: `
        <app-add-user [userRoles]="userRoles$ | async"
                      [languages]="languages$ | async"
                      [possiblePermissions]="possiblePermissions$ | async"
                      [teamStructures]="teamStructures$ | async"
                      [saving]="saving$ | async">
        </app-add-user>
    `,
})
export class AddUserPageComponent implements OnInit {

    userRoles$: Observable<UserRole[]>;
    languages$: Observable<Language[]>;
    saving$: Observable<boolean>;
    teamStructures$: Observable<TeamStructure[]>;
    possiblePermissions$: Observable<UserPermissions>;

    constructor(private userService: UserService, private languageService: LanguageService) {
        this.userRoles$ = this.userService.getUserRoles$();
        this.saving$ = this.userService.isSaving$();
        this.languages$ = this.languageService.getLanguages$();
        this.teamStructures$ = this.userService.getUserTeamStructures$();
        this.possiblePermissions$ = this.userService.getPossibleUserPermissions$();
    }

    ngOnInit(): void {
    }

}
