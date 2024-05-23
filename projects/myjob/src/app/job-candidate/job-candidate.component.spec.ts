import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCandidateComponent } from './job-candidate.component';

describe('JobCandidateComponent', () => {
  let component: JobCandidateComponent;
  let fixture: ComponentFixture<JobCandidateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobCandidateComponent]
    });
    fixture = TestBed.createComponent(JobCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
