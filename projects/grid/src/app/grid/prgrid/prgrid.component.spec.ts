import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrgridComponent } from './prgrid.component';

describe('PrgridComponent', () => {
  let component: PrgridComponent;
  let fixture: ComponentFixture<PrgridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrgridComponent]
    });
    fixture = TestBed.createComponent(PrgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
