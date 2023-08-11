import { JWTPayload } from 'express-oauth2-jwt-bearer';

import {
  DocumentType,
  getModelForClass,
  isDocumentArray,
  prop,
  Ref,
  ReturnModelType
} from '@typegoose/typegoose';

import { AuthPermissions } from '../../types/enums/authPermissions';
import { Roles } from '../../types/enums/roles';
import { BaseModel } from '../base.model';
import { Role, RoleModel } from './role.model';

export class User extends BaseModel {
    @prop({required: true})
    public userId!: string

    @prop({ ref: () => Role })
    public roles!: Ref<Role>[];

    @prop()
    public profilePicture?: string;

    public static async getOrCreateUser(
        this: ReturnModelType<typeof User>,
        tokenPayload: JWTPayload, 
        create = false) {
            if (!tokenPayload.sub) {
                return null;
            }

            let user = await this.findOne({'userId': tokenPayload.sub})

            if (user) {
                return user;
            }

            if (create) {
                const userRole = await RoleModel.findOne({name: Roles.User})

                user = new UserModel({
                    userId: tokenPayload.sub,
                    roles: userRole ? [userRole] : []
                })
                user.save();
                return user;
            }

            return null;
    }

    public async getPermissions(this: DocumentType<User>): Promise<AuthPermissions[]> {
        await this.populate('roles');

        if (isDocumentArray(this.roles)) {
            const uniqueRoles = this.roles.reduce((set: Set<AuthPermissions>, role) => {
                    role.permissions.forEach((permission: AuthPermissions) => set.add(permission));
                return set
            }, new Set<AuthPermissions>());

            return Array.from(uniqueRoles);
        }

        return []
    }
}

export const UserModel = getModelForClass(User);
