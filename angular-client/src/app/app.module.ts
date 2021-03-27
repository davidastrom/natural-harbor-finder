import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { POSITION_OPTIONS } from '@ng-web-apis/geolocation';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';

import { environment } from '../environments/environment';
import { SearchNearestFormComponent } from './components/search-nearest-form/search-nearest-form.component';

@NgModule({
	declarations: [AppComponent, MapComponent, SearchNearestFormComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgxMapboxGLModule.withConfig({
			accessToken: environment.mapbox.accessToken
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
