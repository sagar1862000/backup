import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewHiringComponent } from './create-new-hiring.component';

describe('CreateNewHiringComponent', () => {
  let component: CreateNewHiringComponent;
  let fixture: ComponentFixture<CreateNewHiringComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewHiringComponent]
    });
    fixture = TestBed.createComponent(CreateNewHiringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
