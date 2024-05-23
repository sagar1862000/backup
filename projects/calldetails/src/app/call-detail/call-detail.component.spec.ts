import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallDetailComponent } from './call-detail.component';

describe('CallDetailComponent', () => {
  let component: CallDetailComponent;
  let fixture: ComponentFixture<CallDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallDetailComponent]
    });
    fixture = TestBed.createComponent(CallDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
