import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { POSITION_OPTIONS } from '@ng-web-apis/geolocation';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { SearchNearestFormComponent } from './components/search-nearest-form/search-nearest-form.component';

import { environment } from '../environments/environment';

@NgModule({
	declarations: [AppComponent, MapComponent, SearchNearestFormComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		NgxMapboxGLModule.withConfig({
			accessToken: environment.mapbox.accessToken // Optional, can also be set per map (accessToken input of mgl-map)
		})
	],
	providers: [
		{
			provide: POSITION_OPTIONS,
			useValue: { enableHighAccuracy: true }
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
