import { eq } from 'drizzle-orm';
import { Request, Response } from 'express';

import { db } from '../../db/db.config';
import { users } from '../../db/schema/user';
import { Roles } from '../../types/enums/roles';

export async function loginUser(req: Request, res: Response) {
    const tokenPayload = req.auth?.payload;
    if (!tokenPayload || !tokenPayload.sub) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await db.query.users.findFirst({
        with: {
            roles: {
                with: {
                    role: true,
                },
            },
        },
        where: eq(users.auth0Id, tokenPayload.sub),
    });

    if (!user) {
        return res.status(401).json({ message: 'User does not exist' });
    }

    const isAdmin = user.roles.some((role) => role.role.name === Roles.Admin);

    return res.json({
        id: user.id,
        auth0Id: user.auth0Id,
        isAdmin: isAdmin,
        profilePicture: user.profilePicture,
    });
}
