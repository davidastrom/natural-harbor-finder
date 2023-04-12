import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose';

import { AuthenticationClient } from '../../types/enums/authenticationClient';
import { AuthorizationRoles } from '../../types/enums/authorizationRoles';
import { BaseModel } from '../base.model';
import { AuthClientUserId } from './auth-client-user-id.model';

export class User extends BaseModel {
    @prop()
    public userName!: string;

    @prop()
    public email!: string;

    @prop()
    public profilePicture?: string;

    @prop({type: Number, enum: AuthorizationRoles})
    public roles!: AuthorizationRoles[]

    @prop({type: () => AuthClientUserId})
    public clientUserIds!: AuthClientUserId[]

    public static async getOrCreateUser(
        this: ReturnModelType<typeof User>,
        userData: UserData, 
        create = false): Promise<User | null> {
            let user = await this.findOne({'clientUserIds.client': userData.authClient, 'clientUserIds.userId': userData.authUserId}).exec();
            if (user) {
                return user;
            }

            if (!userData.email) {
                return null;
            }

            user = await this.findOne({'email': userData.email})
            if (user) {
                if (user.clientUserIds.find(cui => cui.client === userData.authClient)) {
                    return null
                }
                user.clientUserIds.push({client: userData.authClient, userId: userData.authUserId})
                user.userName = user.userName ?? userData.userName ?? userData.email;
                user.profilePicture = user.profilePicture ?? userData.profilePicture;
                user.save()
                return user;
            }

            if (create) {
                user = new UserModel({
                    userName: userData.userName ?? userData.email,
                    email: userData.email,
                    profilePicture: userData.profilePicture,
                    roles: [AuthorizationRoles.USER],
                    clientUserIds: [{client: userData.authClient, userId: userData.authUserId}],
                })
                user.save();
                return user;
            }

            return null;
    }
}

export interface UserData {
    authClient: AuthenticationClient,
    authUserId: string,
    userName?: string,
    email?: string,
    profilePicture?: string,
}

export const UserModel = getModelForClass(User);
