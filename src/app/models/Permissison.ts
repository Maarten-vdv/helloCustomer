export interface Permission {
    category: 'dashboardAccess' | 'reports';
    touchPoint: string;
    value: string;
}

export function compare(p1: Permission, p2: Permission) {
    return p1.category === p2.category && p1.touchPoint === p2.touchPoint && p1.value === p2.value;
}
