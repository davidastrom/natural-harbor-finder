import type { HarborType } from './harborType';
import type { Direction } from './direction';
import type { LatLng } from 'leaflet';

export type Harbor = {
  id: string;
  name: string;
  details: HarborDetail[];
  location: LatLng;
  chartNumber: number;
  harborType: HarborType;
  book?: BookRef;
};

export type HarborDetail = {
  id: string;
  name: string;
  shieldedDirections: Direction[];
  anchor: boolean;
  SXKBuoy: boolean;
  location?: LatLng;
  harborType?: HarborType;
};

export type BookRef = {
  id: string;
  title: string;
  page?: number;
  ref?: string;
};
