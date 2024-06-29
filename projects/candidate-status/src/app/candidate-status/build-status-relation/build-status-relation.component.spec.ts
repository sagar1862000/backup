import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildStatusRelationComponent } from './build-status-relation.component';

describe('BuildStatusRelationComponent', () => {
  let component: BuildStatusRelationComponent;
  let fixture: ComponentFixture<BuildStatusRelationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuildStatusRelationComponent]
    });
    fixture = TestBed.createComponent(BuildStatusRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
