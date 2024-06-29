import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignFlowComponent } from './campaign-flow.component';

describe('CampaignFlowComponent', () => {
  let component: CampaignFlowComponent;
  let fixture: ComponentFixture<CampaignFlowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignFlowComponent]
    });
    fixture = TestBed.createComponent(CampaignFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
