import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import {
  auth,
  InsufficientScopeError,
  UnauthorizedError
} from 'express-oauth2-jwt-bearer';

import { UserModel } from '../models/users/user.model';
import { AuthPermissions } from '../types/enums/authPermissions';

dotenv.config();



export default auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: process.env.AUTH0_AUDIENCE,
});

export const checkRequiredPermissions = (requiredPermissions: AuthPermissions[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {      
      const payload = req.auth?.payload;

      if (!payload) {
        throw new UnauthorizedError();
      }

      const user = await UserModel.getOrCreateUser(payload, true);

      if (!user) {
        throw new UnauthorizedError();
      }

      const permissions = await user.getPermissions();
      
      const hasPermissions = requiredPermissions.every((requiredPermission) => {
        return permissions.includes(requiredPermission);
      });

      if (!hasPermissions) {
        throw new InsufficientScopeError();
      }

      next();
    } catch (error) {
      next(error)
    }
  };
};
