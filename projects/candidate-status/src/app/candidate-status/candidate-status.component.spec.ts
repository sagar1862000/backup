import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateStatusComponent } from './candidate-status.component';

describe('CandidateStatusComponent', () => {
  let component: CandidateStatusComponent;
  let fixture: ComponentFixture<CandidateStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateStatusComponent]
    });
    fixture = TestBed.createComponent(CandidateStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
