import { relations } from 'drizzle-orm';
import {
    bigserial,
    integer,
    pgTable,
    primaryKey,
    text,
} from 'drizzle-orm/pg-core';

import { roles } from './auth';

export const users = pgTable('users', {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    auth0Id: text('auth0_id'),
    profilePicture: text('profile_picture'),
});

export const usersRelations = relations(users, ({ many }) => ({
    roles: many(userRoles),
}));

export const userRoles = pgTable(
    'user_roles',
    {
        userId: integer('user_id')
            .notNull()
            .references(() => users.id),
        roleId: integer('role_id')
            .notNull()
            .references(() => roles.id),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.roleId, t.userId] }),
    })
);

export const userRolesRelations = relations(userRoles, ({ one }) => ({
    user: one(users, {
        fields: [userRoles.userId],
        references: [users.id],
    }),
    role: one(roles, {
        fields: [userRoles.roleId],
        references: [roles.id],
    }),
}));