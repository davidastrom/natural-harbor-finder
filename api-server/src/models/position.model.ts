export class Position {
    constructor(lat: number, lng: number) {
        this.lat = lat;
        this.lng = lng;
    }

    public lng!: number;
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
