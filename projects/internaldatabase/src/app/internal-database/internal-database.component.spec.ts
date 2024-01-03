import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalDatabaseComponent } from './internal-database.component';

describe('InternalDatabaseComponent', () => {
  let component: InternalDatabaseComponent;
  let fixture: ComponentFixture<InternalDatabaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternalDatabaseComponent]
    });
    fixture = TestBed.createComponent(InternalDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
