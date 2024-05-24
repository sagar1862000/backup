import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserRolesComponent } from './create-user-roles.component';

describe('CreateUserRolesComponent', () => {
  let component: CreateUserRolesComponent;
  let fixture: ComponentFixture<CreateUserRolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUserRolesComponent]
    });
    fixture = TestBed.createComponent(CreateUserRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
