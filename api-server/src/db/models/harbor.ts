import { getModelForClass, prop } from '@typegoose/typegoose';

import { Location } from '../classes/location';

export enum Direction {
    NORTH,
    NORTHEAST,
    EAST,
    SOUTHEAST,
    SOUTH,
    SOUTHWEST,
    WEST,
    NORTHWEST,
}

export enum HarborType {
    NATURAL,
    SMALL_BOATS,
    YACHTS,
}

export class Harbor {
    @prop()
    public name!: string;

    @prop({ type: () => HarborDetail })
    public details!: HarborDetail[];

    @prop()
    public location!: Location;

    @prop()
    public chartNumber!: number;

    @prop({ enum: HarborType })
    public harborType!: HarborType;
}

export class HarborDetail {
    @prop()
    public name!: string;

    @prop({ enum: Direction })
    public shieldedDirections?: Direction[];

    @prop({ default: false })
    public anchor!: boolean;

    @prop({ default: false })
    public SXKBuoy!: boolean;

    @prop()
    public location?: Location;

    @prop({ enum: HarborType })
    public harborType?: HarborType;
}

export const HarborModel = getModelForClass(Harbor);
