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

// or
export const pool = new Pool({
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT || '5432'),
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
});

export const db = drizzle(pool);
