import { ObjectId } from 'mongoose';

import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose';

import { haversineNautical } from '../../utils/distance.util';
import { BookRef } from '../book-ref.model';
import { Direction } from '../enums/direction';
import { Position } from '../position.model';
import { HarborDetail } from './harbor-detail.model';
import { HarborType } from './harbor-type';

export class Harbor {
    readonly _id!: ObjectId;

    @prop()
    public name!: string;

    @prop({ type: () => HarborDetail })
    public details!: HarborDetail[];

    @prop()
    public location!: Position;

    @prop()
    public chartNumber!: number;

    @prop({ enum: HarborType })
    public harborType!: HarborType;

    @prop()
    public book?: BookRef;

    public static async getHarbors(
        this: ReturnModelType<typeof Harbor>,
        position?: Position,
        shieldedDirections?: Direction[],
        take?: number
    ): Promise<Harbor[]> {
        let query = this.find();

        if (shieldedDirections && shieldedDirections.length > 0) {
            query = query
                .where('details.shieldedDirections')
                .all(shieldedDirections);
        }

        let res = await query.exec();

        if (position) {
            res = res.sort(
                (a, b) =>
                    haversineNautical(position, a.location) -
                    haversineNautical(position, b.location)
            );
        }

        if (take) {
            return res.slice(0, take);
        }

        return res;
    }
}

export const HarborModel = getModelForClass(Harbor);
