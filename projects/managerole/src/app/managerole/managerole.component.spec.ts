import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageroleComponent } from './managerole.component';

describe('ManageroleComponent', () => {
  let component: ManageroleComponent;
  let fixture: ComponentFixture<ManageroleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageroleComponent]
    });
    fixture = TestBed.createComponent(ManageroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
