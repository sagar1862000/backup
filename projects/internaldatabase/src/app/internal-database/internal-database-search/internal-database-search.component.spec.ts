import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalDatabaseSearchComponent } from './internal-database-search.component';

describe('InternalDatabaseSearchComponent', () => {
  let component: InternalDatabaseSearchComponent;
  let fixture: ComponentFixture<InternalDatabaseSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternalDatabaseSearchComponent]
    });
    fixture = TestBed.createComponent(InternalDatabaseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
