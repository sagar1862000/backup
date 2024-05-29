import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryUiComponent } from './primary-ui.component';

describe('PrimaryUiComponent', () => {
  let component: PrimaryUiComponent;
  let fixture: ComponentFixture<PrimaryUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrimaryUiComponent]
    });
    fixture = TestBed.createComponent(PrimaryUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
