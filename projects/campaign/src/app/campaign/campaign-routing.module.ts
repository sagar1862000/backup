import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignComponent } from './campaign.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Mycampaign',
    pathMatch: 'full',
  },
  {
    path: '',
    component: CampaignComponent,
    children: [
      {
        path: 'Mycampaign',
        loadChildren: () =>
          import('./mycampaign/mycampaign.module').then(
            (m) => m.MycampaignModule
          ),
      }, // component: MycampaignComponent },
      {
        path: 'campaign/:id',
        loadChildren: () =>
          import('./campaign-create/campaign-create.module').then(
            (m) => m.CampaignCreateModule
          ),
      }, // component: CampaignCreateComponent },
      {
        path: 'flow/:id',
        loadChildren: () =>
          import('./campaign-flow/campaign-flow.module').then(
            (m) => m.CampaignFlowModule
          ),
      }, // component: CampaignFlowComponent },
      {
        path: ':id',
        loadChildren: () =>
          import('./campaign-flow/campaign-flow.module').then(
            (m) => m.CampaignFlowModule
          ),
      }, // component: CampaignFlowComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignRoutingModule {}