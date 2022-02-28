import { ObjectId } from 'mongoose';

export abstract class BaseModel {
    public readonly _id?: ObjectId;
}
