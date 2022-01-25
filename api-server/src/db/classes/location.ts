import { prop } from '@typegoose/typegoose';

export class Location {
    @prop()
    public longitude!: number;

    @prop()
    public latitude!: number;
}
