import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRoundPageComponent } from './all-round-page.component';

describe('AllRoundPageComponent', () => {
  let component: AllRoundPageComponent;
  let fixture: ComponentFixture<AllRoundPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllRoundPageComponent]
    });
    fixture = TestBed.createComponent(AllRoundPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
