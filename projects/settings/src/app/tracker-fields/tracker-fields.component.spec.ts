import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerFieldsComponent } from './tracker-fields.component';

describe('TrackerFieldsComponent', () => {
  let component: TrackerFieldsComponent;
  let fixture: ComponentFixture<TrackerFieldsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackerFieldsComponent]
    });
    fixture = TestBed.createComponent(TrackerFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
