import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatebotComponent } from './createbot.component';

describe('CreatebotComponent', () => {
  let component: CreatebotComponent;
  let fixture: ComponentFixture<CreatebotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatebotComponent]
    });
    fixture = TestBed.createComponent(CreatebotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
