import { Position } from '../../models/position.model';
import { Direction } from '../../types/enums/direction';
import { HarborType } from '../../types/enums/harbor-type';

export interface getAllHarborInputModel {
    position?: Position;
    shieldedDirections?: Direction[];
    take?: number;
}

export interface createHarborInputModel {
    name: string;
    details: createHarborDetailInputModel[];
    location: createPositionInputModel;
    chartNumber: number;
    harborType: HarborType;
    book?: createBookRefInputModel;
}

export interface createHarborDetailInputModel {
    name: string;
    shieldedDirections?: Direction[];
    anchor: boolean;
    SXKBuoy: boolean;
    location?: Position;
    harborType?: HarborType;
}

export interface createBookRefInputModel {
    title: string;
    page?: number;
    ref?: string;
}

export interface createPositionInputModel {
    longitude: number;
    latitude: number;
}