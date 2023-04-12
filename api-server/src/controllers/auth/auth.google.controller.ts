import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { UserData, UserModel } from '../../models/users/user.model';
import { AuthenticationClient } from '../../types/enums/authenticationClient';
import { verifyGoogleToken } from '../../utils/auth/auth.google.util';
import { googleLoginInputModel } from './auth.dto';

export async function loginGoogle(
    req: Request,
    res: Response
): Promise<void> {
    const input = req.body as googleLoginInputModel;

    const verificationResult = await verifyGoogleToken(input.credential);
    if (verificationResult.error || !verificationResult.payload) {
        res.status(400).send({
            message: verificationResult.error,
        });
        return;
    }

    const userData: UserData = {
        authClient: AuthenticationClient.GOOGLE,
        authUserId: verificationResult.payload.sub,
        email: verificationResult.payload.email,
        profilePicture: verificationResult.payload.picture,
        userName: verificationResult.payload.name,
    }

    const user = await UserModel.getOrCreateUser(userData);

    if (!user) {
        res.status(400).send({
            message: "No account linked to this profile",
        });
        return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        res.status(500).send()
        return
    }

    res.status(200).json({
        message: "Login successful",
        user: {
            id: user._id,
            userName: user.userName,
            email: user.email,
            profilePicture: user.profilePicture,
            token: jwt.sign({ email: user.email, authClient: userData.authClient, authUserId: userData.authUserId }, jwtSecret)
        }
    }).send()
}

