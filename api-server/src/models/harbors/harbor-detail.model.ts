import { ObjectId } from 'mongoose';

import { prop } from '@typegoose/typegoose';

import { Direction } from '../enums/direction';
import { Position } from '../position.model';
import { HarborType } from './harbor-type';

export class HarborDetail {
    readonly _id!: ObjectId;

    @prop()
    public name!: string;

    @prop({ type: Number, enum: Direction })
    public shieldedDirections?: Direction[];

    @prop({ default: false })
    public anchor!: boolean;

    @prop({ default: false })
    public SXKBuoy!: boolean;

    @prop()
    public location?: Position;

    @prop({ enum: HarborType })
    public harborType?: HarborType;
}
