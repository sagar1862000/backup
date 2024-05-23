import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubblechartComponent } from './bubblechart.component';

describe('BubblechartComponent', () => {
  let component: BubblechartComponent;
  let fixture: ComponentFixture<BubblechartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BubblechartComponent]
    });
    fixture = TestBed.createComponent(BubblechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
