import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-search-nearest-form',
	templateUrl: './search-nearest-form.component.html',
	styleUrls: ['./search-nearest-form.component.scss']
})
export class SearchNearestFormComponent implements OnInit {
	searchForm = new FormGroup({
		location: new FormControl(''),
		direction: new FormGroup({
			north: new FormControl(false),
			northEast: new FormControl(false),
			east: new FormControl(false),
			southEast: new FormControl(false),
			south: new FormControl(false),
			southWest: new FormControl(false),
			west: new FormControl(false),
			northWest: new FormControl(false)
		})
	});

	constructor() {}

	ngOnInit(): void {}

	onSubmit() {}

	clearChoice() {}
}
