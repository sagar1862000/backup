import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateCallViewComponent } from './candidate-call-view.component';

describe('CandidateCallViewComponent', () => {
  let component: CandidateCallViewComponent;
  let fixture: ComponentFixture<CandidateCallViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateCallViewComponent]
    });
    fixture = TestBed.createComponent(CandidateCallViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
