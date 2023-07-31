import { JWTPayload } from 'express-oauth2-jwt-bearer';

import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose';

import { BaseModel } from '../base.model';

export class User extends BaseModel {
    @prop({required: true})
    public userId!: string

    @prop()
    public profilePicture?: string;

    public static async getOrCreateUser(
        this: ReturnModelType<typeof User>,
        tokenPayload: JWTPayload, 
        create = false): Promise<User | null> {
            if (!tokenPayload.sub) {
                return null;
            }

            let user = await this.findOne({'userId': tokenPayload.sub})

            if (user) {
                return user;
            }

            if (create) {
                user = new UserModel({
                    userId: tokenPayload.sub,
                })
                user.save();
                return user;
            }

            return null;
    }
}

export const UserModel = getModelForClass(User);
