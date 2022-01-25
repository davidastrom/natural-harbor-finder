import { getModelForClass, prop } from '@typegoose/typegoose';

import { Location } from '../classes/location';

export enum Direction {
    North,
    NorthEast,
    East,
    SouthEast,
    South,
    SouthWest,
    West,
    NorthWest,
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
}

export class HarborDetail {
    @prop()
    public name!: string;

    @prop({ enum: Direction })
    public directions?: Direction[];

    @prop({ default: false })
    public anchor!: boolean;
}

export const HarborModel = getModelForClass(Harbor);
