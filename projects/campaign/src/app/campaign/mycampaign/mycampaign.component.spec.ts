import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycampaignComponent } from './mycampaign.component';

describe('MycampaignComponent', () => {
  let component: MycampaignComponent;
  let fixture: ComponentFixture<MycampaignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MycampaignComponent]
    });
    fixture = TestBed.createComponent(MycampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
