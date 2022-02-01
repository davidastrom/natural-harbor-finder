import { prop } from '@typegoose/typegoose';

export class Location {
    @prop()
    public longitude!: number;

    @prop()
    public latitude!: number;

    public asRadians(): Location {
        return {
            longitude: this.decimalToRadians(this.longitude),
            latitude: this.decimalToRadians(this.latitude),
        } as Location;
    }

    public decimalToRadians(dec: number): number {
        return (dec * Math.PI) / 180;
    }
}
