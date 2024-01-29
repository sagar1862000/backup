import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowbotflowComponent } from './showbotflow.component';

describe('ShowbotflowComponent', () => {
  let component: ShowbotflowComponent;
  let fixture: ComponentFixture<ShowbotflowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowbotflowComponent]
    });
    fixture = TestBed.createComponent(ShowbotflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
