import { relations } from 'drizzle-orm';
import {
    integer,
    pgEnum,
    pgTable,
    primaryKey,
    serial,
} from 'drizzle-orm/pg-core';

import {
    AuthPermissions,
    AuthPermissionsTuple,
} from '../../types/enums/authPermissions';
import { userRoles } from './user';

export const permissionEnum = pgEnum<
    AuthPermissions,
    readonly [AuthPermissions, ...AuthPermissions[]]
>('permission', AuthPermissionsTuple);

export const roles = pgTable('roles', {
    id: serial('id').primaryKey(),
});

export const rolesRelations = relations(roles, ({ many }) => ({
    permissions: many(rolePermissions),
    users: many(userRoles),
}));

export const rolePermissions = pgTable(
    'role_permissions',
    {
        roleId: integer('role_id')
            .notNull()
            .references(() => roles.id),
        permission: permissionEnum('permission')
            .notNull()
            .$type<AuthPermissions>(),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.roleId, t.permission] }),
    })
);
