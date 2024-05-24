import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewjobComponent } from './newjob.component';

describe('NewjobComponent', () => {
  let component: NewjobComponent;
  let fixture: ComponentFixture<NewjobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewjobComponent]
    });
    fixture = TestBed.createComponent(NewjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
