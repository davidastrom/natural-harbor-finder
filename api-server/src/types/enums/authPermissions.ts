export const AuthPermissions = {
    ReadHarbors: 'read:harbors',
    EditHarbors: 'edit:harbors',
} as const;

export type AuthPermissions = typeof AuthPermissions[keyof typeof AuthPermissions];

export const AuthPermissionsTuple: readonly [
    AuthPermissions,
    ...AuthPermissions[]
] = Object.values(AuthPermissions) as [AuthPermissions, ...AuthPermissions[]];
