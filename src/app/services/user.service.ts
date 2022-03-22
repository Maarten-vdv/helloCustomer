import {Injectable} from "@angular/core";
import {UserRole} from "../models/UserRole";
import {BehaviorSubject, Observable, of, timer} from "rxjs";
import {User} from "../models/User";
import {TeamStructure} from "../models/TeamStructure";
import {UserPermissions} from "../models/UserPermissions";

@Injectable({
    providedIn: "root"
})
export class UserService {

    private readonly roles: UserRole[] = [
        {id: "admin", name: "Admin", description: "Can edit and view everything in the application"},
        {id: "manager", name: "Manager", description: "Can view TPs, analysis, reports, dashboards, conversations"},
        {id: "employee", name: "Employee", description: "Has access only to personally assigned data"}
    ];
    private readonly teams: TeamStructure[] = [
        {id: "team1", team: "Ontwikkel", folder: "Team A"},
        {id: "team2", team: "Client team", folder: "Team Brussel"}
    ]

    private readonly userPermissions: UserPermissions = {
        "dashboardaccess": {
            'Touchpoint email 1': ['Default', 'Custom NPS dashboard'],
            'Touchpoint email 2': ['Default']
        },
        "reports": {
            'Touchpoint email 1': ['Default'],
            'Touchpoint email 2': ['Default']
        }
    };


    private saving$ = new BehaviorSubject<boolean>(false);

    getUserRoles$(): Observable<UserRole[]> {
        return of(this.roles);
    }

    save(user: User): void {
        this.saving$.next(true);
        console.log(user);
        timer(2000).subscribe(() => this.saving$.next(false));
    }

    isSaving$(): Observable<boolean> {
        return this.saving$;
    }

    getUserTeamStructures$(): Observable<TeamStructure[]> {
        return of(this.teams);
    }

    getPossibleUserPermissions$(): Observable<UserPermissions> {
        return of(this.userPermissions);
    }
}
