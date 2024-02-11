// console.log('Creating default roles');
// const userRole = await RoleModel.findOne({ name: Roles.User });
// if (!userRole) {
//     const role = new RoleModel({
//         name: Roles.User,
//         permissions: [AuthPermissions.ReadHarbors],
//     });
//     role.save();
// }

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as auth from './schema/auth';
import * as book from './schema/book';
import * as harbor from './schema/harbor';
import * as user from './schema/user';

// or
export const pool = new Pool({
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT || '5432'),
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
});

export const db = drizzle(pool, {
    schema: { ...auth, ...user, ...harbor, ...book },
});
