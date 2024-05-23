import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecustomdataComponent } from './createcustomdata.component';

describe('CreatecustomdataComponent', () => {
  let component: CreatecustomdataComponent;
  let fixture: ComponentFixture<CreatecustomdataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatecustomdataComponent]
    });
    fixture = TestBed.createComponent(CreatecustomdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
