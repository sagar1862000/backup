import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAuthenticatedComponent } from './non-authenticated.component';

describe('NonAuthenticatedComponent', () => {
  let component: NonAuthenticatedComponent;
  let fixture: ComponentFixture<NonAuthenticatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NonAuthenticatedComponent]
    });
    fixture = TestBed.createComponent(NonAuthenticatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
