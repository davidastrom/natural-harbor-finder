import {
    GeolocateControl, LngLatLike, Map, MapMouseEvent, Marker
} from 'mapbox-gl';
import { Position } from 'ngx-mapbox-gl';

import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
	map: Map | undefined;
	center: LngLatLike = [0, 0];
	userLocation: LngLatLike = [0, 0];
	selectedLocation: LngLatLike | undefined;

	constructor() {}

	ngOnInit(): void {}

	initMap(map: Map) {
		this.map = map;
		console.log(map);
		const geolocateButton = document.getElementsByClassName(
			'mapboxgl-ctrl-geolocate'
		)[0] as HTMLElement;
		geolocateButton.click();
	}

	geolocate(position: Position) {
		const coords = position.coords;
		this.userLocation = [coords.longitude, coords.latitude];
	}

	selectLocation(evt: MapMouseEvent) {
		this.selectedLocation = evt.lngLat;
		this.center = evt.lngLat;
		console.log(this.selectedLocation);
	}

	onMarkerDragEnd(marker: Marker) {
		this.selectedLocation = marker.getLngLat();
		console.log(this.selectedLocation);
	}
}
