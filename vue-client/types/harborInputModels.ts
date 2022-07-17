import type { Direction } from './direction';
import type { HarborType } from './harborType';

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
  location?: createPositionInputModel;
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
