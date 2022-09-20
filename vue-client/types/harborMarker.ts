import L from 'leaflet';

export class HarborMarker extends L.Marker {
  harborId: string;

  constructor(
    latLng: L.LatLngExpression,
    harborId: string,
    options?: L.MarkerOptions
  ) {
    super(latLng, options);
    this.harborId = harborId;
  }
}
