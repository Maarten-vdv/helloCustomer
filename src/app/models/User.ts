import {PersonalInfo} from "./PersonalInfo";
import {UserRole} from "./UserRole";

export interface User {
    personalInfo: PersonalInfo;
    role: UserRole;
    permissions: { [group: string]: Permissions }
}
