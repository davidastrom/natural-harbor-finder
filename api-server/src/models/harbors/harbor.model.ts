import mongoose from 'mongoose';

import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose';

import { Direction } from '../../types/enums/direction';
import { HarborType } from '../../types/enums/harbor-type';
import { haversineNautical } from '../../utils/distance.util';
import { BaseModel } from '../base.model';
import { BookRef } from '../book-ref.model';
import { Position } from '../position.model';
import { HarborDetail } from './harbor-detail.model';

export class Harbor extends BaseModel {
    @prop()
    public name!: string;

    @prop({ type: () => [HarborDetail], default: [], required: true })
    public details!: mongoose.Types.DocumentArray<HarborDetail>;

    @prop()
    public location!: Position;

    @prop()
    public chartNumber!: number;

    @prop({ enum: HarborType })
    public harborType!: HarborType;

    @prop({ type: () => BookRef, default: undefined })
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
                .in(shieldedDirections);
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
