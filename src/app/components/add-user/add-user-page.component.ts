import {Component} from '@angular/core';
import {UserService} from "../../services/user.service";
import {LanguageService} from "../../services/language.service";
import {Observable} from "rxjs";
import {UserRole} from "../../models/UserRole";
import {Language} from "../../models/Language";
import {TeamStructure} from "../../models/TeamStructure";
import {UserPermissions} from "../../models/UserPermissions";
import {User} from "../../models/User";

@Component({
    selector: 'app-add-user-page',
    template: `
        <app-add-user
            [userRoles]="userRoles$ | async"
            [languages]="languages$ | async"
            [possiblePermissions]="possiblePermissions$ | async"
            [teamStructures]="teamStructures$ | async"
            [saving]="saving$ | async"
            (save)="doSave($event)">
        </app-add-user>
    `,
})
export class AddUserPageComponent {

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

    doSave(user: User) {
        this.userService.save(user);
    }
}
