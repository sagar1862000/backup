import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignFlowComponent } from './campaign-flow.component';

const routes: Routes = [
  {
    path: '', component: CampaignFlowComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignFlowRoutingModule { }
