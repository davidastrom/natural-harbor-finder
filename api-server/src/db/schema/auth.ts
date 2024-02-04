import { relations } from 'drizzle-orm';
import {
    integer,
    pgEnum,
    pgTable,
    primaryKey,
    serial,
    text,
} from 'drizzle-orm/pg-core';

import {
    AuthPermissions,
    AuthPermissionsTuple,
} from '../../types/enums/authPermissions';
import { Roles } from '../../types/enums/roles';
import { userRoles } from './user';

export const permissionEnum = pgEnum<
    AuthPermissions,
    readonly [AuthPermissions, ...AuthPermissions[]]
>('permission', AuthPermissionsTuple);

export const roles = pgTable('roles', {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique().$type<Roles>(),
});

export type RoleSelect = typeof roles.$inferSelect;
export type RoleInsert = typeof roles.$inferInsert;

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

export type RolePermissionSelect = typeof rolePermissions.$inferSelect;
export type RolePermissionInsert = typeof rolePermissions.$inferInsert;
