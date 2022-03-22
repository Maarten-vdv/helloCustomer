import {PersonalInfo} from "./PersonalInfo";
import {UserRole} from "./UserRole";
import {UserPermissions} from "./UserPermissions";

export interface User {
    personalInfo: PersonalInfo;
    role: UserRole;
    permissions: {[teamStructureId: string]: UserPermissions}
}


/**
 * {
 *     team1: {
 *         'dashBoardAccess': {
 *             'default'
 *         }
 *     }
 * }
 *
 */
