import { prop } from '@typegoose/typegoose';

import { AuthenticationClient } from '../../types/enums/authenticationClient';
import { BaseModel } from '../base.model';

export class AuthClientUserId extends BaseModel {
    @prop({enum: AuthenticationClient})
    client!: AuthenticationClient;

    @prop()
    userId!: string;
}
