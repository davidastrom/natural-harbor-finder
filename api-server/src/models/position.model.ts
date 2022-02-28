import { prop } from '@typegoose/typegoose';

import { BaseModel } from './base.model';

export class Position extends BaseModel {
    @prop()
    public longitude!: number;

    @prop()
    public latitude!: number;

    public asRadians(): Position {
        return {
            longitude: this.decimalToRadians(this.longitude),
            latitude: this.decimalToRadians(this.latitude),
        } as Position;
    }

    public decimalToRadians(dec: number): number {
        return (dec * Math.PI) / 180;
    }
}
