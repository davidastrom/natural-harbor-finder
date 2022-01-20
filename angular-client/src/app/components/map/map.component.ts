import mapboxgl, {
  GeolocateControl,
  LngLatLike,
  Map,
  MapMouseEvent,
  Marker,
  NavigationControl
} from 'mapbox-gl';
import { browser } from 'protractor';
import { take } from 'rxjs/operators';

import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';

import {
  GEOLOCATION_SUPPORT,
  GeolocationService,
  POSITION_OPTIONS
} from '@ng-web-apis/geolocation';

import { environment } from '../../../environments/environment';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
	map: Map | undefined;
	navControl!: NavigationControl;
	geolocateControl!: GeolocateControl;
	style = 'mapbox://styles/mapbox/outdoors-v9';
	currentLocation: LngLatLike | undefined;
	currentLocationMarker: Marker | undefined;
	selectedLocation: LngLatLike | undefined;
	selectedLocationMarker: Marker | undefined;

	constructor(
		@Inject(GEOLOCATION_SUPPORT) private readonly geolocationSupport: boolean,
		@Inject(POSITION_OPTIONS) private readonly positionOptions: PositionOptions,
		private readonly geolocation$: GeolocationService
	) {}

	ngOnInit(): void {
		this.initMap();
	}

	initMap(): void {
		mapboxgl.accessToken = environment.mapbox.accessToken;
		if (this.geolocationSupport) {
			window.navigator.geolocation.getCurrentPosition((position) => {
				this.geolocate(position);
				this.buildMap();
			});
			window.navigator.geolocation.watchPosition((position) =>
				this.geolocate(position)
			);
		}
	}

	buildMap(): void {
		this.map = new Map({
			container: 'map',
			style: this.style,
			zoom: 9,
			center: this.currentLocation
		});

		this.navControl = new NavigationControl();
		this.geolocateControl = new GeolocateControl({
			positionOptions: this.positionOptions,
			trackUserLocation: true
		});

		this.map.addControl(this.navControl, 'bottom-right');
		this.map.addControl(this.geolocateControl, 'bottom-right');

		if (this.currentLocation) {
			this.createCurrentLocationMarker(this.map, this.currentLocation);
		}

		this.map.on('load', () => {
			this.map?.resize();
		});

		this.map.on('click', (position) => {
			this.selectedLocation = position.lngLat;
			if (!this.selectedLocationMarker) {
				this.createSelectedLocationMarker(position.target, position.lngLat);
			} else {
				this.selectedLocationMarker.setLngLat(position.lngLat);
			}
		});
	}

	geolocate(position: GeolocationPosition): void {
		this.currentLocation = [
			position.coords.longitude,
			position.coords.latitude
		];
		if (this.currentLocationMarker) {
			this.currentLocationMarker.setLngLat(this.currentLocation);
		} else if (this.map) {
			this.createCurrentLocationMarker(this.map, this.currentLocation);
		}
	}

	createCurrentLocationMarker(map: Map, location: LngLatLike) {
		let locationElement = window.document.createElement('div');
		locationElement.className = 'passive-user-location-dot';
		this.currentLocationMarker = new Marker(locationElement, {})
			.setLngLat(location)
			.addTo(map);
	}

	createSelectedLocationMarker(map: Map, location: LngLatLike) {
		this.selectedLocationMarker = new Marker({ draggable: true })
			.setLngLat(location)
			.addTo(map);
		this.selectedLocationMarker.on('dragend', () => {
			this.selectedLocation = this.selectedLocationMarker?.getLngLat();
		});
	}

	// onMarkerDragEnd(marker: Marker): void {
	// 	this.selectedLocation = marker.getLngLat();
	// 	console.log(this.selectedLocation);
	// }
}
