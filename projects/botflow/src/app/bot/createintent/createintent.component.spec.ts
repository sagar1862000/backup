import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateintentComponent } from './createintent.component';

describe('CreateintentComponent', () => {
  let component: CreateintentComponent;
  let fixture: ComponentFixture<CreateintentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateintentComponent]
    });
    fixture = TestBed.createComponent(CreateintentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
