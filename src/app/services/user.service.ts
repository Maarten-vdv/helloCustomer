import {Injectable} from "@angular/core";
import {UserRole} from "../models/UserRole";
import {BehaviorSubject, Observable, of, timer} from "rxjs";
import {User} from "../models/User";

@Injectable({
    providedIn: "root"
})
export class UserService {

    private roles: UserRole[] = [
        {id: "admin", name: "Admin", description: "Can edit and view everything in the application"},
        {id: "manager", name: "Manager", description: "Can view TPs, analysis, reports, dashboards, conversations"},
        {id: "employee", name: "Employee", description: "Has access only to personally assigned data"}
    ];
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
}
