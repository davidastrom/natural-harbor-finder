import * as dotenv from 'dotenv';
import { eq } from 'drizzle-orm';
import { NextFunction, Request, Response } from 'express';
import {
    auth,
    InsufficientScopeError,
    UnauthorizedError,
} from 'express-oauth2-jwt-bearer';

import { db } from '../db/db.config';
import { users } from '../db/schema/user';
import { AuthPermissions } from '../types/enums/authPermissions';

dotenv.config();

export default auth({
    issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
    audience: process.env.AUTH0_AUDIENCE,
});

export const checkRequiredPermissions = (
    requiredPermissions: AuthPermissions[]
) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const payload = req.auth?.payload;

            if (!payload || !payload.sub) {
                throw new UnauthorizedError();
            }

            const user = await db.query.users.findFirst({
                where: eq(users.auth0Id, payload.sub),
                with: {
                    roles: {
                        with: {
                            role: true,
                        },
                    },
                },
            });

            if (!user) {
                throw new UnauthorizedError();
            }

            const uniquePermissions = user.roles.reduce(
                (set: Set<AuthPermissions>, role) => {
                    role.role.permissions?.forEach((permission) =>
                        set.add(permission)
                    );
                    return set;
                },
                new Set<AuthPermissions>()
            );

            const permissions = Array.from(uniquePermissions);

            const hasPermissions = requiredPermissions.every(
                (requiredPermission) => {
                    return permissions.includes(requiredPermission);
                }
            );

            if (!hasPermissions) {
                throw new InsufficientScopeError();
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};
