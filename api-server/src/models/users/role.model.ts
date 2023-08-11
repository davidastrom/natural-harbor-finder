
import { getModelForClass, prop } from '@typegoose/typegoose';

import { AuthPermissions } from '../../types/enums/authPermissions';
import { Roles } from '../../types/enums/roles';
import { BaseModel } from '../base.model';

export class Role extends BaseModel {
    @prop({required: true, unique: true})
    public name!: Roles;

    @prop({default: [], type: () => [String]})
    public permissions!: AuthPermissions[];
}

export const RoleModel = getModelForClass(Role);
 