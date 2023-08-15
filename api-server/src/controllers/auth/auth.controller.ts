import { Request, Response } from 'express';

import { UserModel } from '../../models/users/user.model';

export async function loginUser(req: Request, res: Response) {
    const tokenPayload = req.auth?.payload;
    console.log(tokenPayload)
    if (!tokenPayload) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await UserModel.getOrCreateUser(tokenPayload, true);

    if (!user) {
        return res.status(401).json({ message: 'User does not exist' });
    }
    
    const isAdmin = await user.isAdmin();

    return res.json({
        id: user._id,
        auth0Id: user.userId,
        isAdmin: isAdmin,
        profilePicture: user.profilePicture,
    });
}
