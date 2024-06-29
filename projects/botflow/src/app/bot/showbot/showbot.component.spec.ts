import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowbotComponent } from './showbot.component';

describe('ShowbotComponent', () => {
  let component: ShowbotComponent;
  let fixture: ComponentFixture<ShowbotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowbotComponent]
    });
    fixture = TestBed.createComponent(ShowbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
