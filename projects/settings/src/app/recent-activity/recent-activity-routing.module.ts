import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecentActivityModule } from './recent-activity.module';
import { RecentActivityComponent } from './recent-activity.component';

const routes: Routes = [{path:'', component:RecentActivityComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecentActivityRoutingModule { }
