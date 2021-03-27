import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNearestFormComponent } from './search-nearest-form.component';

describe('SearchNearestFormComponent', () => {
  let component: SearchNearestFormComponent;
  let fixture: ComponentFixture<SearchNearestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchNearestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNearestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
