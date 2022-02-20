import { prop } from '@typegoose/typegoose';

export class Position {
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
