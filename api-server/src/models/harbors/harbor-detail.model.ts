import { prop } from '@typegoose/typegoose';

import { Direction } from '../../types/enums/direction';
import { HarborType } from '../../types/enums/harbor-type';
import { BaseModel } from '../base.model';
import { Position } from '../position.model';

export class HarborDetail extends BaseModel {
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
