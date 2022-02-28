import { prop } from '@typegoose/typegoose';

import { BaseModel } from './base.model';

export class BookRef extends BaseModel {
    @prop()
    public title!: string;

    @prop()
    public page?: number;

    @prop()
    public ref?: string;
}
