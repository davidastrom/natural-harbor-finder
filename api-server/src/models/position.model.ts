import { prop } from '@typegoose/typegoose';

import { BaseModel } from './base.model';

export class Position extends BaseModel {
    constructor(lat: number, lng: number) {
        super();
        this.lat = lat;
        this.lng = lng;
    }

    @prop()
    public lng!: number;

    @prop()
    public lat!: number;

    public asRadians(): Position {
        return {
            lng: this.decimalToRadians(this.lng),
            lat: this.decimalToRadians(this.lat),
        } as Position;
    }

    public decimalToRadians(dec: number): number {
        return (dec * Math.PI) / 180;
    }
}
