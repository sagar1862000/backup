import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallDetailReportComponent } from './call-detail-report.component';

describe('CallDetailReportComponent', () => {
  let component: CallDetailReportComponent;
  let fixture: ComponentFixture<CallDetailReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallDetailReportComponent]
    });
    fixture = TestBed.createComponent(CallDetailReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
