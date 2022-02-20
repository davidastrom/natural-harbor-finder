import { prop } from '@typegoose/typegoose';

export class BookRef {
    @prop()
    public title!: string;

    @prop()
    public page?: number;

    @prop()
    public ref?: string;
}
