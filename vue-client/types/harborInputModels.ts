import type { LatLng } from 'leaflet';

import { StringLocationToDdLocation } from '@/helpers/locationHelpers';

import { HarborType } from './harborType';
import { StringLocation } from './stringLocation';

import type { Direction } from './direction';
export interface FetchHarborIM {
  lat?: number;
  lng?: number;
  directions: Direction[];
}

export interface ICreateHarborFormModel {
  name: string;
  details: ICreateHarborDetailFormModel[];
  location: StringLocation;
  chartNumber: number;
  harborType: HarborType;
  hasBookRef: boolean;
  book?: CreateBookRefInputModel;
}

export class CreateHarborFormModel implements ICreateHarborFormModel {
  constructor() {
    this.name = '';
    this.details = [];
    this.location = new StringLocation();
    this.chartNumber = 0;
    this.harborType = HarborType.NATURAL;
    this.hasBookRef = false;
    this.book = undefined;
  }

  static fromInterface(data: ICreateHarborFormModel): CreateHarborFormModel {
    const harbor = new CreateHarborFormModel();
    data.details = data.details.map((detail) =>
      CreateHarborDetailFormModel.fromInterface(detail)
    );
    Object.assign(harbor, data);
    if (!harbor.hasBookRef) {
      harbor.book = undefined;
    }
    return harbor;
  }

  name: string;
  details: CreateHarborDetailFormModel[];
  location: StringLocation;
  chartNumber: number;
  harborType: HarborType;
  hasBookRef: boolean;
  book?: CreateBookRefInputModel;

  toInputModel(): CreateHarborInputModel {
    const location = StringLocationToDdLocation(
      this.location.lat,
      this.location.lng
    );

    const harborDetails = this.details.map((detail) => detail.toInputModel());

    return {
      ...this,
      location: location,
      details: harborDetails,
    } as CreateHarborInputModel;
  }
}

export interface CreateHarborInputModel
  extends Omit<CreateHarborFormModel, 'location' | 'details'> {
  location: LatLng;
  details: CreateHarborDetailInputModel[];
}

export interface ICreateHarborDetailFormModel {
  name: string;
  shieldedDirections: Direction[];
  anchor: boolean;
  SXKBuoy: boolean;
  hasSpecificLocation: boolean;
  location?: StringLocation;
  hasSpecificHarborType: boolean;
  harborType?: HarborType;
}

export class CreateHarborDetailFormModel
  implements ICreateHarborDetailFormModel
{
  constructor(name?: string) {
    this.name = name ?? '';
    this.shieldedDirections = [];
    this.anchor = false;
    this.SXKBuoy = false;
    this.hasSpecificLocation = false;
    this.location = new StringLocation();
    this.hasSpecificHarborType = false;
    this.harborType = HarborType.NATURAL;
  }

  name: string;
  shieldedDirections: Direction[];
  anchor: boolean;
  SXKBuoy: boolean;
  hasSpecificLocation: boolean;
  location?: StringLocation;
  hasSpecificHarborType: boolean;
  harborType?: HarborType;

  static fromInterface(
    data: ICreateHarborDetailFormModel
  ): CreateHarborDetailFormModel {
    const detail = new CreateHarborDetailFormModel();
    Object.assign(detail, data);

    if (!detail.hasSpecificLocation) {
      detail.location = undefined;
    }

    if (!detail.hasSpecificHarborType) {
      detail.harborType = undefined;
    }

    return detail;
  }

  toInputModel(): CreateHarborDetailInputModel {
    let location: LatLng | undefined;
    if (this.location) {
      location = StringLocationToDdLocation(
        this.location.lat,
        this.location.lng
      );
    }
    return {
      ...this,
      location: location,
    } as CreateHarborDetailInputModel;
  }
}

export interface CreateHarborDetailInputModel
  extends Omit<CreateHarborDetailFormModel, 'location'> {
  location?: LatLng;
}

export class CreateBookRefInputModel {
  constructor() {
    this.title = '';
    this.page = undefined;
    this.ref = undefined;
  }

  title: string;
  page?: number;
  ref?: string;
}
