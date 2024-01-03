import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridinternaldataComponent } from './gridinternaldata.component';

describe('GridinternaldataComponent', () => {
  let component: GridinternaldataComponent;
  let fixture: ComponentFixture<GridinternaldataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridinternaldataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridinternaldataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
