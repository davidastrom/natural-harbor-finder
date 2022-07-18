import type { LatLng } from 'leaflet';
import type { Direction } from './direction';
import { latLng } from 'leaflet';

import { HarborType } from './harborType';

export class createHarborInputModel {
  constructor(name?: string) {
    this.name = name ?? '';
    this.details = [];
    this.location = latLng(0, 0);
    this.chartNumber = 0;
    this.harborType = HarborType.NATURAL;
    this.hasBookRef = false;
    this.book = undefined;
  }

  name: string;
  details: createHarborDetailInputModel[];
  location: LatLng;
  chartNumber: number;
  harborType: HarborType;
  hasBookRef: boolean;
  book?: createBookRefInputModel;
}

export class createHarborDetailInputModel {
  constructor(name?: string) {
    this.name = name ?? '';
    this.shieldedDirections = [];
    this.anchor = false;
    this.SXKBuoy = false;
    this.hasSpecificLocation = false;
    this.location = latLng(0, 0);
    this.hasSpecificHarborType = false;
    this.harborType = HarborType.NATURAL;
  }

  name: string;
  shieldedDirections: Direction[];
  anchor: boolean;
  SXKBuoy: boolean;
  hasSpecificLocation: boolean;
  location?: LatLng;
  hasSpecificHarborType: boolean;
  harborType?: HarborType;
}

export class createBookRefInputModel {
  constructor() {
    this.title = '';
    this.page = undefined;
    this.ref = undefined;
  }

  title: string;
  page?: number;
  ref?: string;
}
