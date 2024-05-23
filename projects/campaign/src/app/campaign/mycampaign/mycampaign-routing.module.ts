import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MycampaignComponent } from './mycampaign.component';

const routes: Routes = [
  {
    path: '', component: MycampaignComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MycampaignRoutingModule { }
