import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateactionComponent } from './createaction.component';

describe('CreateactionComponent', () => {
  let component: CreateactionComponent;
  let fixture: ComponentFixture<CreateactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateactionComponent]
    });
    fixture = TestBed.createComponent(CreateactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
