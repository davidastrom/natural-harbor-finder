import { DdToDms } from '@/helpers/locationHelpers';

export class StringLocation {
  constructor(lat?: number, lng?: number) {
    this.lat = lat ? DdToDms(lat, true) : '';
    this.lng = lng ? DdToDms(lng, false) : '';
  }

  lat: string;
  lng: string;
}
