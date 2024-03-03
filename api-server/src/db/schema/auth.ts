import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, serial, text } from 'drizzle-orm/pg-core';

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
    permissions: permissionEnum('permissions')
        .notNull()
        .array()
        .$type<AuthPermissions[]>(),
});

export type RoleSelect = typeof roles.$inferSelect;
export type RoleInsert = typeof roles.$inferInsert;

export const rolesRelations = relations(roles, ({ many }) => ({
    users: many(userRoles),
}));
